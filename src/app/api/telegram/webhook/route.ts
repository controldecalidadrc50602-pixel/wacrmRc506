import { NextResponse } from 'next/server';
import { TelegramProvider } from '@/lib/multichannel/providers/telegram';
import { createClient } from '@supabase/supabase-js';

// Instanciamos el proveedor
const telegramProvider = new TelegramProvider();

let _adminClient: any = null;
function supabaseAdmin() {
  if (!_adminClient) {
    _adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _adminClient;
}

export async function POST(req: Request) {
  try {
    const isValid = await telegramProvider.verifyWebhook(req);
    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await req.json();
    const messages = telegramProvider.parseIncomingMessage(payload);

    if (messages.length > 0) {
      const msg = messages[0];
      const supabase = supabaseAdmin();
      
      console.log(`[Plataforma Multicanal] Nuevo mensaje de Telegram:`, msg.content);

      // 1. Obtener la cuenta base (Para Venzly Demo asumimos el primer account)
      const { data: accounts } = await supabase.from('accounts').select('id').limit(1);
      const accountId = accounts?.[0]?.id;

      if (!accountId) throw new Error("No default account found");

      // 2. Buscar o crear el contacto
      const channelId = payload.message.chat.id.toString();
      const name = payload.message.from?.first_name || 'Telegram User';

      let { data: contact } = await supabase
        .from('contacts')
        .select('id')
        .eq('account_id', accountId)
        .eq('channel', 'telegram')
        .eq('channel_id', channelId)
        .maybeSingle();

      if (!contact) {
        const { data: newContact, error: createContactErr } = await supabase
          .from('contacts')
          .insert({
            account_id: accountId,
            name: name,
            phone_number: `tg_${channelId}`, // fallback para compatibilidad legacy
            channel: 'telegram',
            channel_id: channelId,
            status: 'active'
          })
          .select('id')
          .single();
        
        if (createContactErr) throw createContactErr;
        contact = newContact;
      }

      // 3. Buscar o crear la conversación
      let { data: conversation } = await supabase
        .from('conversations')
        .select('id')
        .eq('account_id', accountId)
        .eq('contact_id', contact.id)
        .eq('status', 'open')
        .maybeSingle();

      if (!conversation) {
        const { data: newConv, error: createConvErr } = await supabase
          .from('conversations')
          .insert({
            account_id: accountId,
            contact_id: contact.id,
            status: 'open',
            last_message_at: new Date().toISOString()
          })
          .select('id')
          .single();

        if (createConvErr) throw createConvErr;
        conversation = newConv;
      }

      // 4. Guardar el mensaje entrante
      const { error: msgError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversation.id,
          sender_type: 'customer',
          content: msg.content,
          status: 'received',
          channel: 'telegram',
          provider_message_id: msg.providerMessageId,
          raw_metadata: payload
        });

      if (msgError) throw msgError;

      // 5. Auto-Respuesta de Eco (Demo)
      await telegramProvider.sendMessage({
        channelType: 'telegram',
        channelId: channelId,
        name: name
      }, `Venzly Multicanal: Recibí tu mensaje ("${msg.content}") y ha sido guardado en el CRM.`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[Telegram Webhook Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

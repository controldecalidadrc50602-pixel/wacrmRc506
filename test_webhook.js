import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function testWebhook() {
  try {
    const payload = {
      message: {
        chat: { id: 123456789 },
        from: { first_name: "Test User" },
        text: "Mensaje de prueba local",
        message_id: 999
      }
    };

    console.log("1. Obteniendo cuenta...");
    const { data: accounts } = await supabase.from('accounts').select('id').limit(1);
    const accountId = accounts?.[0]?.id;
    if (!accountId) throw new Error("No default account found");

    const { data: profiles } = await supabase.from('profiles').select('id').eq('account_id', accountId).limit(1);
    const userId = profiles?.[0]?.id;
    if (!userId) throw new Error("No user found for account");

    console.log("2. Buscando/Creando contacto...");
    const channelId = payload.message.chat.id.toString();
    const name = payload.message.from.first_name;

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
          user_id: userId,
          name: name,
          phone: `tg_${channelId}`,
          channel: 'telegram',
          channel_id: channelId,
        })
        .select('id')
        .single();
      
      if (createContactErr) {
        console.error("ERROR Contact:", createContactErr);
        throw createContactErr;
      }
      contact = newContact;
    }
    console.log("Contact ID:", contact.id);

    console.log("3. Buscando/Creando conversacion...");
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
          user_id: userId,
          contact_id: contact.id,
          status: 'open'
        })
        .select('id')
        .single();

      if (createConvErr) {
        console.error("ERROR Conv:", createConvErr);
        throw createConvErr;
      }
      conversation = newConv;
    }
    console.log("Conversation ID:", conversation.id);

    console.log("4. Guardando mensaje...");
    const { error: msgError } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversation.id,
        sender_type: 'customer',
        content: payload.message.text,
        status: 'received',
        channel: 'telegram',
        provider_message_id: payload.message.message_id.toString(),
        raw_metadata: payload
      });

    if (msgError) {
      console.error("ERROR Msg:", msgError);
      throw msgError;
    }
    console.log("Exito!");

  } catch(e) {
    console.error("Crash:", e);
  }
}
testWebhook();

import { IChannelProvider, MultichannelContact, MultichannelMessage } from '../types';

export class TelegramProvider implements IChannelProvider {
  channelType = 'telegram' as const;

  async sendMessage(contact: MultichannelContact, content: string) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) throw new Error('TELEGRAM_BOT_TOKEN is not configured');

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: contact.channelId,
        text: content
      })
    });

    if (!res.ok) {
      throw new Error(`Telegram API Error: ${res.statusText}`);
    }

    return res.json();
  }

  async verifyWebhook(req: Request) {
    // Para producción: Telegram permite establecer un 'X-Telegram-Bot-Api-Secret-Token'
    // que se puede validar aquí.
    const secretToken = req.headers.get('x-telegram-bot-api-secret-token');
    const expectedToken = process.env.TELEGRAM_SECRET_TOKEN;
    
    if (expectedToken && secretToken !== expectedToken) {
      return false;
    }
    return true;
  }

  parseIncomingMessage(payload: any): MultichannelMessage[] {
    // Si no es un mensaje de texto plano, ignoramos por ahora
    if (!payload.message || !payload.message.text) {
      return [];
    }

    return [{
      // El contactId se resolverá en la capa de base de datos buscando el channelId
      contactId: 'pending_resolution', 
      channelType: this.channelType,
      content: payload.message.text,
      direction: 'inbound',
      status: 'delivered',
      providerMessageId: payload.message.message_id?.toString(),
      rawPayload: payload
    }];
  }
}

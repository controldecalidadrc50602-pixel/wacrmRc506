export type ChannelType = 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'webchat';

export interface MultichannelContact {
  id?: string;
  channelType: ChannelType;
  channelId: string; // Puede ser el número de teléfono, Telegram chat_id, o email
  name: string;
  avatarUrl?: string;
}

export interface MultichannelMessage {
  id?: string;
  contactId: string;
  channelType: ChannelType;
  content: string;
  direction: 'inbound' | 'outbound';
  status: 'sent' | 'delivered' | 'read' | 'failed';
  providerMessageId?: string;
  rawPayload?: any; // Para guardar el JSON original por auditoría/debug
}

export interface IChannelProvider {
  channelType: ChannelType;
  
  /**
   * Envía un mensaje saliente a través de la red social correspondiente.
   */
  sendMessage(contact: MultichannelContact, content: string): Promise<any>;
  
  /**
   * Verifica que el webhook entrante sea auténtico (firma, token, etc.)
   */
  verifyWebhook(req: Request): boolean | Promise<boolean>;
  
  /**
   * Parsea el payload específico de la red y lo normaliza al estándar de Venzly.
   */
  parseIncomingMessage(payload: any): MultichannelMessage[];
}

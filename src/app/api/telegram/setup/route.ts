import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      return NextResponse.json({ 
        error: 'Falta configurar TELEGRAM_BOT_TOKEN en las variables de entorno' 
      }, { status: 400 });
    }

    // Detectar dinámicamente el dominio actual (útil para Vercel)
    const host = req.headers.get('host');
    // Usar HTTPS en producción (Vercel) o HTTP si es localhost con ngrok
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    
    const webhookUrl = `${protocol}://${host}/api/telegram/webhook`;

    // Registrar el webhook en Telegram
    const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${webhookUrl}`);
    const data = await res.json();

    return NextResponse.json({ 
      message: 'Configuración de Telegram finalizada', 
      webhookUrl, 
      telegramResponse: data 
    });
  } catch (error) {
    console.error('Error configurando Telegram:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

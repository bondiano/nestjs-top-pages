import { ConfigService } from '@nestjs/config';

import { ITelegramOptions } from '../telegram/telegram.interface';

export const getTelegramConfig = (
  configService: ConfigService,
): ITelegramOptions => {
  const token = configService.get('TELEGRAM_TOKEN');

  if (!token) {
    throw new Error('No TELEGRAM_TOKEN');
  }

  return {
    chatId: configService.get('CHAT_ID') ?? '',
    token,
  };
};

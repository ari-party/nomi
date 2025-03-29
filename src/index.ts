import { Client, GatewayIntentBits } from 'discord.js';
import klaw from 'klaw';

import { env } from '@/env';
import { importPath } from '@utils/importPath';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', async () => {
  console.log('Nomi is ready to moderate!');
});

for await (const file of klaw('dist/events')) {
  if (!file.path.endsWith('.ts')) continue;

  const module: {
    event: Event;
    handleEvent: (...args: unknown[]) => Promise<void>;
  } = await import(importPath(file.path));

  client.on(module.event as unknown as string, (...args: unknown[]) =>
    module.handleEvent(...args),
  );
}

client.login(env.TOKEN);

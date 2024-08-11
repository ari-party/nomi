import 'dotenv/config';

import os from 'node:os';

import Discord from 'discord.js';
import klaw from 'klaw';

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', async () => {
  console.log('Nomi is ready to moderate!');
});

for await (const file of klaw('src/events')) {
  if (!file.path.endsWith('.ts')) continue;

  const module: {
    event: Event;
    handleEvent: (...args: unknown[]) => Promise<void>;
  } = await import(
    os.platform() === 'win32' ? `file://${file.path}` : file.path
  );

  client.on(module.event as unknown as string, (...args: unknown[]) =>
    module.handleEvent(...args),
  );

  console.log(`Added ${module.event} event listener`);
}

client.login(process.env.TOKEN as string);

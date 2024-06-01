import hasInvisibleCharacters from '../utils/hasInvisibleCharacters';

import type { ClientEvents, Message } from 'discord.js';

export const event: keyof ClientEvents = 'messageCreate';

export async function handleEvent(message: Message): Promise<void> {
  if (!message.guild || !message.member) return;

  const highestMemberRole = message.member.roles.highest.position;
  const myHighestRole = message.guild.roles.botRoleFor(
    message.client.user,
  )?.position;

  // the member who sent this has a role that is higher than the bot's, so ignore it
  if (highestMemberRole > myHighestRole!) return;

  const result = hasInvisibleCharacters(message.content);

  if (result)
    try {
      await message.delete();
    } catch (error) {
      console.error(`There was an error deleting message ${message.id}`, error);
    }

  try {
    const reply = await message.channel.send(
      `<@${message.author.id}>, the message you tried to send contained a blacklisted character (\`${result}\`) and was deleted.`,
    );

    if (reply)
      setTimeout(async () => {
        if (reply.deletable) await reply.delete();
      }, 7_500);
  } catch (_) {
    // don't do anything if the bot fails to reply, bot's permissions might not include send messages
  }
}

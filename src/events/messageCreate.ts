import { findInvisibleCharacters } from 'invisible-character-detector';

import { env } from '@/env';

import type { ClientEvents } from 'discord.js';

export const event = 'messageCreate' as const satisfies keyof ClientEvents;

export const handleEvent: (
  ...args: ClientEvents[typeof event]
) => unknown = async (message) => {
  if (!message.inGuild()) return;
  if (message.author.bot) return;
  if (!message.content) return;
  if (!message.member) return;

  const highestMemberRole = message.member.roles.highest.position;
  const myHighestRole = message.guild.roles.botRoleFor(
    message.client.user,
  )?.position;

  // the member who sent this has a role that is higher than the bot
  if (highestMemberRole > myHighestRole!) return;

  const detections = findInvisibleCharacters(message.content);
  if (detections.length) {
    try {
      await message.delete();
    } catch (error) {
      console.error(`There was an error deleting message ${message.id}`, error);
    }

    try {
      const reply = await message.channel.send(
        `<@${message.author.id}>, the message you tried to send contained a blacklisted character (\`${detections[0].runename}\`) and was deleted.`,
      );

      if (reply)
        setTimeout(async () => {
          if (reply.deletable) await reply.delete();
        }, env.DELETE_TIME);
    } catch (_) {
      // don't do anything if the bot fails to reply, bot's permissions might not include send messages
      /* empty */
    }
  }
};

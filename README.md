# Nomi

**no** - no\
 **m** - more\
   **i** - invisible (characters)

A zero-config Discord bot to prevent users from bypassing automod (bots).

## Why?

Users can easily bypass Discord's built-in automod system with a single character, such as a [soft hyphen](https://unicode-explorer.com/c/00AD), and there are 21 more characters that can be abused.

Nomi offers a straight forward approach to solving this.
It checks if the bot's role is above the highest role of the member who sent a message. If it's above, then it will check the message for these bypassable characters and deletes it if found.

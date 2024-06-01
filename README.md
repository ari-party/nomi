# Nomi

**no** - no\
 **m** - more\
   **i** - invisible (characters)

A zero-config Discord bot to prevent users from bypassing automod (bots).

## Why?

Users can easily bypass Discord's built-in automod system with a single character, such as a [soft hyphen](https://unicode-explorer.com/c/00AD), and there are 21 more characters that can be abused.

![Simple bypass using a soft hyphen](https://github.com/ari-party/nomi/assets/49074962/bb2c44a6-db1f-4548-b479-dfab5111216f)

Nomi offers a straight forward approach to solving this.
It checks if the bot's role is above the highest role of the member who sent a message. If it's above, then it will check the message for these bypassable characters and deletes it if found.

## Installation

1. Clone the repository `git clone https://github.com/ari-party/nomi.git` or [download a ZIP](https://github.com/ari-party/nomi/archive/refs/heads/main.zip).

2. Make sure the latest LTS version of [Node.js](https://nodejs.org/en/download) is installed alongside the latest version of npm.

3. Install the dependencies with `npm install` or `pnpm install` if you are using [pnpm](https://pnpm.io/) (😎).

4. Create an application on the [developer portal](https://discord.com/developers/applications) and generate a new bot token.

5. Copy or rename the `.env.example` file to `.env` and open it with your preferred editor.

6. Paste your bot token after `TOKEN=`.
   (It would look something like `TOKEN=MTI...`)

7. Start the bot with `npm run start` or `pnpm start`.

### Permissions

#### Required

- Read Messages/View Channels
- Manage Messages

#### Optional

- Send Messages

![Nomi](https://github.com/ari-party/nomi/assets/49074962/62d1cc6f-3471-4ce4-be0f-bc50acf8f8e3)

[![License](https://img.shields.io/github/license/ari-party/nomi?style=for-the-badge)](./LICENSE)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Discord](https://img.shields.io/badge/Discord.js-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)
![Airbnb](https://img.shields.io/badge/Airbnb-%23ff5a5f.svg?style=for-the-badge&logo=Airbnb&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://github.com/ari-party/nomi/pkgs/container/nomi)

**no** - no\
 **m** - more\
   **i** - invisible (characters)

A zero-config Discord bot to prevent users from bypassing automod (bots).

Nomi uses [invisible-character-detector](https://github.com/ari-party/invisible-character-detector) in the back-end.

## Why?

Users can easily bypass Discord's built-in automod system with a single character, such as a [soft hyphen](https://unicode-explorer.com/c/00AD), and there are 21 more characters that can be abused.

![Simple bypass using a soft hyphen](https://github.com/ari-party/nomi/assets/49074962/bb2c44a6-db1f-4548-b479-dfab5111216f)

Nomi offers a straight forward approach to solving this.
It checks if the bot's role is above the highest role of the member who sent a message. If it's above, then it will check the message for these bypassable characters and deletes it if found.

![Nomi in action](https://github.com/ari-party/nomi/assets/49074962/873b34c0-cc42-4b39-b8c9-29bc1ae7dfa9)

If you wish for Nomi not to reply with these messages (as shown in the image above), simply don't include the send messages permission.

## Invite

**Invite the hosted bot [here](https://discord.com/oauth2/authorize?client_id=1246583489541705769&permissions=11264&scope=bot).**

## Installation

Create an application on the [developer portal](https://discord.com/developers/applications), generate a new bot token and copy it.

### Docker

Ensure you have [Docker](https://docs.docker.com/get-docker/) installed for this installation method.

```bash
# Pull the Docker image
docker pull ghcr.io/ari-party/nomi:latest

docker run -d --name nomi -e TOKEN="REPLACE_ME_WITH_BOT_TOKEN" -e DELETE_TIME="7500" ghcr.io/ari-party/nomi:latest
# `-d detached`, it will run in the background
# `--name nomi`, assign a name to prevent a random name
# `-e TOKEN="..."`, Required Discord bot token environment variable
# `-e DELETE_TIME="..."`, Optional environment variable to customize the time in milliseconds to delete the reply after, defaults to 7500
```

## Bot permissions

#### Required

- Read Messages/View Channels
- Manage Messages

#### Optional

- Send Messages

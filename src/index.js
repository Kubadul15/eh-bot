const fs = require('fs');
const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const config = require('./config');
const panelCommand = require('./commands/panel');
const policjaCommand = require('./commands/policja');
const robloxbanCommand = require('./commands/robloxban');
const roleplayCommand = require('./commands/roleplay');
const aktywnoscCommand = require('./commands/aktywnosc');
const { routeInteraction } = require('./interactions');
const { handleVoiceStateUpdate } = require('./voiceWaitingRoom');
const { handleReactionAdd, handleReactionRemove } = require('./aktywnoscReactions');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const commands = new Collection();
commands.set(panelCommand.data.name, panelCommand);
commands.set(policjaCommand.data.name, policjaCommand);
commands.set(robloxbanCommand.data.name, robloxbanCommand);
commands.set(roleplayCommand.data.name, roleplayCommand);
commands.set(aktywnoscCommand.data.name, aktywnoscCommand);

client.once('ready', () => {
  console.log(`Zalogowano jako ${client.user.tag} — ${config.serverName}`);
  const registryExists = fs.existsSync(config.registryPath);
  console.log(
    `Rejestr danych: ${config.registryPath} (plik ${registryExists ? 'ISTNIEJE — dane powinny przetrwać restart' : 'NIE istnieje — pierwsze uruchomienie albo brak podpiętego Railway Volume'})`
  );
});

client.on('interactionCreate', (interaction) => routeInteraction(interaction, commands));
client.on('voiceStateUpdate', (oldState, newState) => handleVoiceStateUpdate(oldState, newState));
client.on('messageReactionAdd', (reaction, user) => handleReactionAdd(reaction, user));
client.on('messageReactionRemove', (reaction, user) => handleReactionRemove(reaction, user));

client.login(config.discordToken);

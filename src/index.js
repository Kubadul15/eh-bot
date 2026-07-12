const fs = require('fs');
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const config = require('./config');
const panelCommand = require('./commands/panel');
const robloxbanCommand = require('./commands/robloxban');
const roleplayCommand = require('./commands/roleplay');
const { routeInteraction } = require('./interactions');
const { handleRoleplayReactionAdd } = require('./interactions/roleplayReactionAdd');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  // Reakcje na ogloszenie sesji RP musza dzialac tez po restarcie bota
  // (kiedy wiadomosc/kanal moga nie byc juz w cache) - stad partials.
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const commands = new Collection();
commands.set(panelCommand.data.name, panelCommand);
commands.set(robloxbanCommand.data.name, robloxbanCommand);
commands.set(roleplayCommand.data.name, roleplayCommand);

client.once('ready', () => {
  console.log(`Zalogowano jako ${client.user.tag} — ${config.serverName}`);

  // Diagnostyka trwalego rejestru - jesli po kazdym restarcie widac tu
  // "plik NIE istnieje", to znaczy, ze REGISTRY_PATH nie wskazuje na
  // podpiety Railway Volume i dane naprawde znikaja przy kazdym redeployu
  // (patrz sekcja "Trwaly rejestr danych" w README).
  const registryExists = fs.existsSync(config.registryPath);
  console.log(
    `Rejestr danych: ${config.registryPath} (plik ${registryExists ? 'ISTNIEJE — dane powinny przetrwać restart' : 'NIE istnieje — pierwsze uruchomienie albo brak podpiętego Railway Volume'})`
  );
});

client.on('interactionCreate', (interaction) => routeInteraction(interaction, commands));

client.on('messageReactionAdd', (reaction, user) => {
  handleRoleplayReactionAdd(reaction, user).catch((error) => {
    console.error('Błąd podczas obsługi reakcji sesji RP:', error);
  });
});

client.login(config.discordToken);

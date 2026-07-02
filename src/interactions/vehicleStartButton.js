const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { LICENSE_CATEGORIES } = require('../data/licenseCategories');
const { VEHICLE_START_PREFIX, VEHICLE_CATEGORY_PREFIX } = require('./constants');

async function handleVehicleStartButton(interaction) {
  const [channelId, requiredRoleId] = interaction.customId.slice(VEHICLE_START_PREFIX.length + 1).split(':');

  if (!interaction.member.roles.cache.has(requiredRoleId)) {
    await interaction.reply({
      content: `❌ Musisz posiadać rolę <@&${requiredRoleId}> (prawo jazdy), aby zarejestrować pojazd.`,
      ephemeral: true,
    });
    return;
  }

  const select = new StringSelectMenuBuilder()
    .setCustomId(`${VEHICLE_CATEGORY_PREFIX}:${channelId}`)
    .setPlaceholder('Wybierz kategorię pojazdu')
    .addOptions(
      LICENSE_CATEGORIES.map((category) => ({
        label: category.value,
        value: category.value,
        description: category.description,
      }))
    );

  const row = new ActionRowBuilder().addComponents(select);

  await interaction.reply({
    content: 'Jaki typ pojazdu chcesz zarejestrować?',
    components: [row],
    ephemeral: true,
  });
}

module.exports = { handleVehicleStartButton };

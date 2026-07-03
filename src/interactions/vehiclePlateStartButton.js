const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const registry = require('../utils/registry');
const { VEHICLE_PLATE_START_PREFIX, VEHICLE_PLATE_MODAL_PREFIX, MODAL_FIELD_VEHICLE_PLATE } = require('./constants');

async function handleVehiclePlateStartButton(interaction) {
  const pendingId = interaction.customId.slice(VEHICLE_PLATE_START_PREFIX.length + 1);

  if (!registry.getPendingVehicle(pendingId)) {
    await interaction.reply({
      content: '❌ Sesja rejestracji wygasła albo już została użyta. Użyj przycisku "Zarejestruj pojazd" jeszcze raz.',
      ephemeral: true,
    });
    return;
  }

  const modal = new ModalBuilder()
    .setCustomId(`${VEHICLE_PLATE_MODAL_PREFIX}:${pendingId}`)
    .setTitle('Numer rejestracyjny pojazdu');

  const plateInput = new TextInputBuilder()
    .setCustomId(MODAL_FIELD_VEHICLE_PLATE)
    .setLabel('Numer rejestracyjny')
    .setStyle(TextInputStyle.Short)
    .setMaxLength(12)
    .setRequired(true);

  modal.addComponents(new ActionRowBuilder().addComponents(plateInput));

  await interaction.showModal(modal);
}

module.exports = { handleVehiclePlateStartButton };

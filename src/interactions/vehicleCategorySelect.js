const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const {
  VEHICLE_CATEGORY_PREFIX,
  VEHICLE_MODAL_PREFIX,
  MODAL_FIELD_VEHICLE_MAKE,
  MODAL_FIELD_VEHICLE_YEAR,
  MODAL_FIELD_VEHICLE_COLOR,
  MODAL_FIELD_VEHICLE_ENGINE,
  MODAL_FIELD_VEHICLE_OWNER,
} = require('./constants');

async function handleVehicleCategorySelect(interaction) {
  const channelId = interaction.customId.slice(VEHICLE_CATEGORY_PREFIX.length + 1);
  const category = interaction.values[0];

  const modal = new ModalBuilder()
    .setCustomId(`${VEHICLE_MODAL_PREFIX}:${channelId}:${category}`)
    .setTitle(`Rejestracja pojazdu — kat. ${category}`);

  const makeInput = new TextInputBuilder()
    .setCustomId(MODAL_FIELD_VEHICLE_MAKE)
    .setLabel('Marka i model')
    .setStyle(TextInputStyle.Short)
    .setMaxLength(50)
    .setRequired(true);

  const yearInput = new TextInputBuilder()
    .setCustomId(MODAL_FIELD_VEHICLE_YEAR)
    .setLabel('Rok produkcji')
    .setStyle(TextInputStyle.Short)
    .setMaxLength(4)
    .setRequired(true);

  const colorInput = new TextInputBuilder()
    .setCustomId(MODAL_FIELD_VEHICLE_COLOR)
    .setLabel('Kolor')
    .setStyle(TextInputStyle.Short)
    .setMaxLength(30)
    .setRequired(true);

  const engineInput = new TextInputBuilder()
    .setCustomId(MODAL_FIELD_VEHICLE_ENGINE)
    .setLabel('Silnik / pojemność')
    .setStyle(TextInputStyle.Short)
    .setMaxLength(30)
    .setRequired(true);

  const ownerInput = new TextInputBuilder()
    .setCustomId(MODAL_FIELD_VEHICLE_OWNER)
    .setLabel('Właściciel (imię i nazwisko RP)')
    .setStyle(TextInputStyle.Short)
    .setMaxLength(50)
    .setRequired(true);

  modal.addComponents(
    new ActionRowBuilder().addComponents(makeInput),
    new ActionRowBuilder().addComponents(yearInput),
    new ActionRowBuilder().addComponents(colorInput),
    new ActionRowBuilder().addComponents(engineInput),
    new ActionRowBuilder().addComponents(ownerInput)
  );

  await interaction.showModal(modal);
}

module.exports = { handleVehicleCategorySelect };

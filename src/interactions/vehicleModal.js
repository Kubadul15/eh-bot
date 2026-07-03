const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const registry = require('../utils/registry');
const { parseYear } = require('../utils/validation');
const {
  VEHICLE_MODAL_PREFIX,
  VEHICLE_PLATE_MODAL_PREFIX,
  MODAL_FIELD_VEHICLE_MAKE,
  MODAL_FIELD_VEHICLE_YEAR,
  MODAL_FIELD_VEHICLE_COLOR,
  MODAL_FIELD_VEHICLE_ENGINE,
  MODAL_FIELD_VEHICLE_OWNER,
  MODAL_FIELD_VEHICLE_PLATE,
} = require('./constants');

async function handleVehicleModal(interaction) {
  const [channelId, category] = interaction.customId.slice(VEHICLE_MODAL_PREFIX.length + 1).split(':');

  const make = interaction.fields.getTextInputValue(MODAL_FIELD_VEHICLE_MAKE).trim();
  const rawYear = interaction.fields.getTextInputValue(MODAL_FIELD_VEHICLE_YEAR).trim();
  const color = interaction.fields.getTextInputValue(MODAL_FIELD_VEHICLE_COLOR).trim();
  const engine = interaction.fields.getTextInputValue(MODAL_FIELD_VEHICLE_ENGINE).trim();
  const owner = interaction.fields.getTextInputValue(MODAL_FIELD_VEHICLE_OWNER).trim();

  const year = parseYear(rawYear);
  if (year === null) {
    await interaction.reply({
      content: `⚠️ Podaj prawidłowy rok produkcji — liczba czterocyfrowa od 1900 do ${new Date().getFullYear() + 1}. Użyj przycisku jeszcze raz.`,
      ephemeral: true,
    });
    return;
  }

  // Modal ma juz maksymalne 5 pol (limit Discorda), wiec numer rejestracyjny
  // zbiera drugi modal - dane z tego pierwszego trzymamy krotko w rejestrze
  // pod losowym pendingId, zeby przetrwaly do momentu wypelnienia drugiego.
  const pendingId = registry.savePendingVehicle({ channelId, category, make, year, color, engine, owner });

  const plateModal = new ModalBuilder()
    .setCustomId(`${VEHICLE_PLATE_MODAL_PREFIX}:${pendingId}`)
    .setTitle('Numer rejestracyjny pojazdu');

  const plateInput = new TextInputBuilder()
    .setCustomId(MODAL_FIELD_VEHICLE_PLATE)
    .setLabel('Numer rejestracyjny')
    .setStyle(TextInputStyle.Short)
    .setMaxLength(12)
    .setRequired(true);

  plateModal.addComponents(new ActionRowBuilder().addComponents(plateInput));

  await interaction.showModal(plateModal);
}

module.exports = { handleVehicleModal };

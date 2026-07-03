const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { buildVehicleCardEmbed } = require('../utils/embeds');
const { generateVin } = require('../utils/vehicle');
const { parsePlateNumber } = require('../utils/validation');
const registry = require('../utils/registry');
const {
  VEHICLE_PLATE_MODAL_PREFIX,
  VEHICLE_SEND_PREFIX,
  MODAL_FIELD_VEHICLE_PLATE,
  CANCEL_ID_BUTTON_ID,
} = require('./constants');

async function handleVehiclePlateModal(interaction) {
  const pendingId = interaction.customId.slice(VEHICLE_PLATE_MODAL_PREFIX.length + 1);
  const pending = registry.getPendingVehicle(pendingId);

  if (!pending) {
    await interaction.reply({
      content: '❌ Sesja rejestracji wygasła albo już została użyta. Użyj przycisku "Zarejestruj pojazd" jeszcze raz.',
      ephemeral: true,
    });
    return;
  }

  const rawPlate = interaction.fields.getTextInputValue(MODAL_FIELD_VEHICLE_PLATE);
  const plateNumber = parsePlateNumber(rawPlate);

  if (plateNumber === null) {
    await interaction.reply({
      content: '⚠️ Numer rejestracyjny może zawierać tylko litery, cyfry, spacje i myślniki (3–12 znaków). Użyj przycisku jeszcze raz.',
      ephemeral: true,
    });
    return;
  }

  if (registry.findVehicleByPlate(plateNumber)) {
    await interaction.reply({
      content: `❌ Numer rejestracyjny \`${plateNumber}\` jest już zajęty przez inny pojazd. Wybierz inny i użyj przycisku jeszcze raz.`,
      ephemeral: true,
    });
    return;
  }

  registry.deletePendingVehicle(pendingId);

  const embed = buildVehicleCardEmbed({
    discordUser: interaction.user,
    make: pending.make,
    year: pending.year,
    color: pending.color,
    engine: pending.engine,
    owner: pending.owner,
    category: pending.category,
    plateNumber,
    vin: generateVin(),
  });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`${VEHICLE_SEND_PREFIX}:${pending.channelId}`)
      .setLabel('Wyślij')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId(CANCEL_ID_BUTTON_ID).setLabel('Anuluj').setStyle(ButtonStyle.Danger)
  );

  await interaction.reply({
    content: 'Oto podgląd dowodu rejestracyjnego — widoczny tylko dla Ciebie. Sprawdź dane i kliknij **Wyślij**.',
    embeds: [embed],
    components: [row],
    ephemeral: true,
  });
}

module.exports = { handleVehiclePlateModal };

const { EmbedBuilder } = require('discord.js');
const config = require('../config');

async function sendAdminLog(client, { title, description, color }) {
  if (!config.adminLogChannelId) return;

  try {
    const channel = await client.channels.fetch(config.adminLogChannelId);
    const embed = new EmbedBuilder()
      .setColor(color || config.embedColor)
      .setTitle(title)
      .setDescription(description)
      .setTimestamp();

    await channel.send({ embeds: [embed] });
  } catch (error) {
    console.error('Błąd podczas wysyłania logu administracyjnego:', error);
  }
}

module.exports = { sendAdminLog };

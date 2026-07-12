const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../config');
const registry = require('../utils/registry');
const { buildRoleplaySessionEmbed } = require('../utils/embeds');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roleplay')
    .setDescription('Rozpoczyna lub kończy sesję RP na serwerze')
    .addSubcommand((sub) =>
      sub
        .setName('start')
        .setDescription('Ogłasza nową sesję RP i pinguje @everyone')
        .addStringOption((o) => o.setName('cel').setDescription('Cel RP').setRequired(true).setMaxLength(200))
        .addIntegerOption((o) =>
          o
            .setName('min-reakcji')
            .setDescription('Minimalna liczba reakcji ✅ potrzebna do rozpoczęcia sesji')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(100)
        )
    )
    .addSubcommand((sub) => sub.setName('stop').setDescription('Kończy aktualną sesję RP')),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'start') {
      // Ta komenda pinguje @everyone, wiec wymagamy tego samego uprawnienia
      // Discorda, ktore jest potrzebne, zeby zrobic to recznie - inaczej
      // kazdy mogby spamowac ping przez bota.
      if (!interaction.memberPermissions?.has(PermissionFlagsBits.MentionEveryone)) {
        await interaction.reply({
          content: '❌ Ta komenda wymaga uprawnienia Wspominaj wszystkich (@everyone/@here).',
          ephemeral: true,
        });
        return;
      }

      const goal = interaction.options.getString('cel').trim();
      const minReactions = interaction.options.getInteger('min-reakcji');

      const result = registry.startRoleplaySession(interaction.user.id, interaction.user.tag, { goal, minReactions });

      if (result.alreadyActive) {
        await interaction.reply({
          content: `❌ Sesja RP już trwa — rozpoczęta przez <@${result.session.startedBy}>.`,
          ephemeral: true,
        });
        return;
      }

      const embed = buildRoleplaySessionEmbed(result.session);

      await interaction.reply({
        content: '@everyone',
        embeds: [embed],
        allowedMentions: { parse: ['everyone'] },
      });

      const message = await interaction.fetchReply();
      registry.setRoleplaySessionMessage(message.channelId, message.id);

      try {
        await message.react('✅');
      } catch (error) {
        console.error('Błąd podczas dodawania reakcji do ogłoszenia sesji RP:', error);
      }
      return;
    }

    if (subcommand === 'stop') {
      const result = registry.stopRoleplaySession(interaction.user.id, interaction.user.tag);

      if (result.notActive) {
        await interaction.reply({ content: '❌ Nie ma obecnie aktywnej sesji RP.', ephemeral: true });
        return;
      }

      const minutes = Math.round(result.durationMs / 60000);
      const embed = new EmbedBuilder()
        .setColor('#e02b2b')
        .setTitle('🛑 Sesja RP zakończona')
        .addFields(
          { name: '🎯 Cel RP', value: result.session.goal || 'brak danych', inline: true },
          { name: '🎬 Rozpoczął', value: `<@${result.session.startedBy}>`, inline: true },
          { name: '🏁 Zakończył', value: `<@${interaction.user.id}>`, inline: true },
          { name: '⏱️ Czas trwania', value: `${minutes} min`, inline: true }
        )
        .setFooter({ text: config.serverName })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    }
  },
};

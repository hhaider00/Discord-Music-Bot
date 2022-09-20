const { SlashCommandBuilder } = require("@discordjs/builders");
const { Interaction } = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports =
{ 
    data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("joins call"),
    async execute(interaction)
    {
        const voiceChannel = interaction.member.voice.channel;

        if(!voiceChannel) return interaction.reply
        ({
            content: 'Pls join call first >:(', 
            ephemeral: true
        });

        try
        {
            joinVoiceChannel
            ({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator
            })
            await interaction.reply("Successfully joined pls queue a song")
        }
        catch(error)
        {
            return  interaction.reply
            ({
                content: "Error while joining",
                ephemeral: true
            })
        }
    }
};
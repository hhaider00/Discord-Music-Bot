const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction, MessageEmbed } = require("discord.js");


module.exports =
{
    data: new SlashCommandBuilder()
    .setName("back")
    .setDescription("plays the previous song"),
    async execute(interaction)
    {
        const voiceChannel = interaction.member.voice.channel;
        let queue = interaction.client.distube.getQueue(interaction);

        if(!voiceChannel)
        {
            return interaction.reply
            ({
                contrnt: "you are not in a call" , 
                ephemeral:true
            })
        }
        if(interaction.member.guild.me.voice.channelId != interaction.member.voice.channelId)
        {
            return interaction.reply
            ({
                content: "You are not in the same call as me",
                ephemeral: true
            
            });
        }
        if(!queue)
        {
            return interaction.reply
            ({
                content: "There is no queue",
                ephemeral: true
            
            });
        }

        try
        {
            await interaction.client.distube.previous(interaction)
            const backembed = new MessageEmbed()
                .setColor("#0099ff")
                .setDescription("Now playing previous song")
            interaction.reply({embeds: [backembed]})
            
        }
        catch
        {
            interaction.reply
            ({
                content: "There is no previous song",
                ephemeral: true
            
            });
        
        }

    }
}
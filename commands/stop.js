const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction, MessageEmbed } = require("discord.js");


module.exports =
{
    data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("stops all music"),
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
        /*if(!queue)
        {
            return interaction.reply
            ({
                content: "There is no queue",
                ephemeral: true
            
            });
        }*/

        try
        {
            interaction.client.distube.stop(interaction);
            interaction.reply
            ({
                content: "Stopping all music",
                
            
            });
        }
        catch
        {
            return interaction.reply
            ({
                content: "There is nothing playing",
                ephemeral: true
            
            });
        }

    }
}
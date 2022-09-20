const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction } = require("discord.js");


module.exports =
{ 
    data: new SlashCommandBuilder()
    .setName("billiejeaneden")
    .setDescription("plays billie jean by eden"),
    async execute(interaction)
    {
        
        const voiceChannel = interaction.member.voice.channel;
        let queue = interaction.client.distube.getQueue(interaction);
        

        if(!voiceChannel)
        {
            return interaction.reply
            ({
                content: "You are not in a call",
                ephemeral: true
                
            });
        }

        if (queue) 
        {

            if(interaction.member.guild.me.voice.channelId != interaction.member.voice.channelId)
                {
                    return interaction.reply
                    ({
                        content: "You are not in the same call as me",
                        ephemeral: true
                    
                    });
            }
        }
        await interaction.reply("Looking for song");
        await interaction.editReply("Hehe on it").then(msg =>  {setTimeout(() => msg.delete(), 5000)});
        try
        {
        interaction.client.distube.stop(interaction);
        interaction.client.distube.play(voiceChannel, "billie jean eden",
            {
                textChannel: interaction.channel,
                member: interaction.member
            });
        }
        catch
        {
            interaction.client.distube.play(voiceChannel, "billie jean eden",
            {
                textChannel: interaction.channel,
                member: interaction.member
            });
        }

    }
}
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction } = require("discord.js");


module.exports =
{ 
    data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("plays music")
    .addStringOption(option =>
        option.setName("song")
        .setDescription("what song do you want to play")
        .setRequired(true)
        ),
    async execute(interaction)
    {
        
        const voiceChannel = interaction.member.voice.channel;
        let queue = interaction.client.distube.getQueue(interaction);
        const { value: string } = interaction.options.get('song');
        

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
        await interaction.editReply("found the best result").then(msg =>  {setTimeout(() => msg.delete(), 5000)});
        interaction.client.distube.play(voiceChannel, string,
            {
                textChannel: interaction.channel,
                member: interaction.member
            });


    }
}
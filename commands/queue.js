const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction, MessageEmbed, Util  } = require("discord.js");


module.exports =
{
    data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Shows what songs are in the queue"),
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

        const q = queue.songs.map((song, i) => {
            return `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``
        }).join("\n")

        
       // let qsplit ;

        //console.log(queue.songs.length)
        /*
        qsplit.concat(`**Current queue: **`)
        for(let i = 0; i < queue.songs.length; i++ )
        {
            song = queue.songs[i]
            if(queue.songs[i])
            {
            if(i==0)
            {
                console.log(`Playing:  ${queue.songs[i].name} - ${queue.songs[i].formattedDuration} `)
                qsplit.concat(`Playing:  ${queue.songs[i].name} - ${queue.songs[i].formattedDuration} `)
            }
            else
            {  
                console.log(`  ${i} - ${queue.songs[i].name} - ${queue.songs[i].formattedDuration} `)
                qsplit.concat(`  ${i} - ${queue.songs[i].name} - ${queue.songs[i].formattedDuration} `)
            }
            }
        }*/
        //console.log(queue.songs.length)
        //console.log(qsplit)
        //let chunks = await Util.splitMessage(qsplit, { maxLength: 2000 });
        //console.log(qsplit.lenght)
        //console.log(chunks)
        /*
        if (chunks.length > 1)
        {
            for(let i = 0; chunks.lenght; i++ )
            {
                const queueembed = new MessageEmbed()
                    .setColor("#0099ff")
                    .setDescription(chunks)
                    .setFooter(`Part ${i + 1} / ${chunks.length}`)
                interaction.reply({embeds: [queueembed]})
            }
        }
        else
        {
            const queueembed = new MessageEmbed()
            .setColor("#0099ff")
            .setDescription(`**Current queue: ** \n\n  ${q}`)
            interaction.reply({embeds: [queueembed]})
        }
      
        */
        
        /*
        else
        {
            interaction.reply(`**Current queue: ** \n\n `)
            for(let i = 0; i <queue.songs.length; i++)
            {
                queue.textChannel.send(`${queue.songs.name} - \`${queue.songs.formattedDuration}\``)
            }
        }
        */
/*
        if(qsplit.lenght > 2000)
        {
            interaction.reply("Yeah probs will add this later maybe")
        }
        else
        {*/
            const queueembed = new MessageEmbed()
                .setColor("#0099ff")
                .setDescription(`**Current queue: ** \n\n  ${q}`)
            interaction.reply({embeds: [queueembed]})
        
        //}
        
    }
}
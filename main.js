require("dotenv").config();
const fs = require("fs");
const {Client, Intents, Collection, Interaction, MessageEmbed } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_VOICE_STATES] });
const Distube = require("distube")
const { SpotifyPlugin } = require("@distube/spotify");
const { YouTubeDLPlugin } = require("@distube/yt-dlp");
const console = require("console");

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

const commands = [];

client.commands = new Collection();

for (const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

for (const file of eventFiles)
{
    const event = require(`./events/${file}`);

    if (event.once)
    {
        client.once(event.name, (...args) => event.execute(...args, commands));
    }
    else
    {
        client.on(event.name, (...args) => event.execute(...args, commands));
    }
}

client.on('message', message => 
{
    if(message.author.bot) return;
    var content = message.content.split(' ');
    var lowermsg;
    for (let i = 0; i < content.length; i++) 
    {
        lowermsg += content[i].toLowerCase();
    }
    /*for (let i = 0; i < content.length; i++) 
    {
        console.log(lowermsg[i].toString())
    }*/
    if (lowermsg.includes("spiderman")) 
    {
        //message.reply("Well hang on there");
        var text = fs.readFileSync("./spiderman.txt", "utf-8");
        var linebyline = text.split("\n")
        const random = Math.floor(Math.random() * linebyline.length);
        var randomqoute = linebyline[random]
        message.reply(`${randomqoute}`)
    }
    if (lowermsg.includes("thor")) 
    {
        //message.reply("Well hang on there");
        var text = fs.readFileSync("./thor.txt", "utf-8");
        var linebyline = text.split("\n")
        const random = Math.floor(Math.random() * linebyline.length);
        var randomqoute = linebyline[random]
        message.reply(`${randomqoute}`)
    }
    if (lowermsg.includes("dan")) 
    {
        
        message.reply("Gg ez my back tho")
    }
    if (lowermsg.includes("lean")) 
    {
        
        message.reply("It's literally just cola you piece of shit. There's no cough syrup or anything. What the fuck is wrong with you. How fucking desperate are you to seem cool that you decide you want to force a joke about a child consuming drugs. Which would be funny except nothing in this scene implies that they're doing drugs or a drug stand-in. You just saw a can of soda and the two neurons in your head fired for the first time in a week, and you jumped into the comments to screech lEAn and spam purple emojis like a clown bastard. You people are the reason art is dying. Fuck you")
    }
   
});


client.distube = new Distube.default(client,
    {
        leaveOnEmpty: false,
        emptyCooldown: 40,
        leaveOnFinish: false,
        emitNewSongOnly: true,
        updateYouTubeDL: true,
        nsfw: true,
        plugins: [new SpotifyPlugin(), new YouTubeDLPlugin()]

    });

    const status = (queue) => `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\` | Filter: \`${queue.filters.join(", ") || "Off"}\``
    
    client.distube
    .on("playSong", (queue, song) => {
        var durationms = song.duration*1000;
        //queue.textChannel.send( String(durationms))
        const songembed = new MessageEmbed()
        .setColor("#0099ff")
        .setAuthor("Started Playing" )
        .addField("**Source:**", song.source.toString(), true)
        .setThumbnail(song.thumbnail)
        .setDescription(`[${song.name}](${song.url})`)
        .addField("**Views:**", song.views.toString(), true)
        .addField("**Like:**", song.likes.toString(), true)
        .addField("**Duration:**", song.formattedDuration.toString(), true)
        .addField("**Status**", status(queue).toString())
        .setFooter(`Requested by ${song.user.username}`,  song.user.avatarURL() )
        .setTimestamp()
        queue.textChannel.send({ embeds:[songembed]}).then(msg =>  {setTimeout(() => msg.delete(), durationms)});
        
        /*const embed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Music")
            .setAuthor({ name: "Started Playing" })
            .addField("**Source:**", song.source.toString(), true)
            .setThumbnail(song.thumbnail)
            .setDescription(`[${song.name}](${song.url})`)
            .addField("**Views:**", song.views.toString(), true)
            .addField("**Like:**", song.likes.toString(), true)
            .addField("**Duration:**", song.formattedDuration.toString(), true)
            .addField("**Status**", status(queue).toString())
            .setTimestamp()
            .setFooter({ text: `Requested by ${song.user.username}`, iconURL: song.user.avatarURL() })
        queue.textChannel.send({ embeds:[embed]});*/
    })

    .on("addSong", (queue, song) => {
        const queueembed = new MessageEmbed()
            .setTitle(" Added song to queue")
            .setDescription(`${song.name} - ${song.formattedDuration} `)
            .setColor("#0099ff")
            .setTimestamp()
            .setFooter(`Requested by ${song.user.username}`,  song.user.avatarURL() )
        queue.textChannel.send({ embeds: [queueembed] })
    })

    .on("finishSong", queue => {
        const finishembed = new MessageEmbed()
            .setDescription(`Finished playing ${queue.songs[0].name}`)
        queue.textChannel.send({ embeds: [finishembed] }).then(msg =>  {setTimeout(() => msg.delete(), 15000)});
    })

client.login(process.env.TOKEN);

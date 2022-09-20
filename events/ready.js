const {REST} = require("@discordjs/rest");
const {Routes} = require("discord-api-types/v9");
require("dotenv").config();
const Distube = require("distube")
const { SpotifyPlugin } = require("@distube/spotify");
const { YouTubeDLPlugin } = require("@distube/yt-dlp");

module.exports = 
{
    name: "ready",
    once: true,
    execute (client, commands)
    {
        console.log("Ready to work!");

        const CLIENT_ID = client.user.id;
    
        const rest = new REST({version: "9"}).setToken(process.env.TOKEN);
    
        (async () =>
        {
            try
            {
                if(process.env.ENV == "production")
                {
                    await rest.put(Routes.applicationCommands(CLIENT_ID), {body: commands});
                    console.log("loaded commands gloablly no prob");
                }
                else
                {
                    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {body: commands});
                    console.log("loaded commands locally no prob");
                }
            }
            catch(error)
            {
                if(error) console.error(error);
            }
        })(); 
   
       

    }
}
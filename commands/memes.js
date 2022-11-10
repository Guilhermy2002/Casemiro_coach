const fetch = require('node-fetch')
const { Discord, EmbedBuilder, MessageEmbed, Message } = require('discord.js');
import('got')
const request =  require('request')

module.exports.run = async(client) =>{

        
        function intervaltime(){
            console.log('1 segundo');
        }
        setTimeout(intervaltime, 1500);

        request.get({url:'https://www.reddit.com/r/Demotivational/random/.json', json: true}, 
        function (e, r, data) {
    

        const [list] = data; 
        const [post] = list.data.children;


        const permalink = post.data.permalink;
        const memeUrl = `https://reddit.com${permalink}`;
        const memeImage = post.data.url;
		const memeTitle = post.data.title;
		const memeUpvotes = post.data.ups;
		const memeNumComments = post.data.num_comments;


            const embed = new MessageEmbed();

			embed.setTitle(`${memeTitle}`);
			embed.setURL(`${memeUrl}`);
			embed.setColor('Random');
			embed.setImage(memeImage);
			//embed.setFooter({ text:`👍 ${memeUpvotes} 💬 ${memeNumComments}`});

			//message.channel.send({ embed });
            client.channels.cache.get('598126825792733216').send({embed});
		
        }); 

        

        
        
};

module.exports.config = {
	name: 'meme',
	aliases: [],
};
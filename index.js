const Discord = require('discord.js');
const client = new Discord.Client();

var Datastore = require('nedb'),
db = new Datastore({
		filename: './database.db'
	});

db.loadDatabase();

client.on('ready', () => {
	console.log(client.user.username + ' is now online!');
});

client.on('message', function (message) {
	if (message.content === '!giveaway' && message.channel.name == 'general') {
		db.find({
			useid: message.author.id
		}, function (err, docs) {
			if (docs.length > 0) {
				message.reply('你已經加入過此抽獎了，單一帳號無法重複加入。');
			} else {
				db.insert({
					useid: message.author.id,
                    usertag: message.author.tag
				});
				message.reply('成功加入抽獎！');
			};
		});
	} else {
        if (message.channel.name == 'general' && message.author.id != '348670227250413568'/*Bot's ID*/) {
            message.delete();
        }
    };
});

client.login('MzQ4NjcwMjI3MjUwNDEzNTY4.DHqT-A.ybyb_5fhegcp5lrVxbChFpqx7kA');

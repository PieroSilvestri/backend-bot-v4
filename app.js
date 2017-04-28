var restify = require('restify');
var builder = require('botbuilder');

//
// BOT SETUP
//

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function(){
	console.log('%s listening to %s', server.name, server.url);
});

//Create chat bot
var connector = new builder.ChatConnector({
	appId: 'a11ec4b5-b7c1-4e52-accc-97a9efebed7d',
	appPassword: 'nybp2a71m6bVWrX6JVX18MU'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

//
// BOT DIALOGS
//

bot.dialog('/', function(session){
	session.send("Hello World! First node bot :)");
});
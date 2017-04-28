var restify = require('restify');
var builder = require('botbuilder');
var mysql = require('mysql');

//
// BOT SETUP
//

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function(){
	console.log("Starting server");
	console.log('%s listening to %s', server.name, server.url);
});

// Database connection
var connection = mysql.createPool({
	host: 'prohosting3.netsons.net',
	port: '3306',
	user: 'mjhnxzbg_test',
	password: '@Password1.',
	database: 'mjhnxzbg_test1'
});

//Create chat bot
var connector = new builder.ChatConnector({
	appId: 'a11ec4b5-b7c1-4e52-accc-97a9efebed7d',
	appPassword: 'nybp2a71m6bVWrX6JVX18MU'
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// LUIS
/**/
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/cf7b0942-055c-4111-87bf-d831a1725efa?subscription-key=728ad137437444a6b90797a5f388f685&timezoneOffset=0&verbose=true&q=';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', dialog);


// Add intent handlers
dialog.matches('BestTeam', [
	function (session, args, next) {
        // Resolve and store any entities passed from LUIS.
        connection.getConnection(function(error, tempcont){
		if(error){
			//tempcont.release();
			console.log('Error');
			console.log(error);
			session.send('Errore.');

		}else{
			console.log('Connected! WELL DONE!');
			var query = "SELECT * FROM mySampleTable";

			tempcont.query(query, function(error, rows, fields){

				tempcont.release();

				if(!!error){
					console.log('Error in the query');
					console.log(error)
					session.send('Errore.');
				}else{
					if(rows.length == 0){
						session.send('Errore.');
					}
					var utente = rows[0];
					session.send("Il migliore è " + utente.NAME);
				}
			})
		}
		});
    }
    ]);
dialog.matches('IncaniResponse', builder.DialogAction.send('Gay'));
dialog.matches('NonFa', builder.DialogAction.send('15 più 18 non fa 36! Dio ti maledica! Te do un scjafon che te pituro su pel muro! TU MARE PUTTANA! 15 e 18 quanto fa COGLIONE!'));
dialog.matches('None', builder.DialogAction.send('Non ho capito. Dai scrivimi altro!'));
dialog.matches('Saluto', builder.DialogAction.send('Ciao! Come stai?'));
dialog.matches('Offesa', builder.DialogAction.send('Ma che cazzo vuoi?? Stai zitto e basta!!'));
dialog.matches('Ringraziamento', builder.DialogAction.send('Grazie mulo!'));




dialog.onDefault(builder.DialogAction.send("I'm sorry I didn't understand. I can only create & delete alarms."));


process.on('uncaughtException', function (err) {
    console.log(err);
}); 


//
// BOT DIALOGS
//
/*
bot.dialog('/', function(session){
	session.send("Hello World! Ciao a tutti :)");
});
*/
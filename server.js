// Title: server.js
// Purpose: start the node.js server for the SWGOH ranking table website
// Dependencies: express, handlebars, MySQL
// Author: Cameron Kocher

var path = require('path');
var express = require('express');
var handlebars = require('handlebars');
var exphbs = require('express-handlebars');
var mysql = require('mysql');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

var con = mysql.createConnection({
	host: "localhost",
	user: "hydra314",
	database: "swgoh"
});

function sortAlignment(array){
	for(var i = 0; i < array.length; i++){
		for(var j = 0; j < array.length - i - 1; j++){
			if(array[j].alignment == 'DS' && array[j + 1].alignment == 'LS'){
				var temp = array[j];
				array[j] = array[j + 1];
				array[j + 1] = temp;
			}
		}
	}
	return array;
}

con.connect(function(err){
	if(err) throw err;
	con.query("SELECT * FROM characters", function(err, result, fields){
		if(err) throw err;
		else characterData = result;

		var gmList = [], masterList = [], knightList = [], padawanList = [], younglingList = [];
		for(var i = 0; i < characterData.length; i++){
			if(characterData[i].rank == 'Grand Master') 
				characterData[i].rank = 'grand-master';
			else if(characterData[i].rank != 'Grand Master') 
				characterData[i].rank = characterData[i].rank.charAt(0).toLowerCase() + characterData[i].rank.slice(1);

			characterData[i].faction = characterData[i].faction.split(',');

			for(var j = 0; j < characterData[i].faction.length; j++){
			    switch(characterData[i].faction[j]){
			      case 'Bounty Hunter': characterData[i].faction[j] = 'bounty-hunter'; break;
			      case 'Clone Trooper': characterData[i].faction[j] = 'clone-trooper'; break;
			      case 'First Order': characterData[i].faction[j] = 'first-order'; break;
			      case 'Galactic Republic': characterData[i].faction[j] = 'galactic-republic'; break;
			      case 'Imperial Trooper': characterData[i].faction[j] = 'imperial-trooper'; break;
			      default: characterData[i].faction[j] = characterData[i].faction[j].charAt(0).toLowerCase() + characterData[i].faction[j].slice(1); break;
    			}
  			}

			switch(characterData[i].rank){
				case 'grand-master':
					gmList.push(characterData[i]);
					break;
				case 'master':
					masterList.push(characterData[i]);
					break;
				case 'knight':
					knightList.push(characterData[i]);
					break;
				case 'padawan':
					padawanList.push(characterData[i]);
					break;
				case 'youngling':
					younglingList.push(characterData[i]);
					break;
				default:
					break;
			}
		}

		handlebars.registerHelper("modThree", function(index, object){
			if(index % 3 === 0 && index != 0) return object.fn(this);
			else return object.inverse(this);
		});

		app.get('/', function(req, res){
			res.status(200).render('charRankingTable', {
				gmList: sortAlignment(gmList), 
				masterList: sortAlignment(masterList), 
				knightList: sortAlignment(knightList), 
				padawanList: sortAlignment(padawanList), 
				younglingList: sortAlignment(younglingList)
			});
		});

		app.use(express.static('public'));

		app.get('*', function(req, res){
			res.status(404).render('404');
		});

		app.listen(port, function(){
			console.log("== Server is listening on port", port);
		});
	});
});

/*app.get('/:characters', function(req, res){
	res.status(200).render('characterList');
});

app.get('/:characters/:characterName', function(req, res, next){
	var characterName = req.params.characterName;
	if(){

	}
	else{
		next();
	}
});*/

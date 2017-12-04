// Title: index.js
// Purpose: apply filters
// Author: Luke Miletta

var allChars = [];
var grandmasterTable = document.getElementById('grand-master-table');
var masterTable = document.getElementById('master-table');
var knightTable = document.getElementById('knight-table');
var padawanTable = document.getElementById('padawan-table');
var younglingTable = document.getElementById('youngling-table');

window.addEventListener('DOMContentLoaded', function(){
  var charElems = document.getElementsByClassName('character');
  for(var i = 0; i < charElems.length; i++){
    allChars.push(parseCharElems(charElems[i]));
  }

  var filterUpdateButton = document.getElementById('filter-update-button');
  if(filterUpdateButton){
    filterUpdateButton.addEventListener('click', doFilterUpdate);
  }
});

function parseCharElems(charElem){
  var character = {
    name: charElem.getAttribute('data-name'),
    alignment: charElem.getAttribute('data-alignment'),
    rank: charElem.getAttribute('data-rank'),
    faction: charElem.getAttribute('data-faction').split(' '),
    pic: charElem.getAttribute('src')
  };
  return character;
}

function doFilterUpdate(){
  var filters = {
    text: document.getElementById('filter-text').value.trim(),
    rank: [],
    faction: []
  }

  var filterRankCheckedInputs = document.querySelectorAll('#filter-rank input:checked');
  var filterFactionCheckedInputs = document.querySelectorAll('#filter-faction input:checked');
  for(var i = 0; i < filterRankCheckedInputs.length; i++)
    filters.rank.push(filterRankCheckedInputs[i].value);
  for(var i = 0; i < filterFactionCheckedInputs.length; i++)
    filters.faction.push(filterFactionCheckedInputs[i].value);

  /*for(var i = 0; i < filters.rank.length; i++){
    switch(filters.rank[i]){
      case 'grand-master': filters.rank[i] = 'Grand Master';  break;
      default: filters.rank[i] = filters.rank[i].charAt(0).toUpperCase() + filters.rank[i].slice(1); break;
    }
  }

  for(var i = 0; i < filters.faction.length; i++){
    switch(filters.faction[i]){
      case 'bounty-hunter': filters.faction[i] = 'Bounty Hunter'; break;
      case 'clone-trooper': filters.faction[i] = 'Clone Trooper'; break;
      case 'first-order': filters.faction[i] = 'First Order'; break;
      case 'galactic-republic': filters.faction[i] = 'Galactic Republic'; break;
      case 'imperial-trooper': filters.faction[i] = 'Imperial Trooper'; break;
      default: filters.faction[i] = filters.faction[i].charAt(0).toUpperCase() + filters.faction[i].slice(1); break;
    }
  }*/
  var charElems = document.querySelectorAll('.character');
  charElems.forEach(function(character, index){
    cell = character.parentNode;
    cell.style.visibility = 'visible';
    if(!passesFilters(parseCharElems(character), filters)){
      cell.style.visibility = 'hidden'
    }
  });
}

function passesFilters(character, filters){
  if(filters.text){
    var name = character.name.toLowerCase();
    var filterText = filters.text.toLowerCase();
    if(name.indexOf(filterText) === -1){
      console.log("Search fail");
      return false;
    }
  }

  if(filters.rank.length != 0){
    if(filters.rank.indexOf(character.rank) === -1){
      return false;
    }
    /*if(filters.rank.indexOf('grand-master') === -1) grandmasterTable.remove();
    if(filters.rank.indexOf('master') === -1) masterTable.remove();
    if(filters.rank.indexOf('knight') === -1) knightTable.remove();
    if(filters.rank.indexOf('padawan') === -1) padawanTable.remove();
    if(filters.rank.indexOf('youngling') === -1) younglingTable.remove();*/
  }

  if(filters.faction.length != 0){
    var match = false;
    for(var i = 0; i < filters.faction.length; i++){
      for(var j = 0; j < character.faction.length; j++){
        if(filters.faction[i] == character.faction[j]) match = true;
      }
    }
    if(match == false){
      return false;
    }
  }

  return true;
}
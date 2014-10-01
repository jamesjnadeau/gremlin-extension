// Copyright (c) 2012 James Nadeau
console.log('popup.js');
//set up horde

var unleash_horde = document.getElementById("unleash_horde");
var stop_horde = document.getElementById("stop_horde");

unleash_horde.addEventListener("click", function() { 
	unleash_horde.style.display = 'none';
	stop_horde.style.display = 'block';
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		console.log(tabs);
		chrome.tabs.sendMessage(tabs[0].id, {type: "start_horde"}, function(response) {
			console.log(response);
		});
	});
	

});

stop_horde.addEventListener("click", function() { 
	unleash_horde.style.display = 'block';
	stop_horde.style.display = 'none';
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		console.log(tabs);
		chrome.tabs.sendMessage(tabs[0].id, {type: "stop_horde"}, function(response) {
			console.log(response);
		});
	});
});

// Run on dom ready
document.addEventListener('DOMContentLoaded', function () {
  
});



// Copyright (c) 2012 James Nadeau
console.log('popup.js');

// Run on dom ready
document.addEventListener('DOMContentLoaded', function () {
	var unleash_horde = document.getElementById("unleash_horde");
	var stop_horde = document.getElementById("stop_horde");
	var seed_horde = document.getElementById("seed_horde");
	
	//get current status
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		console.log(tabs);
		chrome.tabs.sendMessage(tabs[0].id, {type: "status"}, function(response) {
			if(typeof(response) !== 'undefined')
			{
				console.log(response['_gremlins'].length);
				if(response['_gremlins'].length)
				{
					unleash_horde.style.display = 'none';
					stop_horde.style.display = 'block';
				}
			}
		});
	});
	
	
	unleash_horde.addEventListener("click", function() { 
		unleash_horde.style.display = 'none';
		stop_horde.style.display = 'block';
		chrome.browserAction.setIcon({path: 'gremlin_hording.png'})
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {type: "start_horde"});
		});
	});
	
	stop_horde.addEventListener("click", function() { 
		unleash_horde.style.display = 'block';
		stop_horde.style.display = 'none';
		chrome.browserAction.setIcon({path: 'gremlin.png'})
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {type: "stop_horde"});
		});
	});
	
	seed_horde.addEventListener("change", function() { 
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {type: "seed_horde", value: seed_horde.value });
		});
	});
});



const fs = require('fs');
const request = require("request");
const cheerio = require("cheerio");

const npmurl = 'https://www.npmjs.com/package/';

fs.readFile('package.json', (err, data) => {
	var packages = JSON.parse(data.toString());
	var dependencies = packages.dependencies;

	for (var dependency in dependencies) {
		var url = npmurl + dependency;
		(function(url) { request(url, function(error, response, body) {  
  	  if (error) throw error;

      var $ = cheerio.load(body);
      var license = $('.sidebar').children('ul.box').first().children('li').last().children('a').text();

      console.log(url);
      console.log('License: ', license);
	  })}(url));
	}
});

exports.export = function() {
  fs.readFile('package.json', (err, data) => {
    var packages = JSON.parse(data.toString());
    var dependencies = packages.dependencies;

    for (var dependency in dependencies) {
      var url = npmurl + dependency;
      (function(url) { request(url, function(error, response, body) {  
        if (error) throw error;

        var $ = cheerio.load(body);
        var license = $('.sidebar').children('ul.box').first().children('li').last().children('a').text();

        console.log(url);
        console.log('License: ', license);
      })}(url));
    }
  });
};
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
      var license = 'None';

      var postElements = $("#user-content-license");
      console.log(url);
      postElements.each(function() {
        var postTitle = $(this).parent().next().text();
        license = postTitle;
      });

      console.log('License: ', license);
	  })}(url));
	}
});
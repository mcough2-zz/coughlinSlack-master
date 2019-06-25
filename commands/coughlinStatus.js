var request = require('request');
var util = require('../util');


module.exports = function (param) {
  var	channel		= param.channel;
  var API_KEY = process.env.API_KEY;
  endpoint = param.commandConfig.endpoint

  // Setup the Server API options
  var options = {
    uri: endpoint,
    headers: {'X-Api-Key': API_KEY},
    Accept: 'application/json',
  };
var serverData;
var finaloutput;
//Make the request for Insights Data
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var redServers = "";
      var orangeServers = "";
      var greenServers = "";
      serverData = JSON.parse(body);
      for (i=0; serverData.servers.length > i; i++){
        if (serverData.servers[i].health_status == 'red') {
          redServers = redServers + '\n' +serverData.servers[i].name + ':' + '\n';
          redServers = redServers + 'CPU Usage is ' +  serverData.servers[i].summary.cpu + '%' + '\n';
          redServers = redServers + 'Disk I/O is ' +  serverData.servers[i].summary.disk_io + '%' + '\n';
          redServers = redServers + 'Memory is ' +  serverData.servers[i].summary.memory + '%' + '\n';
          redServers = redServers + 'Fullest Disk is ' +  serverData.servers[i].summary.fullest_disk + '%' + '\n';
        }
        if (serverData.servers[i].health_status == 'orange') {
          orangeServers = orangeServers + '\n' +serverData.servers[i].name + ':' + '\n';
          orangeServers = orangeServers + 'CPU Usage is ' +  serverData.servers[i].summary.cpu + '%' + '\n';
          orangeServers = orangeServers + 'Disk I/O is ' +  serverData.servers[i].summary.disk_io + '%' + '\n';
          orangeServers = orangeServers + 'Memory is ' +  serverData.servers[i].summary.memory + '%' + '\n';
          orangeServers = orangeServers + 'Fullest Disk is ' +  serverData.servers[i].summary.fullest_disk + '%' + '\n';
        }
        if (serverData.servers[i].health_status == 'green') {
          greenServers = greenServers + '\n' +serverData.servers[i].name + ':' + '\n';
          greenServers = greenServers + 'CPU Usage is ' +  serverData.servers[i].summary.cpu + '%' + '\n';
          greenServers = greenServers + 'Disk I/O is ' +  serverData.servers[i].summary.disk_io + '%' + '\n';
          greenServers = greenServers + 'Memory is ' +  serverData.servers[i].summary.memory + '%' + '\n';
          greenServers = greenServers + 'Fullest Disk is ' +  serverData.servers[i].summary.fullest_disk + '%' + '\n';
        }
      }
      finaloutput = '-----RED-----' + redServers + '\n' + '-----Orange-----' + orangeServers + '\n' +'-----Green-----' + greenServers + '\n';
      util.postMessage(param.channel, finaloutput);
    } else {
      util.postMessage(param.channel, ' Insights request error: ' + error + '   ' + API_KEY);
    }
  });
};

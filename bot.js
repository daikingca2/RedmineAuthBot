var Botkit = require('botkit');

if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var controller = Botkit.slackbot({
 debug: false
});

controller.spawn({
  token: process.env.token
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});


// オレオレ証明書対策
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// redmineのチケットっぽいurlを拾ったら
controller.hears(["<redmineurl>/issues","^pattern$"],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
    var url = message.text;
    // "<>"の削除 ※暫定対応
    var url = url.substr(1);
    var url = url.substr( 0, url.length-1 );
    var util = require('util');
    // console.log(util.inspect(url,false,null));
    var request = require('request');
    var apikey = <redmine-api-key>;
    var requesturl = url + '.json?key=' + apikey;
    var options = {
      url: requesturl,
      json: true
    };

    try {
        request.get(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var author = '担当者 : ' + body.issue.author.name.toString();
            var subject = 'タイトル : ' + body.issue.subject.toString();
            bot.reply(message, author);
            bot.reply(message, subject);
          } else {
            console.log('error: '+ response.statusCode);
          }
        });
    } catch (e) {
        console.log('error: '+ e);
        return 0;
    } finally {
        console.log('finally');
        return 0;
    }

});

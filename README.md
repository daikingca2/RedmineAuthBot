# RedmineAuthBot

##なにをしたいのか
認証ありのRedmineチケットのURLをSlackで展開表示させたい。

##どうやって実現するのか
Hubotにやってもらう

SlackにRedmineのチケット番号orURLが投稿される  
↓  
RedmineのAPIを使って、チケット番号からチケット情報をjsonで取得  
↓  
取得したjsonから必要な情報(チケット名、担当者名、etc...)のみを取得  
↓   
Slackに投稿  

これで、URLが展開してるっぽくなる。  

##環境(予定)
・Heroku  
・Botkit  

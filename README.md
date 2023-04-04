# Coinmarketcap Tracker

This is a backend App. It is built using Nest.js, MongoDb, and Mongoose. It provides an API for creating daily coinmarketcap data by using coinmarketcap api. Then It runs a logic which finds best 10 coins made progress. Then It send message daily by controlling a telegram bot

## Prerequisites

1. Node.js and npm installed
2. Docker installed
3. Creating MongoDb Account
4. Creating Telegram Account and getting Telegram token. Check this out doing this <https://medium.com/geekculture/generate-telegram-token-for-bot-api-d26faf9bf064>
5. Creating Coinmarketcap account and gettting coinmarketcap apikey. Check this out doing this <https://coinmarketcap.com/api/documentation/v1/#section/Quick-Start-Guide>

6. You need to create .env file. Create it in the root directory of project or change into the env.example file to .env file with your real values such as mongodb connection string, coinmarketcap apikey, Telegram token, Telegram ChatID or Telegram ChannelID

.env file
```
MONGO_URI=my-mongodb-uri
MONGO_INITDB_ROOT_USERNAME= username
MONGO_INITDB_ROOT_PASSWORD=password
CMC_APIKEY=CoinmarketCapApiKey
TELEGRAM_TOKEN='TelegramToken'
TELEGRAM_CHAT_ID=TelegramChatId
TELEGRAM_CHANNELID=-TelegramChannelId

```


## Installation

**Note**: This app has been dockerized by using docker-compose.

1. Clone the repository
2. Run `npm install`
2. Run this command: `docker compose up`

It will create two containers such as mongodb container and app container

<img width="312" alt="image" src="https://user-images.githubusercontent.com/23223573/229851927-fc9ec1df-8ae8-47ee-bd2a-0b2cd389c26d.png">




# Logger 
This is custom logger created for backend for @orkait services, its a shared logger.


## Usage/Examples

```javascript
import Logger, { filoQueue, loggerRedisClient } from "@orkait/logger";
import express from "express";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const redisClient = loggerRedisClient(
	"redis://YOUR_REDIS_URL",
	"YOUR_REDIS_PASSWORD"
);
const redis = redisClient.createConnection();

const queue = filoQueue({
	key: "KEY_NAME",
	redisInstance: redis,
	maxsize: 100,
	opts: {
		unique: true,
	}
})

app.listen(2000, async () => {
	const logger = new Logger("test", queue);

	logger.info({
	    message: "hello"
	});
});

process.on("SIGINT", function () {
	redisClient.closeConnection();
	console.log("redis client quit");
});

```


# Logger 
This is a redis logger, made for only custom purposes


## Supports
```Nodejs: since it depends on @types/node```
```Browser: not supported```


## Install
```npm install @orkait/logger```
or
```yarn add @orkait/logger```


## Usage/Examples

```javascript
import Logger, { filoQueue, loggerRedisClient } from "@orkait/logger";
import express from "express";
const app = express();

const redisClient = loggerRedisClient(
	"redis://YOUR_REDIS_URL",
	"YOUR_REDIS_PASSWORD"
);
const redis = redisClient.connect();

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
	redisClient.disconnect();
	console.log("redis client quit");
});

```


## types

```typescript
export type filoQueueType = ReturnType<typeof filoQueue>;
export type filoConfigType = {
	key: string;
	redisInstance: RedisClientType;
	maxsize: number;
	opts: {
		unique: boolean;
	};
};

export type level = "high" | "low" | "medium" | "critial" | "fatal" | "severe"
export type type = "client" | "server" | "database" | "cron" | "queue";

export interface Ierror {
	message: string;
	status?: number;
	level?: level;
	type?: type;
	error?: Error;
}

export interface Iwarning {
	message: string;
	status?: number;
}

export interface Iinfo {
	message: string;
	type?: type;
	status?: number;
}

export interface Isuccess {
	message: string;
	type?: type;
	status?: number;
}

export interface Icron {
	message: string;
}

export interface Iserver {
	message: string;
	type?: type;
}
```

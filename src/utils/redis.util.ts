import type { RedisClientType } from "redis";
import { createClient } from "redis";

export const loggerRedisClient = (url: string, password: string) => {
	let _redisClient: RedisClientType;
	const connect = () => {
		if (!_redisClient) {
			_redisClient = createClient({
				url: url,
				password: password,
			});

			_redisClient.on("error", (err) =>
				console.log("Redis Client Error", err)
			);
			_redisClient.connect();
		}

		return _redisClient;
	};

	const disconnect = (): void => {
		try {
			_redisClient.disconnect();
		} catch (e: any) {
			console.log(e.message);
		}
	};
	return {
		connect,
		disconnect,
	};
};
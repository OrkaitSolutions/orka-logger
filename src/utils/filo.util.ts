import { RedisCommandArgument } from "@redis/client/dist/lib/commands";
import { filoConfigType } from "../types";

// filo implementation of queue using LIST in redis
export const filoQueue = (config: filoConfigType) => {
	async function push(value: RedisCommandArgument, stringify = true) {
		if (stringify) {
			try {
				value = JSON.parse(value as never);
			} catch (error) {
				throw new Error("Invalid JSON");
			}
		}
		try {
			if (config.opts.unique) {
				// remove previous value if exists
				await config.redisInstance.lRem(config.key, 0, value);
			}

			// push the new element
			await config.redisInstance.lPush(config.key, value);

			// trim if the list is too long --> time complexity O(1)
			await config.redisInstance.lTrim(config.key, 0, config.maxsize);
			return 0;
		} catch (error) {
			return -1;
		}
	}

	async function pop() {
		try {
			if ((await config.redisInstance.lLen(config.key)) > 0) {
				return await config.redisInstance.rPop(config.key);
			}
			return "0";
		} catch (error) {
			return "-1";
		}
	}

	return {
		push,
		pop,
	};
};

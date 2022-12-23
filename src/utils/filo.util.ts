import { filoConfigType } from "../types";

// filo implementation of queue using LIST in redis
export const filoQueue = (config: filoConfigType) => {
	const push = async (value: any) => {
		let val;
		// check if typeof value is object if object then stringify it
		if (typeof value === "object") {
			val = JSON.stringify(value);
		} else {
			val = value;
		}

		try {
			if (config.opts.unique) {
				// remove previous value if exists
				await config.redisInstance.lRem(config.key, 0, val);
			}

			// push the new element
			await config.redisInstance.lPush(config.key, val);

			// trim if the list is too long
			// time complexity O(1)
			await config.redisInstance.lTrim(config.key, 0, config.maxsize);
			return 0;
		} catch (error) {
			return -1;
		}
	};

	const pop = async () => {
		try {
			if ((await config.redisInstance.lLen(config.key)) > 0) {
				return await config.redisInstance.rPop(config.key);
			}
			return "0";
		} catch (error) {
			return "-1";
		}
	};

	return {
		push,
		pop,
	};
};

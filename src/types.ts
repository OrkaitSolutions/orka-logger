import { filoQueue } from "./utils/filo.util";
import type { RedisClientType } from "redis";

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

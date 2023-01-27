import {
	Ierror,
	Isuccess,
	Iserver,
	Icron,
	Iwarning,
	Iinfo,
	filoQueueType,
} from "./types";
import kleur from "kleur";
import { parse } from "path";

const timeNow = () => {
	return new Date().toLocaleString();
};

class Logger {
	shortname: string;
	time: {
		date: Date;
		timestamp: number;
	};
	queue: filoQueueType | null;
	constructor(filename: string, queue?: filoQueueType | null) {
		if (!filename) {
			throw new Error("Filename is required");
		}
		this.shortname = parse(filename).name;
		this.time = {
			date: new Date(),
			timestamp: Date.now(),
		};
		this.queue = queue ? queue : null;
	}

	error(config: Ierror) {
		const messageFormat = `Error >> ${timeNow()} >> ${this.shortname} >> ${
			config.error?.message
		}`;
		console.log(kleur.bgRed().black().bold(messageFormat));

		if (this.queue) {
			this.queue.push(
				JSON.stringify({
					msg: config.error?.message,
					status: config.status,
					level: config.level,
					name: config.error?.name,
					stack: config.error?.stack,
					log: "error",
					filename: this.shortname,
					...this.time,
				})
			);
		}
	}

	warning(config: Iwarning) {
		const messageFormat = `Warning >> ${timeNow()} >> ${
			this.shortname
		} >> ${config.message}`;
		console.log(kleur.bgMagenta().bold(messageFormat));

		if (this.queue) {
			this.queue.push(
				JSON.stringify({
					message: config.message || "",
					status: config.status,
					log: "warning",
					...this.time,
				})
			);
		}
	}

	info(config: Iinfo) {
		const messageFormat = `Success >> ${timeNow()} >> ${
			this.shortname
		} >> ${config.message}`;
		console.log(kleur.bgYellow().black().bold(messageFormat));

		if (this.queue) {
			this.queue.push(
				JSON.stringify({
					message: config.message || "",
					status: config.status,
					log: "info",
					...this.time,
				})
			);
		}
	}

	success(config: Isuccess) {
		const messageFormat = `Success >> ${timeNow()} >> ${
			this.shortname
		} >> ${config.message}`;
		console.log(kleur.bgGreen().black().bold(messageFormat));

		if (this.queue) {
			this.queue.push(
				JSON.stringify({
					message: config.message || "",
					status: config.status,
					log: "success",
					...this.time,
				})
			);
		}
	}

	server(config: Iserver) {
		const messageFormat = `Server >> ${timeNow()} >> ${this.shortname} >> ${
			config.message
		}`;
		console.log(kleur.bgBlue().black().bold(messageFormat));

		if (this.queue) {
			this.queue.push(
				JSON.stringify({
					message: config.message || "",
					log: "server",
					...this.time,
				})
			);
		}
	}

	cron(config: Icron) {
		const messageFormat = `Cron >> ${timeNow()} >> ${this.shortname} >> ${
			config.message
		}`;
		console.log(kleur.bgCyan().black().bold(messageFormat));

		if (this.queue) {
			this.queue.push(
				JSON.stringify({
					message: config.message || "",
					log: "cron",
					...this.time,
				})
			);
		}
	}
}

// export utilities
export * from "./utils/filo.util";
export * from "./utils/redis.util";

// export all types
export * from "./types";

// export default Logger
export default Logger;

import * as dotenv from "dotenv";
dotenv.config();

enum ENVIRONMENTS {
	TEST = "test",
}

const ENV = process.env.ENV;

export const logger = (message: string) => {
	if (ENV !== ENVIRONMENTS.TEST) {
		console.log(message);
	}
};

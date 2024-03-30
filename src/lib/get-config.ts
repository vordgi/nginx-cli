import { type Config } from "./types";
import { CACHE_KEY, CACHE_PATH } from "./data";
import cacache from "cacache";

const getConfig = async () => {
	try {
		const { data } = await cacache.get(CACHE_PATH, CACHE_KEY);
		const cachedConfig = JSON.parse(data.toString()) as Config;

		if (cachedConfig?.nginxPath) {
			return cachedConfig;
		}
	} catch {
		//
	}

	console.log('\nError: Invalid config\n');
	return;
};

export default getConfig;

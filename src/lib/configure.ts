import { type Config } from "./types";
import { createPromptModule } from "inquirer";
import cacache from "cacache";
import { CACHE_KEY, CACHE_PATH } from "./data";
import { readdir } from "fs/promises";
import { existsSync } from "fs";

const prompt = createPromptModule();

const configure = async (config?: Config) => {
	let defaultNginxPath = config?.nginxPath;

	if (!defaultNginxPath) {
		const rootFiles = await readdir('\\');
		const nginxFolder = rootFiles.toString().split(',').find(el => el.match(/nginx-[0-9]+\.[0-9]+\.[0-9]+/));
		if (nginxFolder) {
			defaultNginxPath = `\\${nginxFolder}`;
		}
	}

	const newConfig = await prompt([
		{
			type: 'input',
			name: 'nginxPath',
			message: 'Nginx path:',
			default: defaultNginxPath,
		},
	]);

	if (!newConfig.nginxPath || !existsSync(newConfig.nginxPath)) {
		console.error(`Invalid path: "${newConfig.nginxPath}"`);
		return;
	}

	await cacache.put(CACHE_PATH, CACHE_KEY, JSON.stringify(newConfig, null, 2));
	console.log('\nSaved\n');
};

export default configure;

#! /usr/bin/env node

import { exec } from "child_process";
import fs from "fs-extra";
import pkgData from "../package.json";
import configure from "./lib/configure";
import getConfig from "./lib/get-config";
import stop from "./lib/stop";
import start from "./lib/start";
import checkIsRunned from "./lib/check-is-runned";

const commands = ['-v', '--version', 'c', 'root', 'start', 'stop', 'status', 'restart', '--help', '-h'];
const command = process.argv[2];

if (!commands.includes(command)) {
	console.log(`Unknown command: "${command}". To see a list of supported commands, run "ng -h"`);
	process.exit();
}

if (command === '-v' || command === '--version') {
	console.log(pkgData.version);
	process.exit();
}

if (command === '-h' || command === '--help') {
	console.log(`
	'c' - configure nginx for package
	'start' - start nginx
	'status' - check is nginx started
	'stop' - exit nginx
	'restart' - restart nginx
	'root' - run nginx command (f.e. "ng -s quit")
	'--version', '-v' - version of package
	'--help', '-h' {Boolean} - help
`);
	process.exit();
}

const runCommand = async () => {
	const config = await getConfig();

	if (command === 'c') {
		await configure(config);
		return;
	}

	if (!config || !fs.existsSync(config.nginxPath)) {
		console.log('Error: Nginx not installed. Please configure nginx via command "ng c"');
		process.exit();
	}

	if (command === 'root') {
		const params = process.argv.slice(3).join(' ');

		if (!params) {
			console.error('Please write command');
			process.exit();
		}

		exec(`nginx ${params}`, { cwd: config.nginxPath }, (_err, stdout, stderr) => {
			if (stderr) {
				console.error(stderr);
			} else {
				console.log(stdout || 'Done');
			}
		});
	}

	if (command === 'start') {
		start(config.nginxPath);

		setTimeout(() => {
			console.log('nginx started');
			process.exit();
		}, 1000);
	}

	if (command === 'status') {
		if (checkIsRunned()) {
			console.log('Already started');
		} else {
			console.log('Nginx not started');
		}

		process.exit();
	}

	if (command === 'stop') {
		stop();
		setTimeout(() => {
			console.log('nginx stopped');
			process.exit();
		}, 1000);
	}

	if (command === 'restart') {
		stop();
		start(config.nginxPath);
		setTimeout(() => {
			console.log('nginx restarted');
			process.exit();
		}, 1000);
	}
};

runCommand();

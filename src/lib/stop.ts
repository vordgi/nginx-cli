import { execSync } from "child_process";
import checkIsRunned from "./check-is-runned";

const stop = () => {
    if (!checkIsRunned()) {
        console.log('Error: Nginx not started. Use -h for read about commands.');
        process.exit();
    }

    execSync('taskkill /im nginx.exe /f');
}

export default stop;
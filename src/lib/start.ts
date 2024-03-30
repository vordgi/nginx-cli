import { exec } from "child_process";
import checkIsRunned from "./check-is-runned";

const start = (nginxPath: string) => {
    if (checkIsRunned()) {
        console.log('Error: Nginx already started. Use -h for read about commands.');
        return;
    }

    exec(`start nginx`, { cwd: nginxPath }, (error) => {
        if (error) {
            throw error;
        }
    });
}

export default start;
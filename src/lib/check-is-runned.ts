import { execSync } from "child_process";

const checkIsRunned = () => {    
    const taskList = execSync(`tasklist`);

    return taskList.toString().includes('nginx.exe');
}

export default checkIsRunned;

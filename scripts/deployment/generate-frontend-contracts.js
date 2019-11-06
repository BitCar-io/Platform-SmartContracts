const fs = require('fs');
const path = require('path');
require('dotenv').config();

const buildPath = path.normalize(path.join(__dirname, "../../build/contracts"));
const frontendPath = path.normalize(path.join(__dirname, process.env.FRONTENDCONTRACTPATH));

if(!fs.existsSync(buildPath)) {
    console.error("Backend build path does not exist! Please ensure a truffle migrate has been done.", buildPath);
    return;
}

if(!fs.existsSync(frontendPath)) {
    fs.mkdirSync(frontendPath);
} else {
    fs.readdirSync(frontendPath).forEach(file => {

        if(path.extname(file) !== "json") {
            return;
        }
        
        console.log("Removing existing frontend file", file);
        fs.unlinkSync(path.join(frontendPath, file));
    });
}

const contractFiles = [];

fs.readdirSync(buildPath).forEach(file => {
    contractFiles.push(path.join(buildPath, file));
});

for (let i = 0; i < contractFiles.length; i++) {
    let currentFile = contractFiles[i];
    fs.readFile(currentFile, (err, rawData) => {
        const contractJson = JSON.parse(rawData);
        const writableObject = JSON.stringify({
            "contractName": contractJson.contractName,
            "abi": contractJson.abi,
            "networks": contractJson.networks
        });

        const newFileName = path.join(frontendPath, path.basename(currentFile));
        fs.writeFile(newFileName, writableObject, 'utf8', err => {

            if(err) {
                console.error(`Failed to create frontend contract file ${newFileName}`, err);
                return;
            }

            console.log("Successfully created frontend contract file: ", newFileName);
        });
    });
}
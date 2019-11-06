const fs = require('fs');
const path = require('path');
const Minio = require("minio");
require('dotenv').config();

function isValidValue(environment) {
    return !(!environment || environment.trim().length === 0);
}

const args = process.argv.slice(2);
let environment = process.env.CI_COMMIT_REF_NAME;

if(!isValidValue(environment) && args.length === 0) {
    throw new Error("Expected at least a value in environment variable 'CI_COMMIT_REF_NAME' or 1 argument specifying the environment being deployed as non-empty string. TERMINATING.");
} else if(!isValidValue(environment)) {
    environment = args[0].toLowerCase().trim();
}

if(!isValidValue(environment)) {
    throw new Error("Expected at least a value in environment variable 'CI_COMMIT_REF_NAME' or 1 argument specifying the environment being deployed as non-empty string. TERMINATING.");
}

const minioClient = new Minio.Client({
    endPoint:  process.env.BUCKET_HOST,
    port:  parseInt(process.env.BUCKET_PORT),
    useSSL: false,
    accessKey: process.env.BUCKET_ACCESSKEY,
    secretKey: process.env.BUCKET_SECRETKEY
});

const frontendPath = path.normalize(path.join(__dirname, process.env.FRONTENDCONTRACTPATH));
const bucketPath = `platform/backend/${environment}/contracts/`;

if(!fs.existsSync(frontendPath)) {
    return console.error(`${frontendPath} does not exist`);
}

minioClient.bucketExists(process.env.BUCKET_NAME, function(err, exists) {
    if (err) {
        return console.error(err)
    }
})

fs.readdirSync(frontendPath).forEach(file => {
    const filePath = path.normalize(path.join(__dirname, process.env.FRONTENDCONTRACTPATH, file));
    var fileStream = fs.createReadStream(filePath);
    var fileStat = fs.stat(filePath, function(err, stats) {
        if (err) {
            return console.error(err);
        }

        let fullSavePath = bucketPath + file;

        minioClient.putObject(process.env.BUCKET_NAME, fullSavePath, fileStream, stats.size, function(err, etag) {
            if(err) {
                return console.error(err);    
            }
            return console.log(`Added ${file} with ${etag} to ${environment} bucket \t${fullSavePath}`);
        })
    })
});
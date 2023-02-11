import { S3 } from 'aws-sdk';
import axios from 'axios';
import { v4 } from 'uuid';
import path from 'path';
import fs from 'fs';

export const imageToS3 = async (pathToSave:string, url: string): Promise<string> => {
    const tmpFolder = path.resolve(`./tmp/uploads`);
    const fileName = `${v4()}.png`;
    const fileDir = `${tmpFolder}/${fileName}`;
    const s3FileName = `${pathToSave}/${fileName}`;

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });

    if (!fs.existsSync(tmpFolder)) fs.mkdirSync(tmpFolder, { recursive: true });

    const item = path.resolve(__dirname, tmpFolder, fileName);
    const writer = fs.createWriteStream(item)

    response.data.pipe(writer)

    new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    }).then(async () => {
        const s3Client = new S3({
            endpoint: 'http://localhost:9090',
            s3ForcePathStyle: true,
            signatureVersion: 'v3',
            credentials: {
                accessKeyId: 'cooool',
                secretAccessKey: 'niceone',
            }
        });

        const blob = fs.readFileSync(fileDir);

        try {
            await s3Client
                .upload({
                    Bucket: 'bucket',
                    Key: s3FileName,
                    ContentType: 'png',
                    Body: blob,
                })
                .promise();

        } catch (error) {
            console.log(error);
        }
    });

    removeTmpFolder();
    return s3FileName;
}

export const removeTmpFolder = async () => {
    const tmpFolder = path.resolve(`./tmp`);

    fs.rm(tmpFolder, { recursive: true }, () => { })
}
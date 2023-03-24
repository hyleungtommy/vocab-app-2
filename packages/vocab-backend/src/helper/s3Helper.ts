import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';

dotenv.config()
const s3 = new S3Client(
    {
        region: process.env.REGION,
        credentials: {
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        },
    }
);

export async function getUserIcon(username: string) {
    
    try {
        const params = {
            Bucket: "vocab-app-upload",
            Key: `icon-${username}.jpg`
        };
        const getObjectCommand = new GetObjectCommand(params)
        const { Body, ContentType } = await s3.send(getObjectCommand);
        const imgData = await Body?.transformToByteArray() || new Uint8Array();
        if (imgData) {
            var base64 = btoa(
                imgData
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            return `data:${ContentType};base64,${base64}`;
        } else {
            return ``
        }
    } catch (err) {
        return ``
    }

}

export async function uploadUserIcon(id: string, file: any) {
    const params = {
        Bucket: "vocab-app-upload",
        Key: `icon-${id}.jpg`,
        Body: file,
        ACL: 'public-read'
    };
    const putObjectCommand = new PutObjectCommand(params);
    const result = await s3.send(putObjectCommand);
}
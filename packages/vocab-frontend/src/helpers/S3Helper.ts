import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
const s3 = new S3Client(
    {
        region: "us-east-1",
        credentials: {
            accessKeyId: "",
            secretAccessKey: ""
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
        console.log(Body)
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
    console.log(result)
}
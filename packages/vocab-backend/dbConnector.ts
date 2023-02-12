import * as AWS from "@aws-sdk/client-dynamodb";
import * as dotenv from 'dotenv';

dotenv.config()

const db  = new AWS.DynamoDB(
    { 
        region: process.env.REGION ,
        credentials: {
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
          },
    }
);

export default db;

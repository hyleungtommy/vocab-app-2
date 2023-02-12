import db from '../../dbConnector';
import { unmarshall } from "@aws-sdk/util-dynamodb";

async function getLanguageList(){
    var param = {
        TableName: "languages"
    }
    var {Items} =  await db.scan(param);
    return Items.map((item)=>unmarshall(item));
}

function test(a:number,b:number):number{
    return a + b
}

export {
    getLanguageList,
    test
}
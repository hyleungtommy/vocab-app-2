import db from '../../dbConnector';
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import * as crypto from 'crypto';

async function getUserList(){
    var param= {
        TableName: "Users"
    }
    var {Items} = await db.scan(param)
    return Items.map((item)=>unmarshall(item));
}

async function getUserEntry(id:string){
    var param = {
        TableName: "Users",
        Key:{
            '_id' : {S : id}
        }
    }
    var {Item} = await db.getItem(param)
    return unmarshall(Item);
}

async function getLangListByUserId(id:string){
    try{
        const user = await getUserEntry(id);
        if(user){
            //console.log(user);
            var langList = user.langList as any
            if(langList.length > 0){
                var langObject = {}
                var index = 0
                langList.forEach((value)=>{
                    index ++;
                    var key = ':lang' + index
                    langObject[key] = {S : value}
                })
    
                var param = {
                    TableName: "languages",
                    FilterExpression: '#c IN (' + Object.keys(langObject) + ')',
                    ExpressionAttributeNames: {
                        '#c' : 'code'
                    },
                    ExpressionAttributeValues: langObject
                }
    
                var {Items} = await db.scan(param)
                return Items.map((item)=>unmarshall(item));
            }
        }
    }catch(err){
        console.log(err);
    }
    return undefined;
}

async function getAvailableLangListByUserId(id){
    try{
        const user = await getUserEntry(id)
        if(user){
            var langList = user.langList

            if(langList.length > 0){
                let langObject = {}
                let index = 0
                langList.forEach((value)=>{
                    index ++;
                    let key = ':lang' + index
                    langObject[key] = {S : value}
                })
    
                let param = {
                    TableName: "languages",
                    FilterExpression: 'NOT (#c IN (' + Object.keys(langObject) + '))',
                    ExpressionAttributeNames: {
                        '#c' : 'code'
                    },
                    ExpressionAttributeValues: langObject
                }
    
                let {Items} = await db.scan(param)
                return Items.map((item)=>unmarshall(item));
            }else{
                let param = {
                    TableName: "languages"
                }
                let {Items} = await db.scan(param)
                return Items.map((item)=>unmarshall(item));
            }
        }
    }catch(err){
        console.log(err);
    }
    return undefined;
}

async function getUserByName(name){
    var param = {
        TableName: "Users",
        FilterExpression: '#n = :name',
        ExpressionAttributeValues: {
            ':name' : {S : name}
        },
        ExpressionAttributeNames: {
            '#n' : 'username'
        }
    }
    var {Items} = await db.scan(param)
    if(Items.length > 0)
        return Items.map((item)=>unmarshall(item));
    else
        return undefined
}

async function addNewLang(id,code){
    //console.log(code)
    try{
        const user = await getUserEntry(id)
        //console.log(user)
        var langList = user.langList
        langList.push(code)
        
        var newLangList = langList.map(function(value){
            return {S : value}
        })

        var param = {
            TableName: "Users",
            UpdateExpression: 'SET #l = :langList',
            Key:{
                '_id' : {S : id}
            },
            ExpressionAttributeNames: {
                '#l' : 'langList'
            },
            ExpressionAttributeValues: {
                ':langList' : {L : newLangList}
            }
        }

        const item = await db.updateItem(param);
        return item;
    }catch(err){
        console.log(err);
        return undefined;
    }
}

async function createUser(name,pw,firstLang,motherLang){

    var param = {
        TableName: "Users",
        Item:{
            '_id' : {S : crypto.randomBytes(16).toString("hex")},
            'username' : {S : name},
            'password' : {S : pw},
            'langList' : {L : []},
            'motherLang' : {S : motherLang}
        }
    }
    try{
        const item = await db.putItem(param)
        return item;
    }catch(err){
        console.log(err);
        return undefined;
    }

}

async function getUserId(username,password){

    var param = {
        TableName: "Users",
        FilterExpression : "#u = :username AND #p = :password",
        ExpressionAttributeNames: {
            '#u' : 'username',
            '#p' : 'password'
        },
        ExpressionAttributeValues: {
            ':username' : {S : username},
            ':password' : {S : password}
        }
    }

   const {Items} = await db.scan(param)
    if(Items.length > 0) 
        return Items[0]._id.S + ""
    else 
        return ""
    
}

export{
    getUserList,
    getUserEntry,
    getLangListByUserId,
    getAvailableLangListByUserId,
    getUserByName,
    addNewLang,
    createUser,
    getUserId
}
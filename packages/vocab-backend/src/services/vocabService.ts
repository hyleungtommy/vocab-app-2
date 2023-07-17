import db from '../../dbConnector';
import { unmarshall } from "@aws-sdk/util-dynamodb";

async function addVocab(vocab){
    var param = {
        TableName: "Vocabs",
        Item:vocab
    }
    try{
        //const item = await Vocab.create(vocab)
        //return item;
        const result = await db.putItem(param)
        return result
    }catch(err){
        console.log(err);
        return undefined;
    }
 }
 
 async function getVocabList(){
    var param = {
        TableName: "Vocabs"
    }
    try{
        //const item = await Vocab.find({})
        //return item;
        const {Items} = await db.scan(param)
        return Items.map((item)=>unmarshall(item));
    }catch(err){
        console.log(err);
        return undefined;
    }
 }
 
 async function getVocabEntry(id){
    var param = {
        TableName: "Vocabs",
        Key:{
            '_id' : {S : id }
        }
    }
    try{
        //const item = await Vocab.findById(id)
        //return item;
        const {Item} = await db.getItem(param)
        return unmarshall(Item)
    }catch(err){
        console.log(err);
        return undefined;
    }
 }
 
 async function getVocabListByUserIdAndLangCode(userId,langCode){
    //console.log("getVocabListByUserIdAndLangCode langCode=" + JSON.stringify(langCode))
    var param = {
        TableName: "Vocabs",
        FilterExpression : "#u = :userId AND #c = :langCode",
        ExpressionAttributeNames: {
            '#u' : 'userId',
            '#c' : 'langCode'
        },
        ExpressionAttributeValues: {
            ':userId' : {S : userId},
            ':langCode' : {S : langCode}
        }
    }
    try{
        if(userId && langCode){
            const {Items} = await db.scan(param)
            var items = Items.map((item)=>unmarshall(item));
            //console.log(items);
            let sorted = items.sort((a,b) =>{
                return b.createdAt - a.createdAt
            })
            return sorted
        }
        return []
    }catch(err){
        console.log(err);
        return undefined;
    }
 }
 
 async function updateVocab(vocab){
    var id = vocab._id;
    console.log("start updateVocab() id=" + id);
    /*
    const updateDoc = {
        vocab :vocab.vocab,
        type: vocab.type,
        meaning: vocab.meaning,
        sentence:vocab.sentence,
        translation:vocab.translation,
        note:vocab.note
    }
    */
   let tags = vocab.tags.map((t)=>{
    return {S : t}
   })
    var param = {
        TableName: "Vocabs",
        UpdateExpression: 'SET #v = :vocab, #t = :type, #m = :meaning,#s = :sentence,#tr = :translation,#n = :note,#u = :updatedAt, #tags = :tags',
        Key:{
            '_id' : {S : id}
        },
        ExpressionAttributeNames: {
            '#v' : 'vocab',
            '#t' : 'type',
            '#m' : 'meaning',
            '#s' : 'sentence',
            '#tr' : 'translation',
            '#n' : 'note',
            '#u' : 'updatedAt',
            '#tags' : 'tags'
        },
        ExpressionAttributeValues: {
            ':vocab' : {S : vocab.vocab},
            ':type' : {S : vocab.type},
            ':meaning' : {S : vocab.meaning},
            ':sentence' : {S : vocab.sentence},
            ':translation' : {S : vocab.translation},
            ':note' : {S : vocab.note},
            ':updatedAt' : {N : Date.now().toString()},
            ':tags' : {L : tags}
        }
    }
    try{
        //const item = await Vocab.findByIdAndUpdate(id,updateDoc)
        //return item;
        const result = await db.updateItem(param)
        return result
    }catch(err){
        console.log(err);
        return undefined;
    }
 }
 
 async function deleteVocab(id){
    var param = {
        TableName: "Vocabs",
        Key:{
            '_id' : {S : id}
        }
    }
    try{
        //await Vocab.findByIdAndRemove(id)
        await db.deleteItem(param)
    }catch(err){
        console.log(err);
    }
 }
 
 async function filterByType(userId,langCode,type){
    try{
        var item
        if(type == ""){// treat as an all search
            item = await getVocabListByUserIdAndLangCode(userId,langCode)
        }else{
            var param = {
                TableName: "Vocabs",
                FilterExpression : "#u = :userId AND #c = :langCode AND #t = :type",
                ExpressionAttributeNames: {
                    '#u' : 'userId',
                    '#c' : 'langCode',
                    '#t' : 'type'
                },
                ExpressionAttributeValues: {
                    ':userId' : {S : userId},
                    ':langCode' : {S : langCode},
                    ':type' : {S : type}
                }
            }
            //item = await Vocab.find({userId:userId,langCode:langCode,type:type})
            var {Items} = await db.scan(param)
            var item:any = Items.map((item)=>unmarshall(item));
            item.sort((a,b) =>{
                return b.createdAt - a.createdAt
            })
        }
        return item;
    }catch(err){
        console.log(err);
        return undefined;
    }
 }

 export {
    addVocab,
    getVocabList,
    getVocabEntry,
    getVocabListByUserIdAndLangCode,
    updateVocab,
    deleteVocab,
    filterByType
 }
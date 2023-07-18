import * as express from 'express';
import * as crypto from 'crypto';
import {
    addVocab,
    getVocabList,
    getVocabEntry,
    getVocabListByUserIdAndLangCode,
    updateVocab,
    deleteVocab,
    filterByType
} from '../services/vocabService'
const vocabRouter = express.Router();

vocabRouter.post('/vocabs',async function (req, res) {
    let tags = req.body.tags.map((t)=>{
        return {S : t}
    })
   var vocab = {
       '_id' : {S : crypto.randomBytes(16).toString("hex")},
       'vocab' : {S : req.body.vocab},
       'type' : {S : req.body.type},
       'meaning' : {S : req.body.meaning},
       'sentence' : {S : (req.body.sentence || "")},
       'translation' : {S : (req.body.translation || "")},
       'note' : {S : (req.body.note || "")},
       'langCode' : {S : req.body.langCode},
       'userId' : {S : req.body.userId},
       'correctAnswerCount' : {N : '0'},
       'createdAt' : {N : Date.now().toString()},
       'updatedAt': {N : Date.now().toString()},
       'tags': {L: tags || []}
   }
    //console.log("body=" + JSON.stringify(req.body));
    //console.log("add-vocab-signle vocab=" + vocab.vocab + " type=" + vocab.type + " meaning=" + vocab.meaning + " sentence=" + vocab.sentence + " translation=" + vocab.translation + " note=" + vocab.note)
    if(vocab){
        var item = await addVocab(vocab);
        if(item){
           res.status(200)
           res.json(item);
        }else{
            res.status(500)
            res.send("Cannot update item")
        }
    }else{
        res.status(400)
        res.send("Empty item")
    }
})

vocabRouter.get('/vocabs',async function(req,res){
    var items = await getVocabList();
    //console.log("items=" + items)
    res.setHeader("Content-Type","text/html;charset=UTF-8");
    res.status(200)
    res.json(items)
})

vocabRouter.get('/vocabs/:id/:lang',async function(req,res){
   var items = await getVocabListByUserIdAndLangCode(req.params.id,req.params.lang);
   //console.log("items=" + items)
   res.setHeader("Content-Type","text/html;charset=UTF-8");
   res.status(200)
   res.json(items);
})

vocabRouter.get('/vocabs/:id',async function(req,res){
    var item = await getVocabEntry(req.params.id);
    //console.log("items=" + item)
    res.setHeader("Content-Type","text/html;charset=UTF-8");
    res.status(200)
    res.json(item);
})

vocabRouter.put('/vocabs/:id',async function(req,res){
    var vocab =  {
        _id:req.params.id,
        vocab :req.body.vocab,
        type: req.body.type,
        meaning: req.body.meaning,
        sentence:req.body.sentence,
        translation:req.body.translation,
        note:req.body.note,
        tags:req.body.tags || []
    };
    
    var item = await updateVocab(vocab);
    if(item){
        res.status(200)
        res.send(item);
    }
    else {
        res.status(500);
        res.send("Cannot update vocab");
    }
})

vocabRouter.delete('/vocabs/:id',async function(req,res){
    await deleteVocab(req.params.id)
    res.status(200)
    res.send("Vocab deleted");
})

vocabRouter.get('/vocabs/filter/:uid/:lang/:type',async function(req,res){
   var item = await filterByType(req.params.uid,req.params.lang,req.params.type);
   //console.log("items=" + item)
   res.setHeader("Content-Type","text/html;charset=UTF-8");
   res.status(200)
   res.json(item);
})

export default vocabRouter
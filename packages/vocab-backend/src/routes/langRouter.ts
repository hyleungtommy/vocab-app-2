import * as express from 'express';
import {getLanguageList} from '../services/langService';
const langRouter = express.Router();

langRouter.get('/langs',async function(req,res){
    try{
        var items = await getLanguageList();
        res.status(200);
        //res.setHeader("Content-Type","text/html;charset=UTF-8");
        res.json(items)
    }catch(err){
        res.status(500);
        res.json(err);
    }
})

export default langRouter;

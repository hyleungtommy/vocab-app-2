import * as express from 'express';
import { getUserIcon, uploadUserIcon } from '../helper/s3Helper';
import {
    getUserList,
    getUserEntry,
    getLangListByUserId,
    getAvailableLangListByUserId,
    getUserByName,
    addNewLang,
    createUser,
    getUserId,
    replaceUserTagList
} from '../services/userService'
import * as multer from 'multer'
const userRouter = express.Router();

userRouter.get('/users', async (req, res) => {
    try {
        let users = await getUserList();
        //res.setHeader("Content-Type","text/html;charset=UTF-8");
        //res.setHeader("Access-Control-Allow-Origin","*");
        res.status(200)
        res.json(users)
    } catch (err) {
        console.log("Error in /all:", err);
        res.status(500)
        res.json(err);
    }
})

userRouter.get('/users/:id', async (req, res) => {
    try {
        let user = await getUserEntry(req.params.id);
        res.status(200)
        res.json(user)
    } catch (err) {
        console.log("Error in /:id:", err);
        res.status(500)
        res.json(err)
    }
})

userRouter.get('/users/:id/langlist', async (req, res) => {
    try {
        let user = await getLangListByUserId(req.params.id);
        res.status(200)
        res.json(user);
    } catch (err) {
        console.log("Error in /:id:", err);
        res.status(500)
        res.json(err)
    }
})

userRouter.get('/users/:id/availangs', async (req, res) => {
    try {
        let user = await getAvailableLangListByUserId(req.params.id);
        res.status(200)
        res.json(user)
    } catch (err) {
        console.log("Error in /:id:", err);
        res.status(500)
        res.json(err)
    }
})

userRouter.put('/users/newlang', async function (req, res) {
    try {
        var item = await addNewLang(req.body.userId, req.body.code);
        if (item) {
            res.status(200)
            res.json(item)
        }
        else {
            res.status(500)
            res.send("cannot update item")
        }
        
    } catch (err) {
        res.status(500)
        res.json(err)
    }
})

userRouter.post('/users', async function (req, res) {
    try {
        var item = await createUser(req.body.username, req.body.password, req.body.firstLang, req.body.motherLang);
        if (item) {
            res.status(200)
            res.json(item);
        } else {
            res.status(500)
            res.send("cannot create user");
        }
        
    } catch (err) {
        res.status(500)
        res.json(err)
    }
})

userRouter.get('/users/:name/exist', async function (req, res) {
    try {
        var msg = "";
        var item = await getUserByName(req.params.name);
        if (item && item.length > 0) {
            msg = req.body.name
        }
        else {
            msg = ""
        }
        res.status(200)
        res.json(msg);
    } catch (err) {
        res.status(500)
        res.json(err)
    }
})

userRouter.post('/users/login', async function (req, res) {
    try {
        var userId = await getUserId(req.body.username, req.body.password)
        if (userId && userId.length > 0) {
            res.status(200)
            res.json({
                token: 'test123',
                userId: userId
            });
        } else {
            res.status(401)
            res.json({
                token: ''
            });
        }
    } catch (err) {
        res.status(500)
        res.json(err)
    }

})

userRouter.post('/users/photo', multer().single('file') , async function (req:any,res) {
    try{
        await uploadUserIcon(req.body.username,req.file.buffer)
        res.status(200).json({msg:"upload file success"})
    }catch(err){
        res.status(500).json(err)
    }
})

userRouter.get('/users/:id/photo', async function (req,res) {
    try{
        const img = await getUserIcon(req.params.id)
        res.status(200).end(img)
    }catch(err){
        res.status(500).json(err)
    }
})

userRouter.put('/users/:id/tags', async function (req,res) {
    try{
        await replaceUserTagList(req.params.id,req.body.tags)
        res.status(200).json({msg:`replaced user tag ${req.params.id}`})
    }catch(err){
        res.status(500).json(err)
    }
})

export default userRouter;
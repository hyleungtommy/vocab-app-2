import * as express from 'express';
import * as cors from 'cors'
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
import userRouter from './src/routes/userRouter'
import langRouter from './src/routes/langRouter'
import vocabRouter from './src/routes/vocabRouter'

dotenv.config()
// initializing port number
const PORT : string = process.env.PORT || '3000';

// setting up the projects
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('build'));

app.get('/', (req,res)=>{
    res.send("Server running at " + PORT)
})

app.use(userRouter);
app.use(langRouter);
app.use(vocabRouter);

export {app, PORT};
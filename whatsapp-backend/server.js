// importing
import express from "express";
import mongoose from "mongoose"
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

// App config
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1294980",
    key: "3b98d8a62d4c225f684c",
    secret: "a19dd7b4ee7ae08b7ea1",
    cluster: "eu",
    useTLS: true
  });


// Middlewares
app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//     res.setHeader("Access+control-Allow-Origin","*");
//     res.setHeader("Access+control-Allow-Headers","*");
//     next();
// });

// DB config
const connection_url = 'mongodb+srv://admin:BwgBlsS7NnEOpE7Y@cluster0.mm99n.mongodb.net/whatsappdb?retryWrites=true&w=majority'

mongoose.connect(connection_url,{
  //  useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("")).catch(err => console.log(err));

const db = mongoose.connection

db.once("open",() => {
    console.log("DB is connected");

    
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change) => {
        console.log(change);

    if(change.operationType === 'insert'){
        const messageDetails = change.fullDocument;
        pusher.trigger('messages','inserted',
            {
                name: messageDetails.user,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            }
        );
        }else {
            console.log('Error triggering Pusher');
        }
    });
});


// API routes
app.get('/', (req,res) => res.status(200).send("do more"));

app.post('/api/v1/messages/new', (req, res) =>{
    const dbMessage =req.body

    Messages.create(dbMessage, (err,data) => {
        if (err){
            res.status(500).send(err)
        } else {
            res.status(201).send(`new message created \n ${data}`)
        }
    })
});

app.get('/api/v1/messages/sync',(req, res)=>{
    Messages.find((err,data) => {
        if (err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})


// listen

app.listen(port,() => console.log(`Listening on localhost:${port}`));




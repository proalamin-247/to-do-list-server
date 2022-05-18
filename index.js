const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t2b9n.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const taskList = client.db('toDo').collection('task');
        

        app.get('/task', async(req, res)=>{
            const query = {};
            const cursor = taskList.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
        })
        
    }
    finally{

    }
}
run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send('Running to-do-list node server')
});

app.listen(port, () => {
    console.log('curd server is running port - 5000')
})

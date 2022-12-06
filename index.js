const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');

const app = express()
require('dotenv').config()

const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{
    res.send('Ultimate Server')
})








const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tbf6iah.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 async function run () {
    try {
            const ultimateUserCollection = client.db('users').collection('allUsers')
            const ultimateAttendaceCollection = client.db('users').collection('attendanceInfo')


            app.get('/attendace-info', async(req, res) =>{
                const query = {}
                const result = await ultimateAttendaceCollection.find(query).toArray()
                res.send(result)
            })

            app.post('/users', async(req, res) =>{
                const query = req.body;
                const users = await ultimateUserCollection.insertOne(query);
                res.send(users)
            })

    }
    finally {

    }
 }
run().catch(e=>console.log(e))






app.listen(port, ()=>{
    console.log('Server is running')
})
//CRUD create read update delete
// const mongodb = require('mongodb');
// const MongoClient =mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const {MongoClient,ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017' //Using localhost will slow our application
const databaseName = 'task-manager'
const id = new ObjectID()

MongoClient.connect(connectionURL,{useNewUrlParser: true},(error,client)=>{
    if(error) return console.log('Unable to connect to database!')
    const database = client.db(databaseName) //Create databe name task-manager
    // database.collection('users').insertOne({ //Create collection users with document
    //     name : 'Anddrew',
    //     age: 27
    // },(error,result)=>{
    //     if(error) return console.log('Unable to insert user');
    //     console.log(result);
    // })

    // database.collection('task').insertMany([
    //     {
    //         descript : 'Do smt1',
    //         isDone: true
    //     },
    //     {
    //         descript : 'Do smt2',
    //         isDone: false
    //     },
    //     {
    //         descript : 'Do smt3',
    //         isDone: true
    //     }
    // ],(error,result)=>{
    //     if(error) return console.log('Unable to insert new task');
    //     console.log(result.ops);
    // })

    // database.collection('users').findOne({name : 'Jen'},(error,result)=>{
    //     if (error) return console.log('Unable to find data')
    //     console.log(result);
    // })
    // database.collection('users').findOne({_id : new ObjectID('5c962147d1cbdc288519349b')},(error,result)=>{
    //     if (error) return console.log('Unable to find data')
    //     console.log(result);
    // })

    // //find will return a cursor not callback funtion
    // database.collection('users').find({name : `Anddrew`}).toArray((error,users)=>{
    //     if (error) return console.log('Unable to find data')
    //     console.log(users[1]);
    // })

    // database.collection('users').updateOne({
    //     _id : new ObjectID('5c96206d0f7406283f3b53ba'
    // )},{
    //     $set:{
    //         name : 'Tyrion',
    //         age : 32
    //     }
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })

    

})
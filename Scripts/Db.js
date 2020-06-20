var mongodb = require('mongodb');
const url = 'mongodb://heroku_zb6jn4hw:vjb86jbivo8tgnah3sb1pp22a3@ds263248.mlab.com:63248/heroku_zb6jn4hw';
// var MongoClient = mongodb.MongoClient(url,{
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// });

class Db {

    constructor(url,db) {
        this.url = url;
        this.MongoClient = mongodb.MongoClient;
        this.dbname = db;
    }

    CreateCollection(collection){
        this.MongoClient.connect(this.url,{ useNewUrlParser: true }, (err, db)=> {
            if (err) throw err
            console.log('Connection established to', url);
            db.db(this.dbname).createCollection(collection, (err, res)=> {
                if (err) throw err;
                console.log("Collection created!");
                db.close();
            });



            // if (err) {
            //
            //     console.log('Unable to connect to the mongoDB server. Error:', err);
            // } else {
            //     console.log('Connection established to', url);
            //     db.db("heroku_zb6jn4hw").createCollection("replacements");
            //     // do some work here with the database.
            //
            //     //Close connection
            //     db.close();
            // }
        });
    }


    InsertOne(item,collection){
        this.MongoClient.connect(this.url,{ useNewUrlParser: true },(err,db)=>{
            if(err) throw err
            db.db(this.dbname).collection(collection).insertOne(item).then(res=>{
                db.close();
            });

        })
    }

    InsertMany(items,collection){
        this.MongoClient.connect(this.url,{ useNewUrlParser: true },(err,db)=>{
            if(err) throw err
            db.db(this.dbname).collection(collection).insertMany(items).then(res=>{
                db.close();
            });

        })
    }

    GetData(collection){
        return new Promise(resolve => {

            this.MongoClient.connect(this.url,{ useNewUrlParser: true },(err,db)=>{
                if(err) throw err;
                db.db(this.dbname).collection(collection).find().toArray((err,res)=>{

                    console.log(res);
                    db.close();
                    resolve(res);

                })
            })

        })
    }

    ClearData(collection,condition){
        return new Promise(resolve => {

            this.MongoClient.connect(this.url,{ useNewUrlParser: true },(err,db)=>{
                if(err) throw err;
                db.db(this.dbname).collection(collection).remove(condition).then(res=>{
                    db.close();
                    resolve("true");
                })
            })

        })
    }

}

const db = new Db(url,"heroku_zb6jn4hw");

module.exports = db;

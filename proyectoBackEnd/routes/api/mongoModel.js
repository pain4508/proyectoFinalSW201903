var ObjectId = require("mongodb").ObjectID;

function mongoModel(db){

    var lib = {};
    var pbe = db.collection('things');

    lib.getAllThings = (handler)=>{
        pbe.find({}).toArray(
            (err, docs)=>{
               if(err){
                handler(err, null);
            }else{
                handler(null, docs);
            }
            }
        ); //toArray
    } //getAllThings

lib.getthingById = (thingId, handler)=>{
    pbe.findOne({"_id": new ObjectId(thingId)},(err, doc)=>{
        if(err){
            handler(err, null);
        }else{
            handler(null, doc);
        }
    }); // findOne
} //getThing By Id

lib.addNewThing = (newThing, handler)=>{
    pbe.insertOne(newThing, (err, r)=>{
        if(err){
            handler(err, null);
        }else{
            handler(null, r.result);
        }
    });//insert One
} // addNewThing

    return lib;
} // mongoModel

module.exports = mongoModel;
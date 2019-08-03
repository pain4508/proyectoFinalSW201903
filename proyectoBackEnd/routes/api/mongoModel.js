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

lib.addTagsToThing = (tags, id, handler)=>{
    var curatedTags = Array.isArray(tags)? tags: [tags];
    var updateObject = { "$set":{"tags": curatedTags}};
    pbe.updateOne({"_id": ObjectId(id)}, updateObject, (err, r)=>{
        if(err){
            handler(err, null);
        }else{
            handler(null, r.result);
        }
    }); // updateOne
} // addTagstoThing

lib.seachByTags = (tags, handler)=>{
    var queryObject = {"tags":{"$in": Array.isArray(tags)? tags: [tags]}};
    pbe.find(queryObject).toArray((err, docs)=>{
        if(err){
            handler(err, null);
        }else{
            handler(null, docs);
        }
    }); //toArray
} //seach By Tags


lib.togglePBEDone = (id, handler)=>{
    var filter = {"_id":ObjectId(id)};
    // get filred document
    pbe.findOne(filter, (err, doc)=>{
        if(err){
            handler(err, null);
        }else{
            if(doc){
                //doc.done = !doc.done;
                //doc.fcDone = new Date();
                var updateExpression = {};
                if(doc.done){
                    updateExpression = {"$set":{done : false, fcDone: null}};
                }else{
                    updateExpression = {"$set":{done : true, fcDone: new Date()}};
                }
                pbe.updateOne(filter, updateExpression,  (err, rslt)=>{
                    if(err){
                        handler(err, null);
                    }else{
                        handler(null, rslt.result);
                    }
                });
            }else{
                handler(new Error("El documento no Existe"), null)
            }
        }
    });// findOne
}

lib.deleteById = (Id, handler)=>{
    pbe.deleteOne({"_id": ObjectId(Id)}, (err, rslt)=>{
        if(err){
            console.log(err);
            handler(err, null);
        }else{
            handler(null, rslt.result);
        }
    }); // deleteOne
} // deleteById
    return lib;
} // mongoModel

module.exports = mongoModel;
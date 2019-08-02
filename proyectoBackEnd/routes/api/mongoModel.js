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
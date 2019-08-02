
var uuidv4 = require('uuid/v4'); 
var express = require('express');
var router = express.Router();

function thingsInit(db){

var fileModel = require('./jsonmodel');
var mongoModel = require('./mongoModel')(db);
var data = null; //temporary store

var thingTp = {
    //'_id':'',
    'desc':'',
    'fcIng':'',
    'author':'',
    'due':null,
    'done':false,
    'type':'small'
};

// Obtener things

router.get('/', function(req, res, next){
    // Mongo Model

        mongoModel.getAllThings(function(err, docs){
                if(err){
                    console.log(err);
                   return  res.status(400).json({error: "Algo paso"});
                }
                return res.status(200).json(docs);
            }
        ); // getAllThings
    //--------------------------------
    //File Model
   // if(!data){
     //   fileModel.read(function(err, filedata){
       //     if(err){
         //       console.log(err);
           //     data = [];
             //   return res.status(500).json({'Error':'Error al Obtener la Data'});
           // }
           // data = JSON.parse(filedata);
           // return res.status(200).json(data);
       // });
    //}else{
      //  return res.status(200).json(data);
    //}
}); // get/

router.get('/byid/:thingid', (req, res, next)=>{
    mongoModel.getthingById(req.params.thingid, (err, thingDoc)=>{
        if(err){
            console.log(err);
            return res.status(500).json({"errror":"Error al obtener el Thing"});
        }
        return res.status(200).json(thingDoc);
    }); //getThing By Id
});//get by Id

router.get('/bytags/:tag', (req, res, next)=>{
    mongoModel.seachByTags((req.params.tag || '').split('_'), (err, docs)=>{
        if(err){
            console.log(err);
            return res.status(500).json({"error":"No se encontro el PBE"});
        }else{
            return res.status(200).json(docs);
        }

    }); //seachByTag
}); //by tag

router.post('/new', function(req, res, next){
    var _thingsData = Object.assign({}, thingTp, req.body);
    var dateT = new Date();
    var dateD = new Date();
    dateD.setDate(dateT.getDate()+ 3);
    _thingsData.fcIng = dateT;
    _thingsData.due = dateD;
    //_thingsData._id = uuidv4();
    // Mongo Model
    mongoModel.addNewThing(_thingsData, (err, newThing)=>{
        if(err){
            console.log(err);
            return res.status(500).json({"errror":"No se pudo agregar el Thing"})
        }
        return res.status(200).json(newThing);

    }); // addNewThing
    //----------------------------
    ///Old file Model
    // if(!data){
    //     data = [];
    // }
    // data.push(_thingsData);
    // fileModel.write(data, function(err){
    //     if(err){
    //         console.log(err);
    //         return res.status(500).json({'Error':'Error al Obtener la Data'});
    //     }
    //     return res.status(200).json(_thingsData);
    // });
}); //Nuevo things

router.put('/done/:thingId', function (req, res, next){
    var _thingId = req.params.thingId;
    var _thingUpds = req.body;
    var _thingUpdated = null;
    var newData = data.map(
        function(doc, i){
            if(doc._id == _thingId){
                _thingUpdated = Object.assign(
                    {},
                     doc,
                     {"done":true},
                     _thingUpds
                     );
                return _thingUpdated;
            }
            return doc;
        }
    ); // end map
    data = newData;
    fileModel.write(data, function(err){
        if(err){
            console.log(err);
            return res.status(500).json({'Error':'Error al Guardar la Data'});
        }
        return res.status(200).json(_thingUpdated);
    });
});// Set a thing as done

router.put('/addtags/:id', (req, res, next)=>{
    mongoModel.addTagsToThing((req.body.tags || '').split('|'), req.params.id, (err, result)=>{
        if(err){
            console.log(err);
            return res.status(500).json({"error":"No se puede actualizar el PBE"});
        }
        return res.status(200).json(result);
    }); // end addTagsToThing
}); // addtags
router.delete('/delete/:thingId', function(req, res, next){
    var _thingId = req.params.thingId;
    var newData = data.filter(
        function(doc, i){
            if(doc._id == _thingId){
                return false;
            }
            return true;
        }
    ); // end filter
    data = newData;
    fileModel.write(data, function(err){
        if(err){
            console.log(err);
            return res.status(500).json({'Error':'Error al Eliminar la Data'});
        }
        return res.status(200).json({"delete": _thingId});
    });
}); //end delete

fileModel.read(function(err, filedata){
    if(err){
        console.log(err);
    }else{
        data = JSON.parse(filedata);
    }
});
    return router;
} // end thingInit

module.exports = thingsInit;
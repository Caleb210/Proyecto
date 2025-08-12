//Declarar nuestra librerias
const express = require('express');
const router = express.Router();
const Venta = require('../models/Venta.js');


//Post sirve para insertar datos
//Equivalencia db.getCollection('NEW_COLLECTION_NAME').insertOne({
router.post('/', async (req, res) => {
        try {
            const datosVenta = new Venta(req.body);
            await datosVenta.save();
            res.status(201).json(datosVenta);
            
        } catch (err) {
            res.status(400).json({error: err.message });
        }
    }
);

router.get('/', async(req, res) =>{
        const listaDatos = await Venta.find();
        res.json(listaDatos);


    }
);
//Obtener 
router.get('/:id', async(req, res) =>{
        const listaDatos = await Venta.findOne({id: req.params.id});
        if (listaDatos) {
            res.json(listaDatos);
        }
        else{
            res.status(404).json({error: "No se encontro el elemento"});
        }
    }
);


//Actualizar 
router.put('/:id', async(req, res) =>{
        const dato = await Venta.findOneAndUpdate({
                id: req.params.id}, req.body, {new: true                
            });
        if (dato){
            res.json(dato);
        }
        else{
            res.status(404).json({error: "No se encontro el elemento para actualizar"});
        }
    }
);

//Obtener 
router.delete('/:id', async(req, res) =>{
        const dato = await Venta.findOneAndDelete({id: req.params.id});
        if (dato) {
            res.status(200).json({mensaje: "El elemento fue eliminado"});
        }
        else{
            res.status(404).json({error: "No se encontro el elemento"});
        }
    }
);


module.exports = router;
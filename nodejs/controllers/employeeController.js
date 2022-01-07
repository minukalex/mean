const express = require('express');
var router= express.Router();
var objectId = require('mongoose').Types.ObjectId;


var {Employee} = require('../models/emploees');

// => localhost:3000/employees/list
router.get('/', (req,res)=>{
    Employee.find((err,docs)=>{
        if(!err){res.send(docs)}
        else{console.log('error in retriveing documents');}
    });
})

//find the employeeId
router.get('/:id', (req,res)=>{
    if(!objectId.isValid(req.params.id))
        return res.status(400).send(`No records with given id ${req.params.id}`);

    Employee.findById(req.params.id,(err,docs)=>{
        if(!err){res.send(docs)}
        else{console.log('error in retriveing documents');}
    });
})

router.put('/:id', (req,res)=>{
    if(!objectId.isValid(req.params.id))
        return res.status(400).send(`No records with given id ${req.params.id}`);
        var emp =   new Employee({
            name : req.body.name,
            position : req.body.position,
            office : req.body.office,
            salary : req.body.salary,
        })
        Employee.findByIdAndUpdate(req.params.id, { $set: emp}, {new : true}, (err, doc) =>{
            if(!err){res.send(doc)}
            else{console.log('error in retriveing documents');}
        })

});

router.delete('/:id', (req,res)=>{
    if(!objectId.isValid(req.params.id))
        return res.status(400).send(`No records with given id ${req.params.id}`);
    Employee.findByIdAndRemove(req.params.id,(err, doc) =>{
            if(!err){res.send(doc)}
            else{console.log('error in deleting documents');}
        })

});



// => localhost:3000/employees/create
router.post('/', (req,res)=>{
    console.log(req.body);
   var emp =   new Employee({
       name : req.body.name,
       position : req.body.position,
       office : req.body.office,
       salary : req.body.salary,
   })
   emp.save((err, doc)=>{
    if(!err){res.send(docs)}
    else{console.log('error in saving documents');}
   })
})

module.exports = router;
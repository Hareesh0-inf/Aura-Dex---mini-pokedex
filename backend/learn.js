const express = require('express');
const app = express()

const cm1 = (req,res,next) => {
    console.log("cm1");
    req.val = "new val";
    next();
};
const cm2 = (req,res,next) => {
    console.log("cm2", req.val);
    next(100);
};
const cm3 = (data,req,res,next) => {
    console.log("cm3", data);
    next();
};

app.use([cm1, cm2, cm3]);

app.get('/test',(req,res) => {
    console.log('done');
    res.status(200).send('sent');
});

app.listen(3000, () => {
    console.log("server started");
});
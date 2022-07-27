const express = require('express');
const Category = require('../models/categoryModel');

const router = express.Router();

const Product = require('../models/productModel');

router.get('/product', async (req,res)=>{
    try{
        const products = await Product.find();
        res.status(200).send({data: products})
    }catch(err){
        res.status(400).send({error: err})
    }
})
router.get('/category-by-products',async(req,res)=>{
    try{
        const products = await Product.aggregate([
            {$match:{}},
            {$group:{
                _id:'$category',
                products:{$push: '$$ROOT'}
            }},
            {$project:{name:'$_id', products:1, _id: 0}}
        ])
        res.status(200).send({data:products})
    }catch(e){
        res.status(400).send({error:e})
    }
})

router.get('/products-by-category',async(req,res)=>{
    try{
        const products = await Product.find();
        res.status(200).send({data:products})
    }catch(e){
        res.status(400).send({error:e})
    }
})
router.get('/categories',async(req,res)=>{
    try{
        const categories = await Category.find();
        res.status(200).send({data:categories})
    }catch(e){
        res.status(400).send({error:e})
    }
})
module.exports = router;
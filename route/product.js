import express from 'express'
import Product from '../model/Product.js'
import multer from 'multer'
import csv from 'csvtojson'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
const router = express.Router()

import {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization} from './verifyToken.js'


router.post("/", async (req, res) => {
    const newProduct = new Product(req.body);
  
    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  });
  
  //UPDATE
  router.put("/:id", async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //DELETE
  router.delete("/:id", async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //SEARCH PRODUCT 
  router.get('/search',async (req, res) => {
    const {searchQuery} = req.query
   
     try {
       let products;
   
      if(searchQuery){
   
       const title = new RegExp(searchQuery, 'i')
        products = await Product.find({$or: [{title}] })
      }else{
        products = await Product.find()
      }
      res.status(200).json(products)
     } catch (error) {
       res.status(404).json({message: error.message})
     }
   
   })
  


  //GET PRODUCT
  router.get("/find/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)
                            .populate([{path: 'seller_id', select: 'firstname lastname studentId department contactNumber'}])
                            .exec();
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get('/customerproduct/:seller_id', async (req,res) =>{
    try {
      const { seller_id } = req.params;
    
      const posts = await Product.find({seller_id}).sort({createdAt: -1})
      res.status(200).json(posts)
  
    } catch (error) {
      res.status(404).json({message: error.message})  
    }
  })
  
  //GET ALL PRODUCTS
  router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;
  
      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1)
                                        .populate([{path: 'seller_id', select: 'firstname lastname studentId department img contactNumber'}])
                                        .exec();
      } else if (qCategory) {
        products = await Product.find({
          category: {
            $in: [qCategory],
          },
        }).sort({createdAt: -1}).populate([{path: 'seller_id', select: 'firstname lastname studentId department img contactNumber'}])
        .exec();;
      } else {
        products = await Product.find()
                                .populate([{path: 'seller_id', select: 'firstname lastname studentId department img contactNumber'}])
                                .exec();
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get("/page", async (req, res) => {

    const page = req.query.p || 0
    const booksPerPage = 5

    try {
        
      const product = await Product
                                  .find()
                                  .sort({createdAt: -1})
                                  .skip(page * booksPerPage)
                                  .limit(booksPerPage)
                                  .populate([{path: 'seller_id', select: 'firstname lastname studentId department img'}])
                                  .exec();
      
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json(err);

    }
    
  });



  //ADMIN SIDE


  router.post('/addcsv', async (req,res) =>{
    csv()
      .fromFile(req.file.path)
      .then((jsonObj) =>{
        var products = [];
          for(var i=0; i<jsonObj.products.length; i++){
            var obj = {};
            obj._id = jsonObj[i]._id
            obj.seller_id = jsonObj[i].seller_id;
            obj.title = jsonObj[i].title;
            obj.description = jsonObj[i].description;
            obj.img = jsonObj[i].img;
            obj.status = jsonObj[i].status;
            obj.category = jsonObj[i].category;
            obj.productCategory = jsonObj[i].productCategory;
            obj.quantity = jsonObj[i].quantity;
            obj.price = jsonObj[i].price;
            products.push(obj);
          }
              Product.insertMany(products).then((function (){
                res.status(200).send({
                  message: "Successfully Uploaded!"
              }).catch(function(error){
                res.status(500).send({
                    message: "failure",
                    error
                });
               });
          }))
      }).catch((error) => {
        res.status(500).send({
            message: "failure",
            error
        });
    })
  });
  export default router
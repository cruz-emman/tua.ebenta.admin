import express from 'express'
import mongoose from 'mongoose';
import Cart from '../model/Cart.js'
import {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization} from './verifyToken.js'

const router = express.Router()

router.post("/", async (req, res) => {
    const newCart = new Cart(req.body);
  
    try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //UPDATE
  router.put("/:id", async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //DELETE
  router.delete("/:id", async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET USER CART
  router.get("/find/:id", async (req, res) => {
    try { 
      const cart = await Cart.findById(req.params.id)
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // //GET ALL
  
  router.get("/", async (req, res) => {
    try {
      const carts = await Cart.find().sort({createdAt: -1}).populate([
        {path: 'userId', select: 'firstname lastname studentId' },
        {path: 'productId', select: 'title img status quantity' },
        {path: 'sellerId', select: 'firstname lastname studentId department' }
        ]).exec();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

///ADDITION

// total income
 router.get('/recentTransaction/:id', async (req,res) =>{
  const {id} = req.params;
  try {
    const cart = await Cart.find({sellerId : id})
                          .sort({createdAt: -1})
                          .populate([
                            {path: 'userId', select: 'firstname lastname studentId' },
                            {path: 'productId', select: 'title img status quantity' },
                            {path: 'sellerId', select: 'firstname lastname studentId department' }
                          ]).exec()

    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
 })


 router.get('/total/:id', async(req,res) =>{
  const {id} = req.params
  const sellerId = mongoose.Types.ObjectId(id)

  try{
    const income = await Cart.aggregate([
      {$match: {status: "complete", sellerId: sellerId}},
      {$group: {_id: "$sellerId", total: {$sum: "$TotalAmount"}}}
    ]).exec()
    res.status(200).json(income)
  }catch(err){
    res.status(400).json({err:err.message})
  }

 })


 //get previous sales chart
 router.get('/previousSales/:id', async (req,res) =>{
  const {id} = req.params
  const sellerId = mongoose.Types.ObjectId(id)

  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));


  try {
    const cart = await Cart.aggregate([
      {
        $match: {
          sellerId: sellerId,
          status: 'complete',
        },
        
      },
      {
        $project: {
          month : {$month : "$createdAt"}, 
          year : {$year :  "$createdAt"},
          sales: "$TotalAmount"
        }
      },
      {$sort: {createdAt: 1}},
      {
        $group: {
          _id: {
          month: "$month",
          year: "$year"
          },
          total: {
            $sum: "$sales"
          }
        }
      }
     
    ])
    res.status(200).json(cart)

  } catch (error) {
    res.status(500).json({message: error.message})
  }
 })





 //nabili ni user
 router.get("/totalbuy/:id", async (req, res) => {
  const { id } = req.params
  const buyerId = mongoose.Types.ObjectId(id)

  try {
    const income = await Cart.aggregate([ 
    {
      $match: {status: "complete", userId: buyerId}
    },
    {$group: {_id: buyerId, total: {$sum: "$TotalAmount"}}}
    

    ])
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json({err: err.message});
  }
});


//previous transactions ni user (list ng nabili nya)
router.get('/recentBuy/:id', async (req,res) =>{
  const { id } = req.params;

  try {
    const orders = await Cart.find({userId: id }).sort({createdAt: -1})
                  .populate([
                    {path: 'userId', select: 'firstname lastname studentId' },
                    {path: 'productId', select: 'title img status quantity' },
                    {path: 'sellerId', select: 'firstname lastname studentId department' }
                  ]).exec()
                                  
    res.status(200).json(orders);     
  }
     catch (error) {
    res.status(500).json({message: error.message});
    console.log({message: error.message});
  }
})

//top categories
router.get('/categories', async (req, res) => {
    
  try {
    const cart = await Cart.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: '$product'
      },
      {
        $group: {
          _id: "$product.productCategory",
          total: {
            $sum: 1
          }
        }
      },
      {
        $sort: {total: -1}
      },      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1
        }
      },
    ])
    res.status(200).json(cart);     

  } catch (error) { 
    res.status(500).json({error: error.message})
  }
})

router.get('/departments', async (req, res) => {
    
  try {
    const cart = await Cart.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: '$product'
      },
      {
        $group: {
          _id: "$product.category",
          total: {
            $sum: 1
          }
        }
      },
      {
        $sort: {total: -1}
      },      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1
        }
      },
    ])
    res.status(200).json(cart);     

  } catch (error) { 
    res.status(500).json({error: error.message})
  }
})


//ADMIN SECTION

router.get("/income", async (req, res) => {
  const productId  = req.query.orderId;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 11));

  try {
    const cart = await Cart.aggregate([
      {
        $match: {
          status: 'complete',
        },
        
      },
      {
        $project: {
          month : {$month : "$createdAt"}, 
          year : {$year :  "$createdAt"},
          sales: "$TotalAmount"
        }
      },
      {$sort: {createdAt: 1}},
      {
        $group: {
          _id: {
          month: "$month",
          year: "$year"
          },
          total: {
            $sum: "$sales"
          }
        }
      }
     
    ])
    res.status(200).json(cart)

  } catch (error) {
    res.status(500).json({message: error.message})
  }
});


//Total Sales

router.get("/totalSales", async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 11));

  try {
    const income = await Cart.aggregate([
      {$match: {status: 'complete'}},
      {
        $project: {TotalAmount: 1}
      },
      {
        $group: {_id: null, total: {$sum: "$TotalAmount"}}
      }
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }});


//Total Departments
router.get('/departments', async (req, res) => {
    
  try {
    const order = await Cart.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: "$product"
      },
      {
        $group: {
          _id: "$product.category",
          total: {
            $sum: 1
          }
        }
      },
      {
        $sort: {total: -1}
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1
        }
      },

    ])
    res.status(200).json(order);     

  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

//ALL MERCH

//All merch
router.get('/categories', async (req, res) => {
    
  try {
    const order = await Cart.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: "$product"
      },
      {
        $group: {
          _id: "$product.productCategory",
          total: {
            $sum: 1
          }
        }
      },
      {
        $sort: {total: -1}
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1
        }
      },

    ])
    res.status(200).json(order);     

  } catch (error) {
    res.status(500).json({error: error.message})
  }
})


  export default router
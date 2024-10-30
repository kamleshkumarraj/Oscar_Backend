// index.js
import dotenv from 'dotenv'
dotenv.config({
  path : 'src/.env'
})
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import multer from 'multer';
import cloudinary from './config/cloudinaryConfig.js';
import Stripe from 'stripe';
import Order from "./models/payment.js"
import { getFilteredProducts } from './services/productService.js';
import ProductModel from './models/ProductModel.js';
import {sendOrderMail} from "./services/emailService.js"
import Card from './models/CardModel.js';
import { orderReceipts } from './services/orderReceipt.js';
import { usersRouter } from './routes/users.route.js';
import cookieParser from 'cookie-parser'

const stripe = new Stripe(process.env.STRIPE_API);


const app = express();
const port = 3000;

connectDB(); 
app.use(cookieParser())
app.use(express.json({limit : '10mb'}));
app.use(cors({
  origin : ["http://localhost:5173", "http://localhost:5174" , "https://oscar-print.vercel.app"],
  methods : ["GET", "HEAD", "OPTIONS", "POST", "PUT", "DELETE"],
  credentials : true
}));
app.use('/auth', authRoutes);
app.use('/api', usersRouter)
// app.use('/product',)

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });




app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
   
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'test' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(req.file.buffer);
    });

    res.status(200).json({ message: 'Image uploaded successfully', url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Upload to Cloudinary failed', error });
  }
});

app.post('/create-payment-intent/:userId', async (req, res) => {
  try {
    let userEmail = "kamlesh.22jics061@jietjodhpur.ac.in";
    let adminEmail = "contact@xendekweb.com";
    const { items, customer, totalAmount  } = req.body;
    const userId = req.params.userId
    if(!userId) res.status(403).json({success : false , message : "Please send userId !"})

   
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Stripe expects amount in cents
      currency: 'inr',
      description: 'Order description here',
    });
    console.log("Running payment intent...")
    // Save order in MongoDB
    const order = new Order({
      items,
      totalAmount,
      customer,
      paymentIntentId: paymentIntent.id,
      status: 'pending',
      user : userId
    });
    const orderDetails = new Order({
      items,
      totalAmount,
      customer,
      paymentIntentId: paymentIntent.id
    })

    await order.save();

   

    const clientSecret = paymentIntent.client_secret;

    const paymentIntentId = clientSecret.split('_secret')[0];
    
    console.log("mail running...")
    console.log(orderReceipts(orderDetails))
    //sent to users
    await  sendOrderMail(userEmail , orderReceipts(orderDetails));
    
    //sent to admin
    
    await sendOrderMail(adminEmail,orderReceipts(orderDetails));
    
    

    // if (result.error) {
    //   // Handle error
    //   console.error(result.error.message);
    // } else {
    //   if (result.paymentIntent.status === 'succeeded') {
    //     // Handle successful payment
    //     console.log('Payment successful!');
    //   }
    // }
    res.status(200).send({
      clientSecret: clientSecret,
      message  : "success"
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

app.post('/add-Product', upload.single('image'), async (req, res) => {
  try {
      const { userId ,Description,title} = req.body;
      
      if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
      }

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload_stream({
          folder: 'products',
          resource_type: 'image',
      }, async (error, result) => {
          if (error) {
              return res.status(500).json({ message: 'Cloudinary upload error', error });
          }

          // Save image details to MongoDB
          const product = new ProductModel({
              userId,
              title,
              Description,
              imageUrl: result.secure_url,
              imagePublicId: result.public_id,
          });

          await product.save();

          res.status(201).json({ message: 'Image uploaded and details saved', product });
      }).end(req.file.buffer);

  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error', error });
  }
});

app.get('/get-products', async (req, res) => {
  try {
      const { userId, page, limit } = req.query;

      // Build the filter object
      const filter = {};
      if (userId) {
          filter.userId = userId;
      }

      const result = await getFilteredProducts(filter, parseInt(page), parseInt(limit));

      res.status(200).json(result);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error', error });
  }
});

// send 

// creator 

app.post('/api/card', async (req, res) => {
  const { HTMLCard, JSONCard, userId , image , price , quantity  , cartDetails} = req.body;

  // Validate the required fields
  if ( !userId) {
    return res.status(400).json({ error: 'Missing required fields'  });
  }

  try {
    // Create a new card entry in the database
    const newCard = new Card({
      JSONCard,
      userId,
      image,
      price,
      quantity,
      cartDetails
    });
    await newCard.save();

    res.status(201).json({ message: 'Card created successfully', card: newCard });
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});


app.get('/api/cards/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Find all cards for the given userId
    const cards = await Card.find({ userId });

    

    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});



app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

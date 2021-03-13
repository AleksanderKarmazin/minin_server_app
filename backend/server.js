import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'
import connectDB from './config/db.js';
import colors from 'colors'
import cors from 'cors'
import timeout from 'connect-timeout'


import { notFound, errorHandler } from './middleware/errorMiddlware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import supplierRoutes from './routes/supplierRoutes.js'
import newRt from './routes/newRt.js'

import adRoutes from './routes/adRoutes.js'

dotenv.config('./.env');


connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}



app.use(express.json())
app.use(cors())
app.use(timeout('100000s'))

app.use('/api', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api', newRt);

app.use('/api', adRoutes);


// PAYPAL 
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get('/save', timeout('5s'), haltOnTimedout, function (req, res, next) {
        savePost(req.body, function (err, id) {
          if (err) return next(err)
          if (req.timedout) return
          res.send('saved as id ' + id)
        })
      })
      
      function haltOnTimedout (req, res, next) {
        if (!req.timedout) next()
      }
      
      function savePost (post, cb) {
        setTimeout(function () {
          cb(null, ((Math.random() * 40000) >>> 0))
        }, (Math.random() * 7000) >>> 0)
      }
      

    app.get('/',  (req, res) => {
        res.send("API is running")
    })
    app.get('/sayHy', (req, res) => {
        res.json({
        
            message: 'I say : "Hi"',
           
        })
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(`Server running ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold)
);   


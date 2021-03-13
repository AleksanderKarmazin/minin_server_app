import mongoose from 'mongoose'

const mongo_uri_my ='mongodb+srv://admin:AlLKW0AlP5woWvjH@cluster0.ubvwe.azure.mongodb.net/farmApp?retryWrites=true&w=majority'


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGO_URI 
            // ||
            // mongo_uri_my
            
            , {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            })
            console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB;
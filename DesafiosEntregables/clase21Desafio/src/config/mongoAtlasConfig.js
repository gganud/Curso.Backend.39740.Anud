import mongoose from "mongoose";
class ConnectDataBase{
    static connect = async ()=>{
        try {
            await mongoose.connect(process.env.MONGO_DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connected to MongoDB');
         } catch (error) {
             console.error('Error al conectar a MongoDB:', error.message);
         };
    }
}
export default ConnectDataBase;
import mongoose from "mongoose";
import config from "./index.js"
class ConnectDataBase{
    static connect = async ()=>{
        try {
            await mongoose.connect(config.dbUri, {
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
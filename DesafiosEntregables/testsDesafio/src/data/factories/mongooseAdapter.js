import mongoose from "mongoose";

class MongooseAdapter{
    async init(uri){
      try {
        this.connection = await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
      } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
      }
    }

    async close(){
      await this.connection.disconnect();
    }

    /* async drop(){
      await this.connection.dropDatabase();
    } */
}

export default MongooseAdapter;

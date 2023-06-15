import mongoose, { Schema } from "mongoose";
import paginate from 'mongoose-paginate-v2'

const cartCollection = 'carts';

const cartSchema = new Schema({
    products: {
        type: [
          {
            product: {
              type: Schema.Types.ObjectId, ref: 'products'
            },
            quantity: {
              type: Schema.Types.Number
            }
          }
        ],
        default: []
      }
});

cartSchema.plugin(paginate);
export default mongoose.model(cartCollection, cartSchema);
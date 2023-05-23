import mongoose, { Schema } from "mongoose";
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

export default mongoose.model(cartCollection, cartSchema);
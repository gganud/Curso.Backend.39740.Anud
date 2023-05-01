import mongoose, { Schema } from "mongoose";

const cartCollection = 'carts';

const cartSchema = new Schema({
products: { type: Schema.Types.Array, default: [] },
enable: { type: Schema.Types.Boolean, default: true }
});

export default mongoose.model(cartCollection, cartSchema);
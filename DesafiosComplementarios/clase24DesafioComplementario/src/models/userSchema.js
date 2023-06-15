import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const userCollection = 'users';

const userSchema = new Schema({
  firstName: { type: Schema.Types.String, required: true },
  lastName: { type: Schema.Types.String, required: true },
  email: { type: Schema.Types.String, unique: true, required: true },
  age: { type: Schema.Types.Number, default: 18 },
  role: { type: Schema.Types.ObjectId, index: true, ref: 'roles' },
  isAdmin: { type: Schema.Types.Boolean, default: false },
  password: { type: Schema.Types.String, required: true }
});

userSchema.plugin(paginate);

export default mongoose.model(userCollection, userSchema);
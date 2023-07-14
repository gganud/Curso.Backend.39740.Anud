import z from 'zod';
/* import mongoose from 'mongoose'

const idValidation = z.object({
  id: z.string().refine((val) => {
    return mongoose.Types.ObjectId.isValid(val)
  }),
}) */
const idValidation = z.string().refine((value) => value.length === 24, {
  message: 'El ID debe tener una longitud de 24 caracteres',
});

export default idValidation;

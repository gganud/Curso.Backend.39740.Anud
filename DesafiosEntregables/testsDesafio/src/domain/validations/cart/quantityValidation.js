import z from 'zod';

const cartQuantityValidation = z.object({
  price: z.number().min(1).max(999999),
});

export default cartQuantityValidation;

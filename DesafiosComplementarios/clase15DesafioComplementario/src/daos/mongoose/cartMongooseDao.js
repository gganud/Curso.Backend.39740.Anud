import cartSchema from "../models/cartsSchema.js";
class cartMongooseDao {

    async getOneCart(id){
        try {
            const cartDocument = await cartSchema.findOne({ _id: id })
            if(!cartDocument)
            {
                throw new Error('Cart dont exist.');
            }
            return {
                id: cartDocument._id,
                products: cartDocument.products,
            }
        } 
        catch (error) {
            throw new Error (error);
        }
    }

    async createCart(){
        try {
            const cartDocument = await cartSchema.create({products: []});
            return {
                id: cartDocument._id,
                products: cartDocument.products,
            }
        } 
        catch (error) {
            throw new Error (error);
        }
    }

    async addProductToCart(idC, idP){
        try {
            const productOnCart = await cartSchema.findOne( {$and:[{ _id: idC },{"products.product": idP}]} );
            if(!productOnCart){
                const cartDocument = await cartSchema.findOneAndUpdate({ _id: idC }, { $push: {products: { product: idP, quantity: 1 }}}, { new: true})
                return {
                    id: cartDocument._id,
                    products: cartDocument.products,
                }
            } 
            else{
                const cartDocument = await cartSchema.findOneAndUpdate({ _id: idC, "products.product": idP },{$inc: {"products.$.quantity": 1}}, { new: true})
                return {
                    id: cartDocument._id,
                    products: cartDocument.products,
                }
            }
            if(!cartDocument){
                throw new Error('Cart dont exist.');
            }
            
            
        } 
        catch (error) {
            throw new Error (error);
        }
    }
}
export default cartMongooseDao;
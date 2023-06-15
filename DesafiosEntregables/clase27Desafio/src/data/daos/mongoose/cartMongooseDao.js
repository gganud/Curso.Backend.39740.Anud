import cartSchema from "../../models/mongoose/cartsSchema.js";
class CartMongooseDao {

    async getOneCart(id){
        const cartDocument = await cartSchema.findOne({ _id: id })
        .populate('products.product')
        if(!cartDocument)
        {
            throw new Error('Cart dont exist.');
        }
        return {
            idCart: cartDocument._id,
            products: cartDocument.products.map(e =>({
                Product: e.product,
                Quantity: e.quantity  
            }))                
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
    //Mejorar logica de agregar producto al carro.
    async addProductToCart(idC, idP){
        const productOnCart = await cartSchema.findOne( {$and:[{ _id: idC },{"products.product": idP}]} );
        if(!productOnCart){
            const cartDocument = await cartSchema.findOneAndUpdate(
                { _id: idC }, 
                { $push: {products: { product: idP, quantity: 1 }}}, 
                { new: true})
            return {
                id: cartDocument._id,
                products: cartDocument.products,
            }
        } 
        else{
            const cartDocument = await cartSchema.findOneAndUpdate({ _id: idC, "products.product": idP },{$inc: {"products.$.quantity": 1}}, { new: true})
            if(!cartDocument){
                throw new Error('Cart dont exist.');
            }     
            return {
                id: cartDocument._id,
                products: cartDocument.products,
            }
        }
    }

    async deleteProduct(idC, idP){
        try {
            const productOnCart = await cartSchema.findOne( {$and:[{ _id: idC },{"products.product": idP}]} );
            if(!productOnCart){
                throw new Error('Product dont exist.');
            }
            const document = await cartSchema.findByIdAndUpdate(
                { _id: idC },
                { $pull: { products: { product: idP } } },
                { new: true }
            )

            return {
                id: document._id
            };
        } 
        catch (error) 
        {
            throw new Error (error);
        }
    }

    async deleteProducts(id) {
        try {
            const document = await cartSchema.findOneAndUpdate(
                { _id: id },
                { $set: { products: [] } },
                { new: true }
            );
            return {
                id: document._id
            }
        } catch (error) {
            throw error;
        }
    };

    async updateProduct(quantity, cid, pid) {
        try {
            const document = await cartSchema.findOneAndUpdate(
                { _id: cid, 'products.product': pid },
                { $set: { 'products.$.quantity': quantity } },
                { new: true }
            );
            return {
                id: document._id,
                products: document.products.map(item => {
                    return {
                        id: item._id,
                        quantity: item.quantity
                    }
                })
            }
        } catch (error) {
            throw error;
        }
    };

    async updateProducts(products, cid) {
        try {
            const document = await cartSchema.findOneAndUpdate(
                { _id: cid },
                { $set: { 'products': products } },
                { new: true }
            );
            return {
                id: document._id,
                products: document.products.map(item => {
                    return {
                        id: item.product,
                        quantity: item.quantity
                    }
                })
            }
        } catch (error) {
            throw error;
        }
    };
}
export default CartMongooseDao;
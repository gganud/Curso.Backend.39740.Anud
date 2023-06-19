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
        const cartDocument = await cartSchema.create({products: []});
        return {
            id: cartDocument._id,
            products: cartDocument.products,
        }
    }
 
    async addProductToCart(idC, idP){
        const cart = await cartSchema.findOne({ _id: idC });
        if(!cart){
            throw new Error('Cart dont exist.');
        }
        let cartDocument = await cartSchema.findOneAndUpdate({ _id: idC, "products.product": idP },
        {$inc: {"products.$.quantity": 1}},
        { new: true})
        if(!cartDocument){
            cartDocument = await cartSchema.findOneAndUpdate(
            { _id: idC }, 
            { $push: {products: { product: idP, quantity: 1 }}}, 
            { new: true})
        }  
        return {
            id: cartDocument._id,
            products: cartDocument.products,
        }
    }

    async deleteProduct(idC, idP){
        const productOnCart = await cartSchema.findOne( { _id: idC, "products.product": idP } );
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

    async deleteProducts(id) {
        const document = await cartSchema.findOneAndUpdate(
            { _id: id },
            { $set: { products: [] } },
            { new: true }
        );
        return {
            id: document._id
        }
    };

    async updateProduct(quantity, cid, pid) {
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
        };
    };

    async updateProducts(products, cid) {
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
        };
    };
}
export default CartMongooseDao;
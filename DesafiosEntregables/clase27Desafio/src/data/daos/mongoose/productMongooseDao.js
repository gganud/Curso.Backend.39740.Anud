import productSchema from "../../models/mongoose/productsSchema.js";
class ProductMongooseDao {
    productInfo(productDocument){
        return {
            id: productDocument._id,
            title: productDocument.title, 
            description: productDocument.description, 
            price: productDocument.price, 
            thumbnail: productDocument.thumbnail, 
            code: productDocument.code, 
            stock: productDocument.stock,
            enable: productDocument.enable
        }
    }
    async getProducts(sort, inStock){
        try {
            const products = await productSchema.find({enable: inStock})
            .sort({price: sort});
            return products.map(productDocument => (
                this.productInfo(productDocument)
            )); 
        } 
        catch (error) {
            throw new Error (error);
        }
    }
    async getOneProduct(id){
        try {
            const productDocument = await productSchema.findOne({ _id: id })
            if(!productDocument)
            {
                throw new Error('Product dont exist.');
            }
            return (this.productInfo(productDocument))
        } 
        catch (error) {
            throw new Error (error);
        }
    }

    async createProduct(data){
        try {
            const productDocument = await productSchema.create(data);
            return (this.productInfo(productDocument))
        } 
        catch (error) {
            throw new Error (error);
        }
    }

    async updateProduct(id, data){
        try {
            const productDocument = await productSchema.findOneAndUpdate({ _id: id }, data, { new: true})
            if(!productDocument){
                throw new Error('Product dont exist.');
            }
            return (this.productInfo(productDocument))
        } 
        catch (error) {
            throw new Error (error);
        }
    }

    async deleteProduct(id){
        try {
            if(!id){
                throw new Error('Product dont exist.');
            }
            
            return productSchema.findOneAndUpdate({ _id: id }, {enable: false})
        } 
        catch (error) {
            throw new Error (error);
        }
    }
    /* async addfield(){
        return productSchema.updateMany({}, {$set:{"enable": true}}) 
    } */
}
export default ProductMongooseDao;
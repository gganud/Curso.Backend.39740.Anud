import { nanoid } from "nanoid";
import container from "../../container.js";
import idValidation from "../validations/shared/idValidation.js";
import quantityValidation from "../validations/cart/quantityValidation.js";
import ProductManager from './productManager.js';
import TicketManager from './ticketManager.js';
import MailService from '../../shared/mailService.js';

class CartManager{
    constructor(){
        this.cartRepository = container.resolve('CartRepository');
        this.productManager = new ProductManager();
        this.ticketManager = new TicketManager();
    }
    async getCart(userId){
        await idValidation.parseAsync(userId);   
        return this.cartRepository.getOneCart(userId);
    }

    async addCart(cart){
        return this.cartRepository.createCart(cart);
    }

    async addToCart(idC, idP){
        await idValidation.parseAsync(idC, idP);
        return this.cartRepository.addProductToCart(idC, idP );
    }
    async deleteProducts(idC){
        await idValidation.parseAsync(idC); 
        return this.cartRepository.deleteProducts(idC);
    }

    async deleteProduct(idC, idP){
        await idValidation.parseAsync(idC, idP);   
        return this.cartRepository.deleteProduct(idC, idP);
    }

    async updateProduct(quantity, idC, idP){
        await quantityValidation.parseAsync({quantity});
        await idValidation.parseAsync(idC, idP);   
        return this.cartRepository.updateProduct(quantity, idC, idP);
    }
    async updateCart(products, idC){
        await idValidation.parseAsync(idC);
        return this.cartRepository.updateProducts(products, idC);
    }
    async checkout(idC){
        await idValidation.parseAsync(idC);
        const checkoutCart = await this.cartRepository.checkout(idC)
        //Verifico si hay productos en el carrito
        if (checkoutCart.products.length === 0){
            throw new Error(`El carrito se encuentra sin productos`)
        }
        let amount = 0
        for (const product of checkoutCart.products) {
            // encontrar cada producto en la base de datos);
            const productInDb = await this.productManager.getProductById(product.product.id)
            // si el stock de algun producto es 0 throw error
            if (productInDb.stock === 0) {
                throw new Error(`El producto ${productInDb.title} se encuentra sin stock`)
                let carrofiltrado = checkoutCart.products.filter(item => item.product.stock>0)
            }
            // Si el stock es menor al solicitado trow error
            if (productInDb.stock - product.quantity < 0) {
                throw new Error(
                `No tenemos stock suficiente de ${productInDb.title}, actualmente tenemos ${productInDb.stock}u`
                )
            }
            // sumar precio * cantidad
            amount += productInDb.price * product.quantity
            // Actualizo stock del producto
            const updatedProduct = await this.productManager.updateProduct(product.product.id, { $inc: { stock: -product.quantity } })
            // si me quedo sin stock actualizo el enable del producto
            if (updatedProduct.stock === 0) {
                await this.productManager.deleteOneProduct(product.product.id)
            }
        }
        const ticket = await this.ticketManager.create({
            code: nanoid(),
            purchase_datetime: new Date(),
            amount,
            purchaser: checkoutCart.userId.email,
            products: checkoutCart.products.map(item => {
                return {
                    id: item.product.id,
                    title: item.product.title,
                    price: item.product.price,
                    quantity: item.quantity
                }
            })
        })
        //Vacio carrito luego de emitir el ticket
        await this.cartRepository.deleteProducts(idC);
        MailService.sendMail(
            {
                from: 'ECCOMMERCE',
                to: 'gastonanud@gmail.com',
                subject: 'Orden de compra',
                html: `
                <div>
                <h2 style="color: red;">Orden de compra.</h2>
                <hr />
                <h3 style="color: blue;">
                Detalle.
                </h3>
                <h5>Nº Ticket: ${ticket.code}.</h5>
                <h5>Fecha de compra: ${ticket.purchase_datetime}.</h5>
                <h5>Correo de usuario: ${ticket.purchaser}.</h5>
                <h5>Monto total de la compra: $${ticket.amount}.</h5>
                <hr />
                <h3>
                Gracias por su compra!
                </h3>
                </div>
                `
              }
        )
        return  ticket
    }
}

export default  CartManager;
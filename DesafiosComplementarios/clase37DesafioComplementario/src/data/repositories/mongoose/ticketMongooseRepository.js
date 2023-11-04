import ticketSchema from '../../models/mongoose/ticketSchema.js';
import Ticket from '../../../domain/entities/ticket.js';

class TicketMongooseRepository
{
  async create(ticket)
{
    const ticketDocument = await ticketSchema.create(ticket);
    return new Ticket({
        code: ticketDocument.code,
        purchase_datetime: ticketDocument.purchase_datetime,
        amount: ticketDocument.amount,
        purchaser: ticketDocument.purchaser,
        products: ticketDocument.products
    });
  }

  async getOne(idT)
{
    const ticketDocument = await ticketSchema.findOne({ _id: idT });
    if (!ticketDocument)
    {
        throw new Error('Cart dont exist.');
    }
    return new Ticket({
      code: ticketDocument.code,
      purchase_datetime: ticketDocument.purchase_datetime,
      amount: ticketDocument.amount,
      purchaser: ticketDocument.purchaser,
      products: ticketDocument.products
    });
  }

  async getAll(purchaser)
{
    const ticketDocument = await ticketSchema.find({ purchaser });
    if (!ticketDocument)
    {
        throw new Error('Cart dont exist.');
    }
    return new Ticket({
      code: ticketDocument.code,
      purchase_datetime: ticketDocument.purchase_datetime,
      amount: ticketDocument.amount,
      purchaser: ticketDocument.purchaser,
      products: ticketDocument.products
    });
  }
}

export default TicketMongooseRepository;

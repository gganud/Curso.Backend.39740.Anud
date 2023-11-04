import container from '../../container.js';
import ticketCreateValidation from '../validations/ticket/ticketCreateValidation.js';
class TicketManager
{
    constructor()
{
        this.ticketRepository = container.resolve('TicketRepository');
    }
    async create(ticket)
{
        await ticketCreateValidation.parseAsync(ticket);
        return this.ticketRepository.create(ticket);
    }
    async getOne(idT)
{
        return this.ticketRepository.getOne(idT);
    }
    async getAll(purchaser)
{
        return this.ticketRepository.getAll(purchaser);
    }
}

export default  TicketManager;

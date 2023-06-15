import UserManager from "../managers/userManager.js";

class UserController{
    static list = async (req, res, next) =>{
        try {
            const { limit, page } = req.query;
            const manager = new UserManager();
            const users = await manager.paginate({ limit, page });
            res.status(200).send({ status: 'success', users: users.docs, ...users, docs: undefined });
        } 
        catch (e) {
            next(e);
        }
    }

    static getOne = async (req, res, next) => {
        try {
            const { id } = req.params;
            const manager = new UserManager();
            const user = await manager.getOne(id);
            res.status(200).send({ status: 'success', payload: user });
        } 
        catch (e) {
            next(e);
        } 
    }

    static getOneByEmail = async (req, res, next) => {
        try {
            const { email } = req.body;
            const manager = new UserManager();
            const user = await manager.getOneByEmail(email);
            res.status(200).send({ status: 'success', payload: user });
        } 
        catch (e) {
            next(e);
        } 
    }

    static save = async (req, res, next) => {
        try {
            const manager = new UserManager();
            const user = await manager.create(req.body);
            res.status(201).send({ status: 'success', payload: user, message: 'User created.' })    
        } 
        catch (e) {
            next(e);    
        }
    }

    static update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const manager = new UserManager();
            const result = await manager.updateOne(id, req.body);
            res.status(201).send({ status: 'success', payload: result, message: 'User updated.' })
        } 
        catch (e) {
            next(e);    
        }
      }

    static delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            const manager = new UserManager();
            const user = await manager.deleteOne(id);   
            res.status(201).send({ status: 'success',payload: user,  message: 'User deleted.' })
        } 
        catch (e) {
            next(e);    
        }
      }
}
export default UserController;
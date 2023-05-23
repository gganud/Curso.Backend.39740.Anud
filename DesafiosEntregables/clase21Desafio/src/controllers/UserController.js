import UserManager from "../managers/UserManager.js";
class UserController{
    static list = async (req, res) =>{
        const { limit, page } = req.query;
        const manager = new UserManager();
        const users = await manager.paginate({ limit, page });
        res.send({ status: 'success', users: users.docs, ...users, docs: undefined });
    }

    static getOne = async (req, res) => {
        const { id } = req.params;
        const manager = new UserManager();
        const user = await manager.getOne(id);
        res.send({ status: 'success', payload: user });
    }

    static save = async (req, res) => {
        const data = req.body
        const manager = new UserManager();
        const user = await manager.create(data);
        res.send({ status: 'success', payload: user, message: 'User created.' })
    }

    static update = async (req, res) => {
        const { id } = req.params;
        const data = req.body
        const manager = new UserManager();
        const result = await manager.updateOne(id, data);
        res.send({ status: 'success', payload: result, message: 'User updated.' })
      }

    static delete = async (req, res) => {
        const { id } = req.params;
        const manager = new UserManager();
        const user = await manager.deleteOne(id);   
        res.send({ status: 'success',payload: user,  message: 'User deleted.' })
      }
}
export default UserController;
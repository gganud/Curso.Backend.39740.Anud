import UserManager from "../managers/UserManager.js";
import hash from "../shared/bcrypt.js"
import token from "../shared/token.js"
class SessionController{
    static login = async (req, res) =>{
        const { email, password } = req.body;
        if (!email && !password){
            throw new Error('Email and Password invalid format.');
        }
        const manager = new UserManager();
        const user = await manager.getOneByEmail(email);
        const isHashedPassword = await hash.isValidPassword(password, user.password)
        if (!isHashedPassword){
            return res.status(401).send({ message: 'Login failed, invalid password.'})
        }
        const accessToken = await token.generate(user);
        res.send({ accessToken, message: `Login success!, user: ${email}!` });
    }

    /* static logout = async (req, res) => {
        req.session.destroy( err => {
            if(!err){
              return res.send({ message: 'Logout ok!' });
            }
            res.send({ message: 'Logout error!', body: err })
        });
    } */

    static current = async (req, res) =>{
        res.status(200).send({ status: 'Success', payload: req.user });
    };

    static signup = async (req, res) => {
        const manager = new UserManager();
        const dto = {
            ...req.body,
            password: await hash.createHash(req.body.password, 10)
        }
        const user = await manager.create(dto);
        res.status(201).send({ status: 'success', user, message: 'User created.' });
    }
}
export default SessionController;
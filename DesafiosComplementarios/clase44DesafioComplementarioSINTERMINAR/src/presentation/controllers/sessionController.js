import SessionManager from '../../domain/managers/sessionManager.js';

class SessionController
{
    static login = async(req, res, next) =>
{
        try
{
            const { email, password } = req.body;
            const manager = new SessionManager();
            const accessToken = await manager.login(email, password);
            res.cookie('accessToken', accessToken, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true
            }).status(200).send({ accessToken, message: `Login success!, user: ${email}!` });
        }
        catch (e)
{
            next(e);
        }
    };

    /* static logout = async (req, res) => {
        req.session.destroy( err => {
            if(!err){
              return res.send({ message: 'Logout ok!' });
            }
            res.send({ message: 'Logout error!', body: err })
        });
    } */

    static current = async(req, res, next) =>
{
        try
{
            res.status(200).send({ status: 'Success', payload: req.user });
        }
        catch (e)
{
           next(e);
        }
    };

    static signup = async(req, res, next) =>
{
        try
{
            const manager = new SessionManager();
            const user = await manager.signup(req.body);
            res.status(201).send({ status: 'success', user, message: 'User created.' });
        }
        catch (e)
{
            next(e);
        }
    };
}
export default SessionController;

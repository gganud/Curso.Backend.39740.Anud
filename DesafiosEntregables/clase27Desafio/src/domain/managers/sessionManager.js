import UserMongooseDao from "../../data/daos/mongoose/userMongooseDao.js";
import hash from "../../shared/bcrypt.js";
import token from "../../shared/token.js";
import userCreateValidation from "../validations/user/userCreateValidation.js";
import loginValidation from "../validations/session/loginValidation.js";

class SessionManager
{
  constructor(){
     this.userDao = new UserMongooseDao();
  }

  async login(email, password){
    await loginValidation.parseAsync({ email, password });

    const user = await this.userDao.getOneByEmail(email);
    const isHashedPassword = await hash.isValidPassword(password, user.password)
      if (!isHashedPassword){
        throw new Error('Login failed, invalid password.');
      }

    return await token.generate(user);
  }

  async signup(payload)
  {
    await userCreateValidation.parseAsync(payload);

    const dto = {
      ...payload,
      password: await hash.createHash(payload.password, 10)
    }
    const user  = await this.userDao.create(dto);
    return { ...user, password: undefined};
  }
}

export default SessionManager;

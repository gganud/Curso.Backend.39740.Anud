import container from "../../container.js";
import Hash from "../../shared/bcrypt.js";
import TokenJWT from "../../shared/token.js";
import userCreateValidation from "../validations/user/userCreateValidation.js";
import loginValidation from "../validations/session/loginValidation.js";

class SessionManager
{
  constructor(){
    this.userRepository = container.resolve('UserRepository');
  }

  async login(email, password){
    await loginValidation.parseAsync({ email, password });
    const user = await this.userRepository.getOneByEmail(email);
    if(!user.email){
      throw new Error('User dont exist.');
    }
    const isHashedPassword = await Hash.isValidPassword(password, user.password)
    if (!isHashedPassword){
        throw new Error('Login failed, invalid password.');
      }

    return await TokenJWT.generate(user);
  }

  async signup(payload)
  {
    await userCreateValidation.parseAsync(payload);

    const dto = {
      ...payload,
      password: await Hash.createHash(payload.password)
    }
    const user  = await this.userRepository.create(dto);
    return { ...user, password: undefined};
  }
}

export default SessionManager;

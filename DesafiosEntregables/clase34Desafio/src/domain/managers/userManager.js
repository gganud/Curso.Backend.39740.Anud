import container from "../../container.js";
import Hash from "../../shared/bcrypt.js";
import userCreateValidation from "../validations/user/userCreateValidation.js";
import userUpdateValidation from "../validations/user/userUpdateValidation.js";
import emailValidation from "../validations/user/emailValidation.js";
import idValidation from "../validations/shared/idValidation.js";

class UserManager{
  constructor(){
    this.userRepository = container.resolve('UserRepository');
  }

  async paginate(criteria){
    return this.userRepository.paginate(criteria);
  }

  async getOneByEmail(email){
    await emailValidation.parseAsync({ email });
    return this.userRepository.getOneByEmail(email);
  }

  async getOne(id){
    await idValidation.parseAsync({ id });
    return this.userRepository.getOne(id);
  }

  async create(data){
    await userCreateValidation.parseAsync(data);
    const dto = {
      ...data,
      password: await Hash.createHash(data.password)
    }
    const user = await this.userRepository.create(dto);
    return { ...user, password: undefined };
  }

  async updateOne(id, data){
    await userUpdateValidation.parseAsync({ ...data, id });
    return this.userRepository.updateOne(id, data);
  }

  async deleteOne(id){
    await idValidation.parseAsync({ id });
    return this.userRepository.deleteOne(id);
  }

  async forgetPassword(dto)
  {
    const user = await this.userDao.getOneByEmail(dto.email);
    user.password = dto.password;

    return this.userRepository.updateOne(user.id, user);
  }
}

export default UserManager;

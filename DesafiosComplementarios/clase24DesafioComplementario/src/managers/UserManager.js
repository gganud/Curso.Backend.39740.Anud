import UserMongooseDao from "../daos/mongoose/userMongooseDao.js";
import userCreateValidation from "../validations/user/userCreateValidation.js";
import userUpdateValidation from "../validations/user/userUpdateValidation.js";
import emailValidation from "../validations/user/emailValidation.js";
import idValidation from "../validations/shared/idValidation.js";

class UserManager{
  constructor(){
     this.userDao = new UserMongooseDao();
  }

  async paginate(criteria){
    return this.userDao.paginate(criteria);
  }

  async getOneByEmail(email){
    await emailValidation.parseAsync({ email });
    return this.userDao.getOneByEmail(email);
  }

  async getOne(id){
    await idValidation.parseAsync({ id });
    return this.userDao.getOne(id);
  }

  async create(data){
    await userCreateValidation.parseAsync(data);
    const user = await this.userDao.create(data);
    return { ...user, password: undefined };
  }

  async updateOne(id, data){
    await userUpdateValidation.parseAsync({ ...data, id });
    return this.userDao.updateOne(id, data);
  }

  async deleteOne(id){
    await idValidation.parseAsync({ id });
    return this.userDao.deleteOne(id);
  }

  //Agregar un forget Password
}

export default UserManager;

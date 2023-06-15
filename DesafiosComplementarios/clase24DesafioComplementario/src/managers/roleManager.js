import RoleMongooseDao from "../daos/mongoose/roleMongooseDao.js";
import roleCreateValidation from '../validations/role/roleCreateValidation.js'
import roleUpdateValidation from '../validations/role/roleUpdateValidation.js'
import idValidation from "../validations/shared/idValidation.js";

class RoleManager
{
  constructor(){
     this.roleDao = new RoleMongooseDao();
  }

  async paginate(criteria){
    return this.roleDao.paginate(criteria);
  }

  async getOne(id){
    await idValidation.parseAsync({id}); 
    return this.roleDao.getOne(id);
  }

  async create(data){
    await roleCreateValidation.parseAsync(data)
    return await this.roleDao.create(data);
  }

  async updateOne(id, data){
    await roleUpdateValidation.parseAsync({...data, id});
    return this.roleDao.updateOne(id, data);
  }

  async deleteOne(id){
    await idValidation.parseAsync({id}); 
    return this.roleDao.deleteOne(id);
  }
}

export default RoleManager;

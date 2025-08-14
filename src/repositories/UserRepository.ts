import { EntityManager } from "typeorm";
import { User } from "../entities/User";


export class UserRepository {
     private manager: EntityManager

     constructor(manager : EntityManager){
        this.manager = manager
     }
    
     createUser = async (user:User): Promise<User> => {
        return await this.manager.save(user)
      }

      getUser =  async (userId: string): Promise<User | null> => {
         return  await this.manager.findOne(User, {
            where: { id_user: userId }
         })
      }

      deleteUser = async(email:string):Promise<void> => {
         await this.manager.delete(User, { email})
      }

      updateUser = async(email:string,password:string):Promise<void> => {
         await this.manager.update(User, {email}, {password})
      }

      getUserByEmailAndPassword = async(email:string, password:string): Promise<User | null> => {
         return await this.manager.findOne(User, {
            where:{
               email,
               password
            }
         })
      }
}
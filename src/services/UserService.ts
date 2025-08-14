import { UserRepository } from '../repositories/UserRepository';
import { AppDataSource } from "../database";
import { User } from '../entities/User';
import { sign } from 'jsonwebtoken';

export class UserService {
   
    private userRepository:UserRepository
    
    constructor( userRepository = new UserRepository(AppDataSource.manager)){
       this.userRepository=userRepository
    }

   createUser = async (name: string, email: string, password:string): Promise<User> => {
      const user = new User(name, email, password)
      return await this.userRepository.createUser(user as User)
    }
   getUser = async (id_user:string):Promise<User | null> =>{
      return await this.userRepository.getUser(id_user)
    }

   getAuthentication= async (email:string, password:string): Promise<User | null> => {
      return await this.userRepository.getUserByEmailAndPassword(email, password )
    }

    getToken = async (email:string, password:string): Promise<string>=> {
      const user = await this.getAuthentication(email, password)

      if (!user) {
        throw new Error("Usuário não encontrado");
         }

      const tokenData = {
         name:user?.name,
         email:user?.email
      }

      const tokenKey='dio'

      const tokenOptions ={
         subject:user?.id_user
      }
       const token = sign(tokenData,tokenKey,tokenOptions)
       return token
    }

   deleteUser = async (email:string): Promise<void>=> {
      await this.userRepository.deleteUser(email)
        
     }

   updateUser= async (email:string, password:string): Promise<void>=> {
      await this.userRepository.updateUser(email,password)
   }
}



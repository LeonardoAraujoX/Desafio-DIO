import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    createUser = async (request: Request, response: Response): Promise<Response> => {
        try{
            const user = request.body
            if(!user.name || !user.email || !user.password){
                return response.status(400).json({message:"Nome,email e senha são obrigatorios"})
            }
            await this.userService.createUser(user.name, user.email, user.password)
            return response.status(201).json({message:"Usuario criado com sucesso"})
        }catch{
            return response.status(500).json({message:"Nãoo foi possiviel criar um usuario"})
        }
    }

     getUser = async (request:Request, response:Response) => {
        try{         
            const {id_user} = request.params
            if(!id_user){
            return response.status(401).json({message:"'Usuário não autenticado'"})
            }

         const user = await this.userService.getUser(id_user)

            if(!user){
             return response.status(404).json({message:"Usuário não encontrado"})
            }

            return response.status(200).json({user:user?.id_user,
            name:user?.name,
            email: user?.email})
        }catch{
          return response.status(500).json({ message: "Erro ao buscar usuário"})
    }
    }

    deleteUser = async (request:Request, response:Response) => {
        try {
        const { email } = request.body;
        if (!email) {
            return response.status(400).json({ message: 'Email é obrigatório' });
        }

        const userDelete = await this.userService.deleteUser(email);

       
        if (!userDelete) {
            return response.status(404).json({ message: 'Usuário não encontrado' });
        }

        return response.status(200).json({ message: 'Usuário deletado com sucesso', userDelete });
        
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        return response.status(500).json({ message: 'Erro interno no servidor' });
    }
}


    updateUser = async (request: Request, response: Response): Promise<Response> => {
    try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    const updatedUser = await this.userService.updateUser(email, password);
    if (!updatedUser) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    return response.status(200).json({ message: 'Alterações salvas com sucesso', user: updatedUser });

    } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return response.status(500).json({ message: 'Erro interno no servidor' });
  }
}

}

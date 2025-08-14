import { request, Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    createUser = (request: Request, response: Response): Response => {
        const user = request.body

        if(!user.name || !user.email || !user.password){
            return response.status(400).json({ message: 'Bad request! Name,email e password são obrigatórios'})
        }

        this.userService.createUser(user.name, user.email, user.password)
        return response.status(201).json({ message: 'Usuário criado'})
    }

    getUser = async (request: Request, response: Response) => {
        const id_user = request.params
        const {uiid} = id_user
        const user = await this.userService.getUser(uiid)
        return response.status(200).json({
            user: user?.id_user,
            name:user?.name,
            email: user?.email
    })
    } 

    deleteUser = async (request:Request, response:Response) => {
       const user = request.params
       const userDelete = await this.userService.deleteUser(user.email)
       return response.status(200).json({ message: 'Usuário deletado', userDelete})
    }

    updateUser = async (request:Request, response:Response) => {
        const user = request.body
        await this.userService.updateUser(user.email, user.password)
        return response.status(200).json({message:"alteracoes salvas:"})
    }
}

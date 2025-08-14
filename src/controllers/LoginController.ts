import {sign} from 'jsonwebtoken'
import { json, Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class LoginController{
    userService:UserService

    constructor(userService=new UserService){
        this.userService=userService
    }


    login = async(request:Request, response:Response) => {
        try{
            const tokenBody = request.body
            const {email, password} = tokenBody
            const token = await this.userService.getToken(email,password)
            return response.status(200).json({token})
        }catch (error){
            return response.status(500).json({message: "email ou senha invalido"})
        }
    }
}
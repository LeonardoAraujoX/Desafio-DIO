import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { request, Request, response } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

const mockUserService={ 
    createUser:jest.fn()
}


jest.mock('../services/UserService', ()=>{
    return {
        UserService:jest.fn().mockImplementation(() => {
            return mockUserService
        })
    }
})

describe('UserController', () => {
    
    
    const userController = new UserController();

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com',
                password:'1234'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })


it('deve verificar se tem um erro caso o usuario nao informe o nome', () =>{
    const mockRequest = {
          body: {
                name: '',
                email: 'leo@test.com',
                password:'1234'
            }
    } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest,mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: "Bad request! Name,email e password são obrigatórios"})
        })

it('deve informar um erro caso o usuario nao informe o email', ()=> {
    const mockRequest = { 
        body: {
                name: 'Nath',
                email: '',
                password:'1234'
            }
    } as Request
    const mockResponse = makeMockResponse()
    userController.createUser(mockRequest,mockResponse)
    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({message: "Bad request! Name,email e password são obrigatórios"})
})

it('deve informar um erro caso o usuario nao informe o password', ()=> {
    const mockRequest = { 
        body: {
                name: 'Nath',
                email: 'nath@test.com',
                password:''
            }
    } as Request
    const mockResponse = makeMockResponse()
    userController.createUser(mockRequest,mockResponse)
    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({message: "Bad request! Name,email e password são obrigatórios"})
})

})
import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { request, Request, response } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers:jest.fn()
    }
    
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
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
                name: 'Nath',
                email: 'nath@test.com'
            }
    } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest,mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório'})
        })


it('deve chamar a funcao getAllusers', () => {
    const mockUsers = [   
        {name: 'Nath', email: 'nath@test.com'}
    ];
        
    (mockUserService.getAllUsers as jest.Mock).mockReturnValue(mockUsers);
    const mockRequest = {} as Request
    const mockResponse = makeMockResponse()
    userController.getAllUsers(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(200)
    expect(mockResponse.state.json).toEqual(mockUsers)
})

it('deve informar um erro caso o usuario nao informe o email', ()=> {
    const mockRequest = { 
        body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
    } as Request
    const mockResponse = makeMockResponse()
    userController.createUser(mockRequest,mockResponse)
    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({message: 'email nao informado'})
})


})
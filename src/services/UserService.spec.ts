import { UserService } from "./UserService";

jest.mock('../repositories/UserRepository')

const mockUserRepository = require('../repositories/UserRepository')
describe('UserService', () => {
        const userService = new UserService(mockUserRepository)

    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve({
            id_user:'1234',
            name:'leo',
            email:'leo@test.com',
            password:'1234'

        }))
        const response =  await userService.createUser('leo', 'leo@test.com', '123');
        expect(mockUserRepository.createUser).toHaveBeenCalledWith()
        expect(response).toMatchObject({
            id_user:'1234',
            name: 'leo',
            email: 'leo@test.com',
            password: '123'
        });
    })
})

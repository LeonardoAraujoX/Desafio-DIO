import { Router, } from 'express'
import { UserController } from './controllers/UserController'
import {LoginController} from './controllers/LoginController'
import { VerifyAuthentication } from './midlleware/VerifyAuthentication'

export const router = Router()


const userController = new UserController()
const loginController = new LoginController()

router.post('/user', userController.createUser)
router.get('/user/:id_user', VerifyAuthentication, userController.getUser)
router.delete('/user/:email', userController.deleteUser)
router.post('/login', loginController.login)
router.patch('/user', userController.updateUser)
import { Router } from 'express'
import { CreateUserController } from '../controllers/create-user/create-user'
import { DeleteUserController } from '../controllers/delete-user/delete-user'
import { GetUsersController } from '../controllers/get-users/get-users'
import { UpdateUserController } from '../controllers/update-user/update-user'
import { MongoCreateUserRepository } from '../repositories/create-user/mongo-create-user'
import { MongoDeleteUserRepository } from '../repositories/delete-user/mongo-delete-user'
import { MongoGetUsersRepository } from '../repositories/get-users/mongo-get-users'
import { MongoUpdateUserRepository } from '../repositories/update-user/mongo-update-user'

const router = Router()

router.get('/users', async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository()

  const getUsersController = new GetUsersController(mongoGetUsersRepository)

  const { body, statusCode } = await getUsersController.handle()

  const response = res.status(statusCode).send(body)

  return response
})

router.post('/users', async (req, res) => {
  const mongoCreateUserRepository = new MongoCreateUserRepository()
  const createUserController = new CreateUserController(
    mongoCreateUserRepository
  )

  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  })

  const response = res.status(statusCode).send(body)

  return response
})

router.patch('/users/:id', async (req, res) => {
  const mongoUpdateUserRepository = new MongoUpdateUserRepository()
  const updateUserController = new UpdateUserController(
    mongoUpdateUserRepository
  )
  const { body, statusCode } = await updateUserController.handle({
    body: req.body,
    params: req.params,
  })

  return res.status(statusCode).send(body)
})

router.delete('/users/:id', async (req, res) => {
  const mongoDeleteUserRepository = new MongoDeleteUserRepository()
  const deleteUserController = new DeleteUserController(
    mongoDeleteUserRepository
  )
  const { body, statusCode } = await deleteUserController.handle({
    params: req.params,
  })

  return res.status(statusCode).send(body)
})

export default router

import { UserRepository } from "../../repositories/implementation/UserRepository";
import { DeleteUserController } from "./DeleteUserController";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

const userRepository = new UserRepository()
const deleteUserUseCase = new DeleteUserUseCase(userRepository)
const deleteUserController = new DeleteUserController(deleteUserUseCase)

export { deleteUserUseCase, deleteUserController }
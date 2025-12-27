import { Router } from "express"
import { ExampleController } from "../../../controller/example.controller"

export const examplePrivateRouter = Router()

examplePrivateRouter.get("/", ExampleController.controller)
// userPrivateRouter.get("/", UserController.getMe)
// userPrivateRouter.post("/logout", UserController.logout)


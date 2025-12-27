import { Router } from "express"
import { ExampleController } from "../../../controller/example.controller"

export const examplePublicRouter = Router()

examplePublicRouter.post("/example", ExampleController.controller)
// authPublicRouter.post("/login", AuthController.login)
// authPublicRouter.post("/register", AuthController.register)

import express from "express"
import { ExampleController } from "../../controller/example.controller"
import { privateRateLimit } from "../middleware/security.middleware"

export const privateRouter = express.Router()
privateRouter.use(privateRateLimit)

// privateRouter.use(authMiddleware)

privateRouter.post("/", ExampleController.controller)
// userPrivateRouter.get("/", UserController.getMe)
// userPrivateRouter.post("/logout", UserController.logout)
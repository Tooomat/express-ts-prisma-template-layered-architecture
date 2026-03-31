import express from "express"
import { ExampleController } from "../../controller/example.controller"
import { authRateLimit, publicRateLimit } from "../middleware/security.middleware"

export const publicRouter = express.Router()
publicRouter.use(publicRateLimit)

// router tanpa/tidak perlu login
publicRouter.post("/api/example", authRateLimit, ExampleController.controller)
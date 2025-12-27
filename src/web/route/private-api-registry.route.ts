import express from "express"
import { examplePrivateRouter } from "./private/example.route"

export const privateRouter = express.Router()

// privateRouter.use(authMiddleware)

privateRouter.use("/api/user", examplePrivateRouter)
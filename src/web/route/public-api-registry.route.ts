import express from "express"
import { examplePublicRouter } from "./public/example.route"

export const publicRouter = express.Router()

// router tanpa/tidak perlu login
publicRouter.use("/api/example", examplePublicRouter)
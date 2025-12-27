import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../../error/service-response.error";

export const ErrorHandlerMiddleware = async (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ZodError) {
        res.status(400).json({
            success: false,
            errors: `Validation error: ${JSON.stringify(err)}`
        })
    } else if (err instanceof ResponseError) {
        res.status(err.status).json({
            success: false,
            errors: err.message
        })
    } else {
        res.status(500).json({
            success: false,
            errors: err.message
        })
    }
}
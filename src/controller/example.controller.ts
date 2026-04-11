import { NextFunction, Request, Response } from "express";
import { success_handler } from "../web/http/web-response.http";
import { ExampleService } from "../service/example.service";
import { securityLogger } from "../utils/logging.utils";
import { ExampleRequest } from "../validation/example.validation";

export class ExampleController {
    static async controller(req: Request, res: Response, next: NextFunction) {
        try {
            const request: ExampleRequest = req.body

            const result = await ExampleService.service(request)
            securityLogger.loginSuccess("098", req.ip ?? 'unknown')
            success_handler(res, "success", result, 200)
        } catch (e) {
            securityLogger.loginFailed("xxxgmail.com", req.ip ?? 'unknown', "reason")
            next(e) // throw to middleware
        }
    }
}
import { NextFunction, Request, Response } from "express";
import { success_handler } from "../../web/http/web-response.http";
import { ExampleService } from "../../service/example.service";
import { ExampleRequest } from "../../model/example.model";

export class ExampleController {
    static async controller(req: Request, res: Response, next: NextFunction) {
        try {
            const request: ExampleRequest = req.body

            const result = await ExampleService.service(request)

            success_handler(res, "success", result, 200)
        } catch (e) {
            next(e) // throw to middleware
        }
    }
}
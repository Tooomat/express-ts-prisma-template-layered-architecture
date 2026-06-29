import { NextFunction, Request, Response } from "express";
import { success_handler } from "../web/http/web-response.http";
import { ExampleService } from "../service/example.service";
import { ExampleRequest, ExampleResponse } from "../model/example.model";
import { logger } from "../application/logging";
import { errorUtils } from "../utils/error.utils";

export class ExampleController {
    static async controller(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const request: ExampleRequest = req.body

            const result: ExampleResponse = await ExampleService.service(request, (req as any).requestId)

            success_handler(res, "success", result, 200)
        } catch (e) {
            logger.error({
                type: "example:failed",
                requestId: (req as any).requestId,
                userId: (req as any).user?.id ?? 'anonymous',
                reason: e instanceof Error ? e.message : "unknown_error",
                origin: errorUtils.parseErrorOrigin(),
                timestamp: new Date().toISOString()
            })
            next(e) // throw to middleware
        }
    }
}
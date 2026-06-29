import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/service-response.error";
import { ExampleRequest, ExampleResponse, toExampleResponse } from "../model/example.model";
import { errorUtils } from "../utils/error.utils";
import { ExampleValidation } from "../validation/example.validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";


export class ExampleService {

    static async service(req: ExampleRequest, requestId: string): Promise<ExampleResponse> {
        const validationReq = Validation.validate(ExampleValidation.EXAMPLESCHEMA, req)

        // check apakah username sudah ada
        const totalUserWithSameUsername = await prismaClient.user.count({
            where: {
                username: validationReq.username
            }
        })
        if (totalUserWithSameUsername !== 0) {
            logger.warn({
                type: "example:conflict",
                requestId,
                reason: "username_already_exists",
                origin: errorUtils.parseErrorOrigin(),
                username: validationReq.username,
                timestamp: new Date().toISOString()
            })
            throw new ResponseError(409, "Username already exists") 
        }

        // hash password sebelum disimpan
        validationReq.password = await bcrypt.hash(validationReq.password, 10)

        // buat user baru
        const user = await prismaClient.user.create({
            data: validationReq
        })

        logger.info({
            type: "example:created",
            requestId,
            userId: user.name,
            username: user.username,
            origin: errorUtils.parseErrorOrigin(),
            timestamp: new Date().toISOString()
        })

        return toExampleResponse(user)
    }
}
import { prismaClient } from "../application/database";
import { ExampleRequest } from "../model/example/example-request.model";
import { ExampleResponse, toExampleResponse } from "../model/example/example-response.model";
import { ResponseError } from "../error/service-response.error";
import { ExampleValidation } from "../validation/example.validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";


export class ExampleService {

    static async service(req: ExampleRequest): Promise<ExampleResponse> {
        const validationReq = Validation.validate(ExampleValidation.EXAMPLESCHEMA, req)

        // check apakah username sudah ada
        const totalUserWithSameUsername = await prismaClient.user.count({
            where: {
                username: validationReq.username
            }
        })
        if (totalUserWithSameUsername !== 0) {
            throw new ResponseError(409, "Username already exists") 
        }

        // hash password sebelum disimpan
        validationReq.password = await bcrypt.hash(validationReq.password, 10)

        // buat user baru
        const user = await prismaClient.user.create({
            data: validationReq
        })

        return toExampleResponse(user)
    }
}
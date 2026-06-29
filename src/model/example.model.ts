 // Response DTO - data yang dikembalikan server ke client
import { User } from "../../generated/prisma/client"

// Request DTO - data yang masuk dari client ke server
export type ExampleRequest = {
    username: string
    name: string
    password: string
}
 
export type ExampleResponse = {
    username: string
    name: string
}
 
export function toExampleResponse(user: User): ExampleResponse {
    return {
        username: user.username,
        name: user.name,
    }
}
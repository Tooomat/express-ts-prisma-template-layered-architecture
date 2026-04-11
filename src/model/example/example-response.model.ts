// Response DTO - data yang dikembalikan server ke client
import { User } from "../../generated/prisma/client"
 
export type ExampleResponse = {
    username: string
    name: string
    token?: string
}
 
export function toExampleResponse(user: User): ExampleResponse {
    return {
        username: user.username,
        name: user.name,
    }
}
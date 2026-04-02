import { createHash } from "crypto"

export const formaterUtils = {
    hashPII(value: string): string {
        return createHash('sha256').update(value).digest('hex').substring(0, 16)
    },
    
    maskEmail(email: string): string {
        const [local, domain] = email.split('@')
        const masked = local![0] + '*'.repeat(Math.max(local!.length - 2, 1)) + local![local!.length - 1]
        return `${masked}@${domain}`
    }
}
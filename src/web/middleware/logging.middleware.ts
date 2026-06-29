import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from "express";
import { logger } from "../../application/logging";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now()
    const requestId = uuidv4()
    let responseSize = 0

    ;(req as any).requestId = requestId

    const originalWrite = res.write.bind(res)
    const originalEnd = res.end.bind(res)

    res.write = function (chunk: any, encodingOrCb?: any, cb?: any): boolean {
        if (chunk) {
            responseSize += Buffer.isBuffer(chunk)
                ? chunk.length
                : Buffer.byteLength(chunk, (typeof encodingOrCb === 'string' ? encodingOrCb : 'utf8') as BufferEncoding)
        }
        return originalWrite(chunk, encodingOrCb, cb)
    }

    res.end = function (chunk?: any, encodingOrCb?: any, cb?: any): Response {
        if (chunk && typeof chunk !== 'function') {
            responseSize += Buffer.isBuffer(chunk)
                ? chunk.length
                : Buffer.byteLength(chunk, (typeof encodingOrCb === 'string' ? encodingOrCb : 'utf8') as BufferEncoding)
        }
        return originalEnd(chunk, encodingOrCb, cb)
    }

    res.on('finish', () => {
        const duration = Date.now() - start

        const logPayload = {
            requestId,
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            responseSize: `${responseSize}b`,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            userId: (req as any).user?.id ?? 'anonymous'
        }

        if (res.statusCode >= 500) {
            logger.error({ type: 'http:request:error', ...logPayload })
        } else if (res.statusCode >= 400) {
            logger.warn({ type: 'http:request:warn', ...logPayload })
        } else {
            logger.info({ type: 'http:request', ...logPayload })
        }
    })

    next()
}
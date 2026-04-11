import { Response } from "express"

export interface WebResponse<T> {
  success: boolean
  message?: string
  data?: T
  error?: T
}

// 200, 201 — ada data
export function success_handler<T>(
  res:     Response,
  message: string = "",
  data:    T,
  status:  number = 200,
): Response<WebResponse<T>> {
  return res.status(status).json({ success: true, message, data })
}

// 200, 201 — tidak ada data (misal: logout, delete)
export function success_handler_without_data<T>(
  res:     Response,
  message: string = "",
  status:  number = 200,
): Response<WebResponse<T>> {
  return res.status(status).json({ success: true, message })
}

// 404 — resource tidak ditemukan
export function not_found_handler<T>(
  res:     Response,
  message: string = "not found",
  status:  number = 404,  
): Response<WebResponse<T>> {
  return res.status(status).json({ success: false, message }) 
}

// 400, 401, 403, 422 — error umum dengan error field
export function error_handler<T>(
  res:     Response,
  message: string = "something went wrong",
  error?:  T,
  status:  number = 400,
): Response<WebResponse<T>> {
  return res.status(status).json({ success: false, message, error })
}
export const QUOTE_TYPES = ["1", "2"] as const

export const MAPPED_QUOTE_TYPES = {
  "1": "Phiếu báo giá sửa chữa",
  "2": "Phiếu quyết toán sửa chữa",
} as const

export const RECORD_TYPES = ["1", "2", "3"] as const

export const MAPPED_RECORD_TYPES = {
  "1": "Phần phụ tùng thay thế",
  "2": "Phần gia công, phục hồi - cân chỉnh, vệ sinh",
  "3": "Phần tiền công",
} as const

export const VAT_VALUES = [0, 5, 8, 10]

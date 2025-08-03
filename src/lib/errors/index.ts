export class ValidationInputError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = "ValidationInputError"
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = "UnauthorizedError"
  }
}

export class ForbiddenError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = "ForbiddenError"
  }
}

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "DatabaseError"
  }
}

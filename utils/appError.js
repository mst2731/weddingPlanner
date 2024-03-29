class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }

    toJSON() {
        return {
            message: this.message,
            statusCode: this.statusCode,
            status: this.status
        }
    }
}

module.exports = AppError
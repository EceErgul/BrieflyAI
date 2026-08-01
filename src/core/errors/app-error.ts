export class AppError extends Error {
    constructor(
        message: string,
        public statusCode: number = 500,
        public code: string = "INTERNAL_ERROR"
    )
    {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message,400, "VALIDATION_ERROR");
    }
}

export class AIServiceError extends AppError {
    constructor(message: string) {
        super(message, 502, "AI_SERVICE_ERROR");
    }
}
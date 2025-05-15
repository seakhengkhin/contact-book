enum ErrorCodeEnum {
    Success = 'S000', // Operation completed successfully
    GeneralError = 'E999', // General or unknown error

    // User-Related Errors
    UserNotFound = 'U100',
    InvalidPassword = 'U101',
    EmailAlreadyExists = 'U102',

    // Contact-Related Errors
    ContactNotFound = 'C100',

    // Validation Errors
    FieldRequired = 'V100',
    InvalidFieldFormat = 'V101',

    // Prisma/Database Errors
    PrismaClientError = 'DB400',
    UniqueConstraintViolation = 'DB401',
    RecordNotFound = 'DB402',

    // Authentication/Authorization Errors
    Unauthorized = 'A401',
    Forbidden = 'A403',
    TokenExpired = 'A498', 
    InvalidToken = 'A499',

    // File Upload Errors
    NoFileUploaded = 'F400',
    FileUploadError = 'F401',
}

export default ErrorCodeEnum;
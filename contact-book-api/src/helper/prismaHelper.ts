const getPrismaErrorMessage = (e: any) => {
    switch (e.code) {
        case 'P2002': 
            return `${e.meta.target} already exist`;
        default:
            return e.message ?? `${e.code} ${e.meta.target}`;
    };
} 
const getPrismaErrorCode = (e: any) => {
    return `${e.code}${e.meta?.target}`.toUpperCase();
} 
const generateNewError = (code: string, message: string, field: string) => {
    const error =  {
        "code": code,
        "message": message,
        "meta": {
            "target": [field]
        }
    }
    return error;
}
export {
    getPrismaErrorMessage,
    getPrismaErrorCode,
    generateNewError
}
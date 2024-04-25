declare class AppError extends Error {
    ErrorName: string;
    message: string;
    constructor(message: string, ErrorName: string);
}
export default AppError;

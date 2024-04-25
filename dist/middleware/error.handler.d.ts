import { Response, Request, NextFunction } from 'express';
export declare function ErrorHandler(err: any, req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;

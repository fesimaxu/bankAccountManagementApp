import { Request, Response, NextFunction } from "express";



export const error404 = (req: Request, res: Response, next: NextFunction) => {

    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
  }
  
  
export const error500 = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;
  
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }
  
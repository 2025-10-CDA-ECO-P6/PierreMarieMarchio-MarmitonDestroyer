import { Request, Response, NextFunction } from 'express';

export const cors = () => {
  const origin = process.env.CORS_ORIGIN || '*';
  const methods = process.env.CORS_METHODS || 'GET,POST,PUT,DELETE,OPTIONS';
  const headers = process.env.CORS_HEADERS || 'Content-Type,Authorization';

  return (req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', methods);
    res.header('Access-Control-Allow-Headers', headers);

    next();
  };
};

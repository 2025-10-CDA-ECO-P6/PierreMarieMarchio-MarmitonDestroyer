import { Request, Response, NextFunction } from 'express';

export const responseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const originalJson = res.json.bind(res);

  res.json = (body: any) => {
    if (body && (body.error || body.success === false))
      return originalJson(body);
    if (body?.success === true && body.data) return originalJson(body);

    return originalJson({ success: true, data: body.data });
  };

  next();
};

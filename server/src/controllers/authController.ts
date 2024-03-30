import { Request, Response } from 'express';

export const renderAuthPage = (req: Request, res: Response) => {
  res.render('pages/auth');
};

export const renderSuccessPage = (req: Request, res: Response) => {
  res.send(req.user);
};

export const renderErrorPage = (req: Request, res: Response) => {
  res.send("Error logging in");
};

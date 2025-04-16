import { Request, Response, NextFunction } from 'express';
import passport from '@app/config/auth/oauth';

export const googleAuth = passport.authenticate('google', {
    scope: ['profile', 'email']
});

export const googleAuthCallback = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', { failureRedirect: '/' }, (err, user) => {
        if (err || !user) {
            return res.redirect("/login?error=Authentication failed");
        }

        req.logIn(user, (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }
            return res.redirect('http://localhost:8080/');
        });
    })(req, res, next);
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        return res.redirect('http://localhost:8080/login');
    }
    next();
}
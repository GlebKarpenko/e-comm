import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import config from '@app/config/config'

passport.use(
    new Strategy(
        {
            clientID: config.oauth.clientID,
            clientSecret: config.oauth.clientSecret,
            callbackURL: config.oauth.google.callbackUrl
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
})

export default passport;
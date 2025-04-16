import { Router } from "express";
import { googleAuth, googleAuthCallback, isAuthenticated } from "@app/middlewares";
import { getProfile, logout } from "@app/controllers/auth";

export default (router: Router): void => {
    router.get("/auth/google", googleAuth);
    router.get("/auth/google/callback", googleAuthCallback);
    router.get("/auth/logout", logout);
    router.get("/auth/profile", getProfile);
};
import { passport } from "../../auth";
import { Router } from "express";
export const facebook = Router();

facebook.get("/",passport.authenticate("facebook"));
    
facebook.get("/callback",passport.authenticate("facebook"), 
    (req, res) => {
        res.redirect('/');
    }
);
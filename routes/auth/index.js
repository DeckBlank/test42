import { passport } from "../../auth";
import { Router } from "express";
export const local = Router();
local.post("/login",passport.authenticate("login"), 
    (req, res) => {
      res.json(req.user.nombre);
    }
);

local.post("/register",passport.authenticate("register"), 
  (req, res) => {
    res.json(req.user.nombre);
  }
);

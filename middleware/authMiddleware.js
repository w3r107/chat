import express from "express";
import JWT from "jsonwebtoken";
export const requireSign = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = JWT.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).send({
      success: "false",
      msg: "error in requireSigninMiddleware",
      error,
    });
    console.log(error);
  }
};

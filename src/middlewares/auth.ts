import { Response } from "express";
import { verifyToken } from "../utils/jwt";

export async function isAuthenticated(req: any, res: any, next: any) {
  try {
    let tokenString = req.headers.authorization;

    if (!tokenString) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    if (typeof tokenString === "string" && tokenString.startsWith("Bearer ")) {
      tokenString = tokenString.split(" ")[1];
    }

    const decoded = await verifyToken(tokenString);

    req._id = decoded?.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}

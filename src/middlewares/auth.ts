import { Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
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

    const payload =
      typeof decoded === "string" ? undefined : (decoded as JwtPayload);

    req._id = (payload as any)?.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}

import { Request, Response } from "express";
import { registerUser, loginUser, refreshAccessToken, logoutUser, getUserProfile, changePassword } from "../services/authService";
import { AuthRequest } from "../middleware/authMiddleware";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};

    const user = await registerUser(email, password);

    res.status(201).json({
      message: "User created",
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (error: any) {
    res.status(400).json({
      error: error.message
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};

    const tokens = await loginUser(email, password);

    res.json({
      message: "Login successful",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });

  } catch (error: any) {
    res.status(401).json({
      error: error.message
    });
  }
};

export const profile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await getUserProfile(req.userId!);

    res.json({
      user
    });

  } catch (error: any) {
    res.status(404).json({
      error: error.message
    });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const token = await refreshAccessToken(refreshToken);

    res.json(token);

  } catch (error: any) {
    res.status(401).json({
      error: error.message
    });
  }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;

        const result = await logoutUser(refreshToken);

        res.json(result);

    } catch (error: any) {
        res.status(400).json({
            error: error.message
        });
    }
};

export const updatePassword = async (req: AuthRequest, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const result = await changePassword(
            req.userId!,
            currentPassword,
            newPassword
        );

        res.json(result);

    } catch (error: any) {
        res.status(400).json({
            error: error.message
        });
    }
};
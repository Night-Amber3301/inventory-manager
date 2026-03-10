import { hash } from "node:crypto";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import prisma from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (email: string, password: string) => {
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    });

    return user;
};

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if(!user){
        throw new Error("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.password);

    if(!valid){
        throw new Error("Invalid credentials");
    }

    //debugging
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id
        }
    });

    return {accessToken, refreshToken};
};

export const refreshAccessToken = async (refreshToken: string) => {
    const storedToken = await prisma.refreshToken.findUnique({
        where: {token: refreshToken}
    });

    if(!storedToken) {
        throw new Error("Invalid refresh token");
    }

    const decoded: any = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET as string
    );

    const accessToken = generateAccessToken(decoded.userId);

    return { accessToken };
};

export const logoutUser = async (refreshToken: string) => {
    const storedToken = await prisma.refreshToken.findUnique({
        where: {token: refreshToken}
    });

    if(!storedToken) {
        throw new Error("Invalid refresh token");
    }

    await prisma.refreshToken.delete({
        where: { token: refreshToken}
    });

    return { message: "Logged out successfully"};
};

export const getUserProfile = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            createdAt: true
        }
    });

    if(!user) {
        throw new Error("User not found");
    }

    return user;
};

export const changePassword = async (
    userId: string,
    currentPassword: string,
    newPassword: string
) => {
    
    const user = await prisma.user.findUnique({
        where: { id: userId}
    });

    if(!user) {
        throw new Error("User not found");
    }

    const valid = await bcrypt.compare(currentPassword, user.password);

    if(!valid) {
        throw new Error("Current password is incorrect");
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { id: userId },
        data: {
            password: hashedPassword
        }
    });

    return { message: "Password updated successfully" };
};
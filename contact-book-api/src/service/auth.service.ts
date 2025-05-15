import { PrismaClient } from "@prisma/client";
import { IUser } from "../interface/registerNewUser";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import ErrorCodeEnum from "../enum/errorCodeEnum";
import { generateNewError } from "../helper/errorCodeHelper";

const prisma = new PrismaClient();

export const registerUserService = async (userData: IUser) => {
    const hashedPassword = await hash(userData.password, 10);
    const user = await prisma.user.create({
        data: {
            fullName: userData.fullName,
            email: userData.email,
            password: hashedPassword,
            lastLoginTime: new Date(),
            image: userData.image ?? "default-profile.png",
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: "system",
            updatedBy: "system",
        },
    });
    const token = sign(
        { id: user.id, email: user.email, fullName: user.fullName },
        process.env.JWT_SECRET || "default",
        { expiresIn: "1w" }
    );

    return { ...user, token, password: undefined };
};

export const loginUserService = async (userData: IUser) => {
    const user = await prisma.user.findUnique({
        where: { email: userData.email },
    });
    if (!user) {
       throw generateNewError(ErrorCodeEnum.UserNotFound, "User not found", "email");
    }
    const isPasswordValid = await compare(userData.password, user.password);
    if (!isPasswordValid) {
        throw generateNewError(ErrorCodeEnum.InvalidPassword, "Invalid password", "password");
    }
    const token = sign(
        { id: user.id, email: user.email, fullName: user.fullName },
        process.env.JWT_SECRET || "default",
        { expiresIn: "1w" }
    );
    return { ...user, token, password: undefined };
};
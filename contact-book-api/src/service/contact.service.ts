import { PrismaClient } from "@prisma/client";
import { generateNewError } from "../helper/prismaHelper";
import ErrorCodeEnum from "../enum/errorCodeEnum";
import { IContact } from "../interface/contact";

const prisma = new PrismaClient();

export const getAllContactsService = async (userId: number) => {
    return await prisma.contact.findMany({
        where: {
            userId: userId,
        },
    });
};

export const upsertContactService = async (userId: number, operator: string, contactData: IContact) => {
    const { 
        id, 
        firstName, 
        lastName, 
        email, 
        phoneNumber, 
        address, 
        city, 
        state, 
        zipCode, 
        country, 
        image 
    } = contactData;

    if (id) {
        const existingContact = await prisma.contact.findFirst({
            where: {
                id: id,
                userId: userId,
            },
        });

        if (!existingContact) {
            throw generateNewError(ErrorCodeEnum.ContactNotFound, "Contact not found", "id");
        }
    }

    return await prisma.contact.upsert({
        where: {
            id: id || 0,
        },
        update: {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            city,
            state,
            zipCode,
            country,
            image,
            updatedAt: new Date(),
            updatedBy: operator,
        },
        create: {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            city,
            state,
            zipCode,
            country,
            image,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: operator,
            updatedBy: operator,
            userId: userId,
        },
    });
};

export const deleteContactService = async (userId: number, contactId: number) => {
    const contact = await prisma.contact.findFirst({
        where: {
            id: contactId,
            userId: userId,
        },
    });

    if (!contact) {
        throw generateNewError(ErrorCodeEnum.ContactNotFound, "Contact not found", "id");
    }

    await prisma.contact.delete({
        where: {
            id: contactId,
        },
    });
};
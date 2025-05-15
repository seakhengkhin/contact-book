import { Request, Response } from "express";
import { getAllContactsService, upsertContactService, deleteContactService } from "../service/contact.service";
import { handleError } from "../utility/handleError";
import ErrorCodeEnum from "../enum/errorCodeEnum";

const getAllContacts = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const contacts = await getAllContactsService(userId);
        res.status(200).json({
            data: contacts,
            errorCode: ErrorCodeEnum.Success,
            message: "Success",
        });
    } catch (error) {
        res.status(200).json(handleError(error));
    }
};

const upsertContact = async (req: Request, res: Response) => {
    try {
        const { id: userId, email: operator } = req.user;
        const contactData = req.body;
        if (req.file) {
            contactData.image = `/uploads/${req.file.filename}`;
        }
        const contact = await upsertContactService(userId, operator, contactData);
        res.status(200).json({
            data: contact,
            errorCode: ErrorCodeEnum.Success,
            message: "Success",
        });
    } catch (error) {
        res.status(200).json(handleError(error));
    }
};

const deleteContact = async (req: Request, res: Response) => {
    try {
        const { id: userId } = req.user;
        const { id } = req.params;
        await deleteContactService(userId, parseInt(id));
        res.status(200).json({
            data: {},
            errorCode: ErrorCodeEnum.Success,
            message: "Contact deleted successfully",
        });
    } catch (error) {
        res.status(200).json(handleError(error));
    }
};

export {
    getAllContacts,
    upsertContact,
    deleteContact
};
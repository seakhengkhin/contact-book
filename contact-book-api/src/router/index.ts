var cors = require('cors')
import { NextFunction, Request, Response } from "express";
import { registerNewUser, loginUser } from "../controller/auth.controller";
import { getAllContacts, upsertContact, deleteContact } from "../controller/contact.controller";
import { uploadFile } from "../controller/uploadFile.controller";
import authMiddleware from "../middleware/auth";
import { uploadMiddleware } from "../middleware/file";


const router = (app: any) => {
    var corsOptions = {
        origin: ['http://localhost:5173']
    };
    app.use(cors(corsOptions));
    app.get("/", (req: Request, res: Response, next: NextFunction) => {
        res.json({data: {}, errorCode: 0, message: 'welcome to contact book api'});
    });
    app.post("/api/register", registerNewUser);
    app.post("/api/login", loginUser);
    app.get("/api/get-all-contacts", authMiddleware, getAllContacts);
    app.post("/api/upsert-contact", authMiddleware, upsertContact);
    app.delete("/api/delete-contact/:id", authMiddleware, deleteContact);
    app.post("/api/upload-file", uploadMiddleware, uploadFile);
}
export default router;
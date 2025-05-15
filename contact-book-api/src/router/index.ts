var cors = require('cors')
import { registerNewUser, loginUser } from "../controller/auth.controller";
import { getAllContacts, upsertContact, deleteContact } from "../controller/contact.controller";
import { uploadFile } from "../controller/uploadFile.controller";
import authMiddleware from "../middleware/auth";
import { uploadMiddleware } from "../middleware/file";


const router = (app: any) => {
    var corsOptions = {
        origin: '*',
    };
    app.use(cors(corsOptions));
    app.get("/", (_: any, res: any, __: any) => {
        res.json({Data: {}, errorCode: 0, message: 'welcome to contact book api'});
    });
    app.post("/api/register", registerNewUser);
    app.post("/api/login", loginUser);
    app.get("/api/get-all-contacts", authMiddleware, getAllContacts);
    app.post("/api/upsert-contact", authMiddleware, upsertContact);
    app.delete("/api/delete-contact/:id", authMiddleware, deleteContact);
    app.post("/api/upload-file", uploadMiddleware, uploadFile);
}
export default router;
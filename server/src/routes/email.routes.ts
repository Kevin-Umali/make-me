import express from "express";
import zodValidateMiddleware from "../middleware/schema-validate";
import { authenticateEmailToken } from "../middleware/authenticate-token";
import { subscribeEmail, unsubscribeEmail } from "../controllers/email.controller";
import { SubscribeEmailSchema, UnsubscribeEmailQuerySchema } from "../schema/email.schema";

const router = express.Router();

router.get("/unsubscribe", authenticateEmailToken, zodValidateMiddleware({ query: UnsubscribeEmailQuerySchema }), unsubscribeEmail);
router.post("/subscribe", zodValidateMiddleware({ body: SubscribeEmailSchema }), subscribeEmail);

export default router;

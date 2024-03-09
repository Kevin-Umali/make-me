import { PrismaClient } from "@prisma/client";
import { Response, NextFunction } from "express";
import { sendError, sendSuccess } from "../utils/response-template";
import { BodyRequest, QueryRequest } from "../middleware/schema-validate";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { SubscribeEmailRequest, UnsubscribeEmailQueryRequest } from "../schema/email.schema";

export const unsubscribeEmail = async (req: QueryRequest<UnsubscribeEmailQueryRequest>, res: Response, next: NextFunction) => {
  try {
    if (!req?.email?.email || !req?.email?.id || req?.email?.email !== req.query.email) {
      return sendError(res, "Unauthorized or invalid token.", 401);
    }

    const { id } = req.email;

    const prisma: PrismaClient = req.app.get("prisma");

    const updatedSubscription = await prisma.emailSubscription.update({
      where: {
        id: id,
        unsubscribe: false,
      },
      data: {
        unsubscribe: true,
      },
    });

    return res.send(`Subscription "${updatedSubscription.address}" has been successfully unsubscribed.`);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      return res.send("Subscription not found.");
    }

    next(error);
  }
};

export const subscribeEmail = async (req: BodyRequest<SubscribeEmailRequest>, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    const prisma: PrismaClient = req.app.get("prisma");

    const createSubscription = await prisma.emailSubscription.create({
      data: {
        address: email,
        unsubscribe: false,
      },
    });

    return sendSuccess(res, { message: `Subscription "${createSubscription.address}" has been successfully created.` }, 201);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
      return sendError(res, "Email already subscribed.", 400);
    } else {
      next(error);
    }
  }
};

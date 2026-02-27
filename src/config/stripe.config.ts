import stripe from "stripe";
import { envConfig } from "./env";

export const stripeClient = new stripe(envConfig.STRIPE_SECRET_KEY)
import Stripe from "stripe";

/**
 * This file is kind of silly and I forget that it is even here but you can import
 * this to make a new Stripe object if you want I guess
 */

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

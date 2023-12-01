// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('SECRET_KEY');

const createPaymentIntent = async (amount, currency) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_method: {
        enabled: true,
      },
    });

    return paymentIntent;
  } catch (error) {
    // Handle errors appropriately
    console.error('Error creating PaymentIntent:', error);
    throw error;
  }
};

module.exports = {
  createPaymentIntent,
};
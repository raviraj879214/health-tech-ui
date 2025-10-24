import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

export async function POST(req) {
  try {
    const { email, priceId } = await req.json();

    // Create a customer
    const customer = await stripe.customers.create({ email });

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: 'subscription',
      line_items: [
        { price: priceId, quantity: 1 },
      ],
      allow_promotion_codes: true,
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

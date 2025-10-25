'use client';

export default function SubscribeButton() {

    
  const handleSubscribe = async () => {
    const res = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'customer@example.com', priceId: 'price_1S0HJWGdOIhoJtRKuoHTa3Lz' }),
    });

    const data = await res.json();
    if (data.url) {
      // Redirect user to Stripe Checkout
      window.location.href = data.url;
    } else {
      console.error(data.error);
    }
  };

  return <button onClick={handleSubscribe}>Subscribe</button>;
}

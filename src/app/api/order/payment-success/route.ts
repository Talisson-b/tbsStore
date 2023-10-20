import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export const POST = async (req: Request) => {
  const signature = req.headers.get('stripe-signature')!

  const text = await req.text()

  if (!signature) {
    return NextResponse.error()
  }

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET_KEY!
  )

  if (event.type === 'checkout.session.completed') {
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ["line_items"]
      }
    )
    const lineItems = sessionWithLineItems.line_items

    // CRIAR PEDIDO
  }
  return NextResponse.json({ received: true })
}
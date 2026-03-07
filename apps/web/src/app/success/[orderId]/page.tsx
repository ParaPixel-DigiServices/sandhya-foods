export const dynamic = 'force-static'
export default function SuccessPage() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center px-6">
      <div>
        <div className="text-6xl mb-6">✓</div>
        <h1 className="font-royal text-4xl mb-4">Payment Successful!</h1>
        <p className="opacity-70 mb-8">
          Your payment has been received and your order has been confirmed.
          <br />
          We will process your order shortly.
        </p>
        <a
          href="/"
          className="inline-block py-4 px-10 rounded-full bg-[radial-gradient(circle_at_top,#FFE39B,#D4AF37)] uppercase tracking-widest text-xs font-semibold"
        >
          Continue Shopping
        </a>
      </div>
    </section>
  )
}

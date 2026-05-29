export default function AccountPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <section className="max-w-4xl mx-auto">
        <p className="uppercase tracking-[0.3em] text-sm text-neutral-400 mb-6">
          Member Account
        </p>

        <h1 className="text-5xl md:text-7xl font-extralight leading-tight mb-8">
          Manage your BANGERS membership.
        </h1>

        <p className="text-neutral-400 text-xl leading-relaxed mb-10">
          This is the starter account page. In production, this should connect to authentication, then open the Stripe Customer Portal for the matching Stripe customer.
        </p>

        <div className="bg-neutral-950 border border-white/10 rounded-[2rem] p-8">
          <h2 className="text-3xl font-extralight mb-4">Next production step</h2>
          <p className="text-neutral-400 leading-relaxed">
            Add Supabase authentication so customers can securely manage billing, cancellations, address changes, and payment methods through the Stripe Customer Portal.
          </p>
        </div>
      </section>
    </main>
  );
}

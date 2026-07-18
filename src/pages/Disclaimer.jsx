export default function Disclaimer() {
  return (
    <div className="min-h-screen pt-32 pb-12 px-4 bg-[var(--color-background)] font-[var(--font-body)] text-[var(--color-text-main)]">
      <div className="max-w-4xl mx-auto glass p-12 rounded-2xl soft-shadow">
        <h1 className="text-4xl font-[var(--font-heading)] text-[var(--color-primary)] mb-8">Disclaimer & Terms</h1>
        <div className="space-y-6 text-gray-700">
          <p>The information provided on this website is for general informational and educational purposes only and does not constitute professional financial advice.</p>
          <h2 className="text-2xl font-[var(--font-heading)] text-[var(--color-primary)] mt-8">Mutual Funds</h2>
          <p>Mutual Fund investments are subject to market risks, read all scheme related documents carefully. The NAVs of the schemes may go up or down depending upon the factors and forces affecting the securities market.</p>
          <h2 className="text-2xl font-[var(--font-heading)] text-[var(--color-primary)] mt-8">Insurance</h2>
          <p>Insurance is the subject matter of solicitation. For more details on risk factors, terms, and conditions, please read the sales brochure carefully before concluding a sale.</p>
          <h2 className="text-2xl font-[var(--font-heading)] text-[var(--color-primary)] mt-8">No Guarantee</h2>
          <p>Past performance of any financial product is not a reliable indicator of future results. We do not guarantee any specific outcomes or returns on investments.</p>
        </div>
      </div>
    </div>
  );
}

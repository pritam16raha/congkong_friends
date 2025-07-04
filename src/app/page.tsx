import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <header className="p-4 border-b">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">CONGKONG</h1>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Unlock Insights, Drive Growth.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Welcome to the Real-Time KPI Dashboard. Monitor your event's
            performance, track matches, and gain valuable insights instantly.
          </p>
          <div className="mt-8">
            <Link
              href="/dashboard"
              className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </main>

      <footer className="p-4 border-t">
        <div className="container mx-auto text-center text-gray-500">
          <p>&copy; 2025 Congkong Friends. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link to="/">
            <img
              src="/Assests/WHY_logo.png"
              alt="WHY logo"
              className="h-14 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            />
          </Link>

          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-black transition"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 md:px-16 py-12 md:py-16">
        <h2 className="text-4xl font-bold mb-10">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div>
            <h3 className="text-xl font-semibold mb-4">OFFICE ADDRESS</h3>

            <p className="text-gray-700 leading-relaxed text-lg">
              Ground Floor, 14/1,
              <br />
              Balajikrupa 2nd Main Road,
              <br />
              Seshadripuram,
              <br />
               Bengaluru  North,
              <br />
               Bengaluru  – 560020,
              <br />
              Karnataka
            </p>

            <a
              href="https://www.google.com/maps?q=Ground%20Floor,%2014/1,%20Balajikrupa%202nd%20Main%20Road,%20Seshadripuram,%20Bangalore%20560020"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Get Directions
            </a>
          </div>

          <div className="w-full h-[320px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Ground%20Floor,%2014/1,%20Balajikrupa%202nd%20Main%20Road,%20Seshadripuram,%20Bangalore%20560020&output=embed"
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
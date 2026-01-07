"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-white py-8 border-t-2 border-gray-100 text-center">
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-bold text-gray-400">
          © {new Date().getFullYear()} Nida.
        </p>
        <p className="text-xs text-gray-300 font-medium">
          Built with Next.js, Tailwind & a lot of matcha.
        </p>
      </div>
    </footer>
  );
}
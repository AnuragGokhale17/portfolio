import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-red px-gutter text-black">
      <div>
        <p className="tag">404</p>
        <h1 className="mega mt-4 text-white">Not shipped<span className="text-black">.</span></h1>
        <p className="lede mt-6 max-w-[40ch] !text-black">This page doesn’t exist. The work does.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-black px-7 py-3.5 text-[1rem] font-extrabold text-white">
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}

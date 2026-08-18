import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[hsl(var(--background))] h-auto ">
      <div className="flex min-h-screen flex-col h-full gap-4 py-10">
        <div className="flex justify-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 med-livvic bg-[hsl(var(--accent))] px-3 py-2 rounded-[14px]"
          >
            <div className="bg-primary  flex size-6 items-center justify-center rounded-md">
              <img className="w-full h-full" alt="Store logo" src="/ali.png" />
            </div>
            Skiilink Ventures
          </Link>
        </div>

        <div className="flex h-full flex-1 items-center justify-center">
          <div className="w-full max-w-xl h-fit px-5 dark:text-white text-black">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
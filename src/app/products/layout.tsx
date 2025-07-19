
import type { Metadata } from 'next'
export const metadata :Metadata= {
    title: 'Products | SKIILINK VENTURES',
    description:'SKIILINK VENTURES LIMITED',
}
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
    return (
        <div>
            {children}
        </div>
    );
}

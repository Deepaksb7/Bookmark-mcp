import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton, SignUpButton } from "@clerk/nextjs";
import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <header className="header">
          <div>
            <h1 className="text-2xl font-bold">Bookmark MCP</h1>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton>
                <button className="btn btn-primary">Sign In</button>
              </SignInButton>
              <SignUpButton>
                <button className="btn btn-primary">Sign Up</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <main className="main">
          {children}
        </main>
      </body>
    </html>
    </ClerkProvider>
  );
}

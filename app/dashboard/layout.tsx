export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">{children}</div>
  );
}

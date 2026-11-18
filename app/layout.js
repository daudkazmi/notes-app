export const metadata = { title: "Notes wall", description: "A tiny full-stack app" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#f6f4ef", color: "#1d2b2a", fontFamily: "Georgia, 'Times New Roman', serif" }}>
        {children}
      </body>
    </html>
  );
}

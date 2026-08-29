/**
 * Pass-through root. `<html>` and `<body>` live in `app/[locale]/layout.tsx`
 * so the `lang` attribute can reflect the active locale.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

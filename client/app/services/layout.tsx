// app/services/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wig Care Services | JifyWigs',
  description: 'Professional wig washing, coloring, revamping, and repair services in Lagos. Bring your wig back to life!',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
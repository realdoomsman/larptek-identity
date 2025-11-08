import { Inter, Space_Mono } from 'next/font/google';
import { FC, ReactNode } from 'react';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  display: 'swap',
});

export const FontProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={`${inter.variable} ${spaceMono.variable} font-sans`}>
      {children}
    </div>
  );
};

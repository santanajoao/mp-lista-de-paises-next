import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import Header from '@/components/Header';

const nunitoSans = Nunito_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Lista de países',
};

export default function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {
	return (
		<html lang="pt-br">
			<body className={`${nunitoSans.className} text-gray-800 bg-gray-100 min-h-screen flex flex-col`}>
				<Header />

				<div className="m-auto w-full max-w-[1366px] px-2 sm:px-6 flex-1 flex flex-col">
         	{children}
				</div>
			</body>
		</html>
	);
}

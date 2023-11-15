import Image from 'next/image';

export default function Header() {
	return (
		<header className="bg-white">
			<div className="m-auto max-w-[1366px] flex items-center p-2 sm:py-3 sm:px-6">
				<Image
					height={40}
					width={40}
					className="h-10 w-10 mr-2"
					src="/world-logo.svg"
					alt="Logo da página. Representação simplificada do globo terrestre."
				/>

				<span className="text-2xl font-bold">Países do mundo</span>
			</div>
		</header>
	);
}

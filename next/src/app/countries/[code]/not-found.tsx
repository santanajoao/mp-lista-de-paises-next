import Image from 'next/image';
import Link from 'next/link';
import worldLogo from 'public/world-logo.svg';

export default function NotFoundPage() {
	return (
		<article className="text-center flex-1 flex flex-col items-center justify-center">
			<Image
				src={worldLogo}
				alt="Representação simplificada do globo terrestre."
			/>

			<h1 className="text-4xl font-bold">País não encontrado</h1>
			<h2 className="text-3xl font-bold">4040</h2>

			<Link href="/">Voltar</Link>
		</article>
	);
}

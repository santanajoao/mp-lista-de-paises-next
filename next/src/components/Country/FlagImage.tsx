import Image from 'next/image';

type Props = {
  alt: string;
  src: string;
  className?: string;
}

export default function FlagImage({ className = '', alt, ...props }: Props) {
	return (
		<Image
			className={`aspect-video rounded-xl object-cover border ${className}`}
			{...props}
			alt={alt}
			height={200}
			width={300}
		/>
	);
}

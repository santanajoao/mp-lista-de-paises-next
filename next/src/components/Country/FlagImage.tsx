import Image, { ImageProps } from 'next/image';

type Props = ImageProps;

export default function FlagImage({ className = '', alt, ...props }: Props) {
	return (
		<Image
			className={`rounded-xl aspect-video object-cover border ${className}`}
			width={600}
			height={300}
			{...props}
			alt={alt}
		/>
	);
}

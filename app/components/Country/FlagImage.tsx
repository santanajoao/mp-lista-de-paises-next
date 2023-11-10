import type { ComponentProps } from "react"

type Props = ComponentProps<'img'> & {

}

export default function FlagImage({ className, alt, ...props }: Props) {
  return (
    <img
      loading="lazy"
      decoding="async"
      className={`aspect-video rounded-xl object-cover border ${className}`}
      alt={alt}
      {...props}
    />
  );
}

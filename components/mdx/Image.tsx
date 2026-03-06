import NextImage, { ImageProps } from "next/image";

interface CustomImageProps extends ImageProps {
    caption?: string;
}

export function Image({ caption, alt, ...props }: CustomImageProps) {
    return (
        <figure className="my-10 space-y-3">
            <div className="overflow-hidden rounded-xl border border-primary/10">
                <NextImage
                    {...props}
                    alt={alt}
                    className="h-auto w-full transition-transform hover:scale-[1.02] duration-500"
                />
            </div>
            {caption && (
                <figcaption className="text-center text-sm text-tertiary px-4 leading-relaxed italic">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

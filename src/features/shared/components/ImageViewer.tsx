import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

type ImageViewerProps = {
  src: string;
  alt: string;
};

export default function ImageViewer({ src, alt }: ImageViewerProps) {
  return (
    <div className="image-viewer">
      <TransformWrapper minScale={0.2} centerZoomedOut centerOnInit>
        <TransformComponent>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} />
        </TransformComponent>
      </TransformWrapper>
      <style jsx>{`
        .image-viewer {
          overflow: hidden;
        }
        .image-viewer :global(.react-transform-wrapper) {
          width: 600px;
          height: 600px;
          margin: auto;
        }
      `}</style>
    </div>
  );
}

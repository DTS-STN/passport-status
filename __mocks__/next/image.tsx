interface NextImageMockProps {
  alt?: string;
  height?: string | number;
  src?: string;
  width?: string | number;
}

const NextImageMock = ({ alt, height, src, width }: NextImageMockProps) => (
  // biome-ignore lint/performance/noImgElement: mocked image
  <img alt={alt} height={height} src={src} width={width} />
);

export default NextImageMock;

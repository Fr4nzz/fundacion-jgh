interface Reference {
  url: string;
  [key: string]: unknown;
}

interface TextWithRefsProps {
  text: string;
  references: Reference[];
}

export default function TextWithRefs({ text, references }: TextWithRefsProps) {
  const parts = text.split(/(\[\d+\])/g);

  if (parts.length === 1) return <>{text}</>;

  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[(\d+)\]$/);
        if (!match) return <span key={i}>{part}</span>;

        const refIndex = parseInt(match[1], 10) - 1;
        const ref = references[refIndex];

        if (!ref) return <span key={i}>{part}</span>;

        return (
          <sup key={i} className="ml-0.5">
            <a
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.65em] text-secondary hover:underline cursor-pointer"
            >
              [{match[1]}]
            </a>
          </sup>
        );
      })}
    </>
  );
}

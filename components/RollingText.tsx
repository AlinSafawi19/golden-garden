type Props = {
  children: string;
  stagger?: number;
  lineHeight?: string;
};

export default function RollingText({ children, stagger = 0.02, lineHeight = "1.6em" }: Props) {
  return (
    <span className="inline-flex" aria-label={children}>
      {children.split("").map((char, i) => (
        <span
          key={i}
          className="inline-flex flex-col overflow-hidden"
          style={{ height: lineHeight }}
          aria-hidden="true"
        >
          <span
            className="rolling-char"
            style={{ transitionDelay: `${i * stagger}s` }}
          >
            {char === " " ? " " : char}
          </span>
          <span
            className="rolling-char"
            style={{ transitionDelay: `${i * stagger}s` }}
          >
            {char === " " ? " " : char}
          </span>
        </span>
      ))}
    </span>
  );
}

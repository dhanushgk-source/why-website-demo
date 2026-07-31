export default function PulseLine({ color = "var(--brass)", opacity = 0.9, big = false }) {
  return (
    <svg
      className="pulse-line"
      viewBox={big ? "0 0 600 60" : "0 0 300 22"}
      preserveAspectRatio="none"
      style={{ height: big ? 60 : 22, opacity }}
    >
      <path
        d={
          big
            ? "M0 30 L120 30 L145 8 L170 52 L195 18 L215 30 L600 30"
            : "M0 11 L60 11 L73 3 L86 19 L99 7 L110 11 L300 11"
        }
        stroke={color}
      />
    </svg>
  );
}

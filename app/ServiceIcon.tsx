type ServiceIconProps = {
  name: "landing" | "booking" | "response" | "automation";
};

const paths = {
  landing: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M4 9h16" />
      <path d="m9 15 2-2 2 2 3-3" />
    </>
  ),
  booking: (
    <>
      <rect x="4" y="6" width="16" height="14" rx="2" />
      <path d="M8 3v6M16 3v6M4 10h16" />
      <path d="m9 15 2 2 4-4" />
    </>
  ),
  response: (
    <>
      <path d="M5 5h14v10H9l-4 4V5Z" />
      <path d="M9 9h6M9 12h4" />
      <path d="m16 4 1-2 1 2 2 1-2 1-1 2-1-2-2-1 2-1Z" />
    </>
  ),
  automation: (
    <>
      <path d="M8 7h8M8 17h8" />
      <circle cx="6" cy="7" r="2" />
      <circle cx="18" cy="17" r="2" />
      <path d="M16 7a4 4 0 0 1 0 8H8a4 4 0 0 0 0 8" />
    </>
  ),
};

export default function ServiceIcon({ name }: ServiceIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

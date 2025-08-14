import Image from "next/image";

export default function DPlusLogo() {
  return (
    <Image
      src="/assets/dplus.svg"
      alt="Logo D+ Ideias"
      width={40}
      height={40}
      priority
    />
  );
}

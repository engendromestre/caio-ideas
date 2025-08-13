import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Bem-vindo 👋</h1>
      <Link href="/ideas">Ver ideias</Link>
    </main>
  );
}
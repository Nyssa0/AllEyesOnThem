import styles from "./page.module.scss";
import dynamic from "next/dynamic";
import Articles from "@/app/components/articles";
import Link from "next/link";

// Charge le composant dynamiquement avec SSR désactivé
const Globe = dynamic(() => import("@/app/components/Globe"), { ssr: false });

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.globe}>
        <Globe />
        <Link href="#articles">test</Link>
      </section>
      <Articles/>

    </main>
  );
}
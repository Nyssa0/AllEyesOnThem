import styles from "./page.module.scss";
import dynamic from "next/dynamic";
import Articles from "@/app/components/articles";

// Charge le composant dynamiquement avec SSR désactivé
const Globe = dynamic(() => import("@/app/components/Globe"), { ssr: false });

export default function Home() {
  return (
    <main className={`${styles.main} page page--1 transition-reveal`} id="swup">
      <section className={styles.globe}>
        <Globe />
      </section>
      <Articles/>

    </main>
  );
}
'use client';
import styles from "./page.module.css";
<<<<<<< Updated upstream
import Articles from "@/app/pages/articles";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Articles>
        </Articles>

        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.js</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
=======
import dynamic from "next/dynamic";

// Charge le composant dynamiquement avec SSR désactivé
const Globe = dynamic(() => import("@/app/components/Globe"), { ssr: false });

export default function Home() {
>>>>>>> Stashed changes

    return (
        <main className={styles.main}>
            <Globe />
        </main>
    );
}
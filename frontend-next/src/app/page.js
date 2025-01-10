import styles from "./page.module.scss";
import dynamic from "next/dynamic";
import Articles from "@/app/components/articles";
import Link from "next/link";

// Charge le composant dynamiquement avec SSR désactivé
const Globe = dynamic(() => import("@/app/components/Globe"), { ssr: false });

export default function Home() {
  return (
    <main className={`${styles.main} page page--1 transition-reveal`} id="swup">
      <section className={styles.globe}>
        <Globe />
          <Link className={styles.anchor} href="#articles">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.6315L20.9679 10.8838L20.0321 9.11619L12 13.3685L3.9679 9.11619L3.03212 10.8838L12 15.6315Z"></path></svg>
          </Link>
      </section>
      <Articles/>
    </main>
  );
}
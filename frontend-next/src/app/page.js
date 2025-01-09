import Image from "next/image";
import styles from "./page.module.scss";
import Articles from "@/app/components/articles";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.globe}>
        <Link href="#articles">test</Link>
      </section>
      <Articles/>

    </main>
  );
}

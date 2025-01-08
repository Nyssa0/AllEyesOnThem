'use client';
import styles from "./page.module.css";
import dynamic from "next/dynamic";

// Charge le composant dynamiquement avec SSR désactivé
const Globe = dynamic(() => import("@/app/components/Globe"), { ssr: false });

export default function Home() {

    return (
        <main className={styles.main}>
            <Globe />
        </main>
    );
}
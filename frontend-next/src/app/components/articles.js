import styles from "../style/components/articles.module.scss";
import qs from "qs";
import ArticleTeaser from "@/app/components/articleTeaser";

async function getArticles() {
    const baseUrl = "http://localhost:1337";
    const path = "/api/articles";

    const url = new URL(path, baseUrl);

    url.search = qs.stringify({
        populate: {
            image_mobile: {
                fields: ["alternativeText", "url"],
            },
            image_desktop: {
                fields: ["alternativeText", "url"],
            },
        },
    });

    const res = await fetch(url);

    if (!res.ok) throw new Error("Failed to fetch articles");

    const data = await res.json();

    return data;
}

export default async function Articles() {
    const strapiData = await getArticles();
    const articles = strapiData.data;

    return (
        <section id="articles">
            <ul className={styles.articles}>
                {articles && articles.map((article) => (
                    <ArticleTeaser article={article} />
                ))}
            </ul>
        </section>
    );
}
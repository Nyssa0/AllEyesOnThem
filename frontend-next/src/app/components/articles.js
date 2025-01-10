import styles from "../style/components/articles.module.scss";
import Article from "@/app/components/articleTeaser";

async function getStrapiData(url) {
    const baseUrl = "http://localhost:1337/";
    try {
        const response = await fetch(baseUrl + url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export default async function Articles() {
    const strapiData = await getStrapiData("api/articles?populate=image_mobile&populate=image_desktop");
    const articles = strapiData.data;

    return (
        <section id="articles">
            <ul className={styles.articles}>
                {articles && articles.map((article) => (
                    <Article article={article} />
                ))}
            </ul>
        </section>
    );
}
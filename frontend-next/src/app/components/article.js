import styles from "../style/components/article.module.scss";
import globals from "../globals.scss";
import Image from "next/image";

const Article = ({ article }) => {
    console.log('article', article)
    const baseUrl = "http://localhost:1337";
    const imageMobileUrl = baseUrl + article.image_mobile.url
    const imageDesktopUrl = baseUrl + article.image_desktop.url

    return (
        <li key={article.id} className={styles.article}>
            <Image
                className={`${styles.image} mobile`}
                src={imageMobileUrl}
                alt={article.image_mobile.alternativeText}
                width={100}
                height={100}
                priority
            />

            <Image
                className={`${styles.image} desktop`}
                src={imageDesktopUrl}
                alt={article.image_desktop.alternativeText}
                width={100}
                height={100}
                priority
            />
            <h2>{article.title}</h2>
            <p>{article.location}</p>
            <p>{article.content}</p>
        </li>
    );
};

export default Article;
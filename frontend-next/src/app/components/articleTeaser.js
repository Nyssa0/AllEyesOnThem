import styles from "../style/components/article-teaser.module.scss";
import Link from 'next/link';

const ArticleTeaser = ({ article }) => {
    const baseUrl = "http://localhost:1337";
    const imageMobileUrl = baseUrl + article.image_mobile.url
    const imageDesktopUrl = baseUrl + article.image_desktop.url

    const renderTag = () => {
        console.log('test')
        switch (article.event) {
            case "soon":
                return <span className={`${styles.article__teaser_tag} ${styles.orange}`} aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="8 2 20 20" fill="currentColor"><path d="M19.376 12.4161L8.77735 19.4818C8.54759 19.635 8.23715 19.5729 8.08397 19.3432C8.02922 19.261 8 19.1645 8 19.0658V4.93433C8 4.65818 8.22386 4.43433 8.5 4.43433C8.59871 4.43433 8.69522 4.46355 8.77735 4.5183L19.376 11.584C19.6057 11.7372 19.6678 12.0477 19.5146 12.2774C19.478 12.3323 19.4309 12.3795 19.376 12.4161Z"></path></svg>Prochainement</span>;
            case "now":
                return <span className={`${styles.article__teaser_tag} ${styles.red}`} aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="8 2 20 20" fill="currentColor"><path d="M19.376 12.4161L8.77735 19.4818C8.54759 19.635 8.23715 19.5729 8.08397 19.3432C8.02922 19.261 8 19.1645 8 19.0658V4.93433C8 4.65818 8.22386 4.43433 8.5 4.43433C8.59871 4.43433 8.69522 4.46355 8.77735 4.5183L19.376 11.584C19.6057 11.7372 19.6678 12.0477 19.5146 12.2774C19.478 12.3323 19.4309 12.3795 19.376 12.4161Z"></path></svg>En cours</span>;
            case "none":
            default:
                return null;
        }
    };

    return (
        <li key={article.documentId} className={styles.article__teaser}>
            <div className={`${styles.article__teaser_image} ${styles.image_background} mobile`}>
                <img
                    className={styles.img}
                    src={imageMobileUrl}
                    alt={article.image_mobile.alternativeText}
                />

            </div>

            <div className={`${styles.article__teaser_image} ${styles.image_background} desktop`}>
                <img
                    className={styles.img}
                    src={imageDesktopUrl}
                    alt={article.image_desktop.alternativeText}
                />
            </div>

            <div className={styles.article__teaser_content}>
                {renderTag()}

                <h2 className={styles.article__teaser_title}>{article.title}</h2>
                <p className={styles.article__teaser_location}>
                    <span aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path></svg>
                    </span>
                    {article.location}
                </p>
                <p className={styles.article__teaser_introduction}>{article.introduction}</p>

                <Link className={styles.article__teaser_button} href={`/articles/${article.slug}`} data-swup-animation="gradient">En savoir plus</Link>
            </div>

        </li>
    );
};

export default ArticleTeaser;
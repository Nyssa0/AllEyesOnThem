import "../../style/article.scss";
import qs from "qs";

async function getArticle(slug) {
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
            }
        },
        filters: {
            slug: {
                $eq: slug,
            },
        },
    });

    const res = await fetch(url);

    if (!res.ok) throw new Error("Failed to fetch article");

    const data = await res.json();
    const article = data?.data[0];
    return article;
}

export default async function ArticleDetail({ params }) {
    const { slug } = params;

    if (!slug) {
        return <p>No article found</p>;
    }

    try {
        const article = await getArticle(slug);

        if (!article) {
            return <p>No article found</p>;
        }

        const baseUrl = "http://localhost:1337";
        const imageMobileUrl = baseUrl + article.image_mobile.url;
        const imageDesktopUrl = baseUrl + article.image_desktop.url;

        return (
            <div id="swup" className={`article page page--4 transition-reveal`}>
                <div className="article__hero">
                    <div className="article__hero_image image_background mobile">
                        <img
                            className="article__hero_img"
                            src={imageMobileUrl}
                            alt={article.image_mobile.alternativeText}
                        />
                    </div>

                    <div className="article__hero_image image_background desktop">
                        <img
                            className="article__hero_img"
                            src={imageDesktopUrl}
                            alt={article.image_desktop.alternativeText}
                        />
                    </div>

                    <div className="article__hero_content">
                        <h1 className="article__hero_title">{article.title}</h1>
                        <p className="article__hero_location">
                            <span aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path></svg>
                            </span>
                            {article.location}
                        </p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error(error);
        return <p>Failed to fetch the article.</p>;
    }
}
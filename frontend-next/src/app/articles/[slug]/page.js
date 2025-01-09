'use client';

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
            <div>
                <h1>Article Detail</h1>
                <h2>{article.title}</h2>

                <div className="image-container">
                    {/* Affiche les images */}
                    <img
                        className="img-mobile"
                        src={imageMobileUrl}
                        alt={article.image_mobile.alternativeText}
                    />
                    <img
                        className="img-desktop"
                        src={imageDesktopUrl}
                        alt={article.image_desktop.alternativeText}
                    />
                </div>

                <p>{article.introduction}</p>
                <p>{article.location}</p>
                <pre>{JSON.stringify(article, null, 2)}</pre>
            </div>
        );
    } catch (error) {
        console.error(error);
        return <p>Failed to fetch the article.</p>;
    }
}
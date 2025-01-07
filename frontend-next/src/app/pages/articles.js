async function getStrapiData(url) {
    const baseUrl = "http://localhost:1337/";
    try {
        const response = await fetch(baseUrl + url);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error(error);
    }
}

export default async function Articles() {
    const strapiData = await getStrapiData("api/articles");

    const articles = strapiData.data;
    console.log(articles);

    return (
        <ul>
            {articles && articles.map((article) => (
                <li>{article.title}</li>
            ))}
        </ul>
    );
}
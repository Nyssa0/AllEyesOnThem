// import React from 'react';
//
// const Articles = ({ articles }) => {
//     return (
//         <div>
//             <h1>Articles</h1>
//             <ul>
//                 {articles.map((article) => (
//                     <li key={article.id}>
//                         <h2>{article.title}</h2>
//                         <p>{article.content}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
//
// export async function getStaticProps() {
//     // Récupérer les articles depuis l'API Strapi
//     const res = await fetch('http://localhost:1337/api/articles');
//     const data = await res.json();
//
//     // Retourner les articles comme props
//     return {
//         props: {
//             articles: data.data, // ou data pour un format différent selon la réponse de l'API
//         },
//     };
// }
//
// export default Articles;
//
async function getStrapiData(url) {
    const baseUrl = "http://localhost:1337";
    try {
        const response = await fetch(baseUrl + url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export default async function Articles() {
    const strapiData = await getStrapiData("/api/articles");

    console.log(strapiData.data)
    const articles = strapiData.data;

    return (
        <main>
            articles && articles.map((article) => (
                <div key={article.id}>
                    <h2>{article.title}</h2>
                </div>
            ))
        </main>
    );
}

// pages/articles/[id].js
import React from 'react';

const ArticlePage = ({ article }) => {
    return (
        <div>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
        </div>
    );
};

export async function getStaticPaths() {
    // Récupérer tous les articles pour générer les chemins dynamiques
    const res = await fetch('http://localhost:1337/api/articles');
    const data = await res.json();

    // Générer les chemins dynamiques pour chaque article
    const paths = data.data.map((article) => ({
        params: { id: article.id.toString() },
    }));

    return { paths, fallback: false }; // `false` signifie qu'une erreur 404 sera renvoyée si l'article n'existe pas
}

export async function getStaticProps({ params }) {
    // Récupérer l'article spécifique avec l'ID
    const res = await fetch(`http://localhost:1337/api/articles/${params.id}`);
    const data = await res.json();

    return {
        props: {
            article: data.data, // Données de l'article spécifique
        },
    };
}

export default ArticlePage;
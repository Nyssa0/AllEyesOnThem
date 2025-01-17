import styles from "../style/components/articles.module.scss";
import qs from "qs";
import ArticleTeaser from "@/app/components/articleTeaser";

async function getArticles() {
    // const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
    // const path = "/api/articles";
    //
    // const url = new URL(path, baseUrl);
    //
    // url.search = qs.stringify({
    //     populate: {
    //         image_mobile: {
    //             fields: ["alternativeText", "url"],
    //         },
    //         image_desktop: {
    //             fields: ["alternativeText", "url"],
    //         },
    //     },
    // });
    //
    // const res = await fetch(url);
    //
    // if (!res.ok) throw new Error("Failed to fetch articles");
    //
    // const data = await res.json();
    //
    // return data;

    let articles = [
        {
            "id": 1,
            "documentId": "p5nrezyt501kay0x46blhfm9",
            "title": "Le génocide en Palestine",
            "createdAt": "2025-01-08T15:29:29.511Z",
            "updatedAt": "2025-01-10T00:47:43.814Z",
            "publishedAt": "2025-01-10T00:47:43.799Z",
            "introduction": "Le conflit en Palestine est une tragédie humanitaire marquée par des décennies de violences, de déplacements forcés et de violations des droits humains. De nombreux Palestiniens qualifient la situation de génocide en raison de l'oppression systématique, des attaques militaires répétées et des conditions de vie insoutenables imposées à Gaza et en Cisjordanie. Ces actions, comprenant la destruction de maisons, le blocus de Gaza, et des violences ciblant civils et infrastructures essentielles, ont causé des milliers de morts et de déplacés. Malgré les appels internationaux à la paix et à la justice, une résolution durable reste hors d'atteinte. Il est urgent d'agir pour préserver des vies et instaurer une paix équitable.",
            "location": "Palestine",
            "slug": "le-genocide-en-palestine",
            "event": "now",
            "image_mobile": {
                "id": 2,
                "documentId": "pjp1osj987m1158p2h3rfeci",
                "name": "palestine mobile.jpg",
                "alternativeText": "palestine",
                "caption": null,
                "width": 1020,
                "height": 1367,
                "formats": {
                    "large": {
                        "ext": ".jpg",
                        "url": "/uploads/large_palestine_mobile_0a12dce585.jpg",
                        "hash": "large_palestine_mobile_0a12dce585",
                        "mime": "image/jpeg",
                        "name": "large_palestine mobile.jpg",
                        "path": null,
                        "size": 120.94,
                        "width": 746,
                        "height": 1000,
                        "sizeInBytes": 120944
                    },
                    "small": {
                        "ext": ".jpg",
                        "url": "/uploads/small_palestine_mobile_0a12dce585.jpg",
                        "hash": "small_palestine_mobile_0a12dce585",
                        "mime": "image/jpeg",
                        "name": "small_palestine mobile.jpg",
                        "path": null,
                        "size": 43.28,
                        "width": 373,
                        "height": 500,
                        "sizeInBytes": 43275
                    },
                    "medium": {
                        "ext": ".jpg",
                        "url": "/uploads/medium_palestine_mobile_0a12dce585.jpg",
                        "hash": "medium_palestine_mobile_0a12dce585",
                        "mime": "image/jpeg",
                        "name": "medium_palestine mobile.jpg",
                        "path": null,
                        "size": 79.24,
                        "width": 560,
                        "height": 750,
                        "sizeInBytes": 79235
                    },
                    "thumbnail": {
                        "ext": ".jpg",
                        "url": "/uploads/thumbnail_palestine_mobile_0a12dce585.jpg",
                        "hash": "thumbnail_palestine_mobile_0a12dce585",
                        "mime": "image/jpeg",
                        "name": "thumbnail_palestine mobile.jpg",
                        "path": null,
                        "size": 6.96,
                        "width": 117,
                        "height": 156,
                        "sizeInBytes": 6961
                    }
                },
                "hash": "palestine_mobile_0a12dce585",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 185.93,
                "url": "/uploads/palestine_mobile_0a12dce585.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2025-01-08T12:58:19.256Z",
                "updatedAt": "2025-01-09T09:13:41.668Z",
                "publishedAt": "2025-01-08T12:58:19.256Z"
            },
            "image_desktop": {
                "id": 1,
                "documentId": "nw98e5u1wdk9lrnf4i5mastp",
                "name": "palestine.jpg",
                "alternativeText": "palestine",
                "caption": null,
                "width": 780,
                "height": 319,
                "formats": {
                    "small": {
                        "ext": ".jpg",
                        "url": "/uploads/small_palestine_4927e75df9.jpg",
                        "hash": "small_palestine_4927e75df9",
                        "mime": "image/jpeg",
                        "name": "small_palestine.jpg",
                        "path": null,
                        "size": 21.7,
                        "width": 500,
                        "height": 204,
                        "sizeInBytes": 21696
                    },
                    "medium": {
                        "ext": ".jpg",
                        "url": "/uploads/medium_palestine_4927e75df9.jpg",
                        "hash": "medium_palestine_4927e75df9",
                        "mime": "image/jpeg",
                        "name": "medium_palestine.jpg",
                        "path": null,
                        "size": 44.02,
                        "width": 750,
                        "height": 307,
                        "sizeInBytes": 44020
                    },
                    "thumbnail": {
                        "ext": ".jpg",
                        "url": "/uploads/thumbnail_palestine_4927e75df9.jpg",
                        "hash": "thumbnail_palestine_4927e75df9",
                        "mime": "image/jpeg",
                        "name": "thumbnail_palestine.jpg",
                        "path": null,
                        "size": 6.23,
                        "width": 245,
                        "height": 100,
                        "sizeInBytes": 6231
                    }
                },
                "hash": "palestine_4927e75df9",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 45.15,
                "url": "/uploads/palestine_4927e75df9.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2025-01-08T12:56:46.821Z",
                "updatedAt": "2025-01-09T08:37:10.324Z",
                "publishedAt": "2025-01-08T12:56:46.821Z"
            }
        },
        {
            "id": 5,
            "documentId": "o4qbso05vmaseif78cmdxmuq",
            "title": "Congo",
            "createdAt": "2025-01-09T12:56:34.454Z",
            "updatedAt": "2025-01-10T00:27:27.493Z",
            "publishedAt": "2025-01-10T00:27:27.478Z",
            "introduction": "La situation des droits humains est restée très grave, avec des attaques de groupes armés et des forces de sécurité contre des civils, exacerbant une crise humanitaire et provoquant le déplacement de près de sept millions de personnes. Des milliers de civils ont été tués, et des exécutions extrajudiciaires ont eu lieu. Les violences sexuelles et basées sur le genre ont été fréquentes, notamment dans le Nord-Kivu. Les libertés d’expression et de réunion ont été violées, et des journalistes, militants et opposants ont été emprisonnés arbitrairement. Des expulsions forcées liées à des projets miniers et à la conservation ont touché des milliers de personnes, privant certaines de leur logement et de leurs moyens de subsistance. Le conflit a gravement affecté l’éducation des enfants, et des catastrophes naturelles ont fait des centaines de morts. Les prisons étaient surpeuplées et dans des conditions horribles. Aucun progrès n’a été fait pour poursuivre les responsables de violations graves des droits humains.",
            "location": "Congo",
            "slug": "congo",
            "event": "soon",
            "image_mobile": {
                "id": 3,
                "documentId": "jblzvoi5jtdogy42fb2h14fb",
                "name": "congo mobile.avif",
                "alternativeText": null,
                "caption": null,
                "width": null,
                "height": null,
                "formats": null,
                "hash": "congo_mobile_239cced0c1",
                "ext": ".avif",
                "mime": "image/avif",
                "size": 71.58,
                "url": "/uploads/congo_mobile_239cced0c1.avif",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2025-01-09T12:56:23.957Z",
                "updatedAt": "2025-01-10T00:19:54.236Z",
                "publishedAt": "2025-01-09T12:56:23.957Z"
            },
            "image_desktop": {
                "id": 4,
                "documentId": "o98ulmk1cdb6cr4wx4uwugv1",
                "name": "congo.jpg",
                "alternativeText": null,
                "caption": null,
                "width": 1468,
                "height": 710,
                "formats": {
                    "large": {
                        "ext": ".jpg",
                        "url": "/uploads/large_congo_446bfb23f0.jpg",
                        "hash": "large_congo_446bfb23f0",
                        "mime": "image/jpeg",
                        "name": "large_congo.jpg",
                        "path": null,
                        "size": 84.19,
                        "width": 1000,
                        "height": 484,
                        "sizeInBytes": 84189
                    },
                    "small": {
                        "ext": ".jpg",
                        "url": "/uploads/small_congo_446bfb23f0.jpg",
                        "hash": "small_congo_446bfb23f0",
                        "mime": "image/jpeg",
                        "name": "small_congo.jpg",
                        "path": null,
                        "size": 27.8,
                        "width": 500,
                        "height": 242,
                        "sizeInBytes": 27802
                    },
                    "medium": {
                        "ext": ".jpg",
                        "url": "/uploads/medium_congo_446bfb23f0.jpg",
                        "hash": "medium_congo_446bfb23f0",
                        "mime": "image/jpeg",
                        "name": "medium_congo.jpg",
                        "path": null,
                        "size": 53.8,
                        "width": 750,
                        "height": 363,
                        "sizeInBytes": 53801
                    },
                    "thumbnail": {
                        "ext": ".jpg",
                        "url": "/uploads/thumbnail_congo_446bfb23f0.jpg",
                        "hash": "thumbnail_congo_446bfb23f0",
                        "mime": "image/jpeg",
                        "name": "thumbnail_congo.jpg",
                        "path": null,
                        "size": 7.88,
                        "width": 245,
                        "height": 118,
                        "sizeInBytes": 7884
                    }
                },
                "hash": "congo_446bfb23f0",
                "ext": ".jpg",
                "mime": "image/jpeg",
                "size": 151.27,
                "url": "/uploads/congo_446bfb23f0.jpg",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2025-01-09T12:56:24.032Z",
                "updatedAt": "2025-01-09T12:56:24.032Z",
                "publishedAt": "2025-01-09T12:56:24.032Z"
            }
        }
    ];

    return articles;
}

export default async function Articles() {
    // const strapiData = await getArticles();
    // const articles = strapiData.data;
    const articles = await getArticles();

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
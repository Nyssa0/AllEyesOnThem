'use client';

import { useEffect, useRef } from "react";
import styles from "../style/components/article.module.scss";
import globals from "../globals.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Article = ({ article }) => {
    const articleRef = useRef(null);
    const imageRefMobile = useRef(null);
    const imageRefDesktop = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const articleElement = articleRef.current;
        const isMobile = window.innerWidth <= 768;
        const imageElement = isMobile ? imageRefMobile.current : imageRefDesktop.current;
        const contentElement = contentRef.current;

        if (articleElement && imageElement) {
            // Révélation de l'image
            gsap.fromTo(
                imageElement,
                { filter: "grayscale(100%)", scale: 1.1, opacity: 0.5 },
                {
                    filter: "grayscale(0%)",
                    scale: 1,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: articleElement,
                        start: "top center+=100",
                        toggleActions: "play none none reset", // Rejoue l'animation à chaque retour
                        onEnter: () => {
                            gsap.to(imageElement, {
                                filter: "grayscale(0%)",
                                scale: 1,
                                opacity: 1,
                                duration: 1.5,
                                ease: "power2.out",
                            });
                        },
                        onLeaveBack: () => {
                            gsap.set(imageElement, { filter: "grayscale(100%)", scale: 1.1, opacity: 0.8 });
                        },
                    },
                }
            );
        }

        if (articleElement && contentElement) {
            // Animation du contenu
            gsap.fromTo(
                contentElement,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    delay: 0.4,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: articleElement,
                        start: "top center+=100",
                        toggleActions: "play none none reverse",
                    },
                }
            );


        }
    
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const baseUrl = "http://localhost:1337";
    const imageMobileUrl = baseUrl + article.image_mobile.url;
    const imageDesktopUrl = baseUrl + article.image_desktop.url;

    return (
        <li ref={articleRef} key={article.id} className={styles.article}>
            {/* Image mobile */}
            <div
                ref={imageRefMobile}
                className={`${styles.article__image} ${styles.image_background} mobile`}
            >
                <img
                    className={styles.img}
                    src={imageMobileUrl}
                    alt={article.image_mobile.alternativeText}
                />
            </div>

            {/* Image desktop */}
            <div
                ref={imageRefDesktop}
                className={`${styles.article__image} ${styles.image_background} desktop`}
            >
                <img
                    className={styles.img}
                    src={imageDesktopUrl}
                    alt={article.image_desktop.alternativeText}
                />
            </div>

            {/* Contenu */}
            <div ref={contentRef} className={styles.article__content}>
                <h2 className={styles.article__title}>{article.title}</h2>
                {article.location && (
                    <p className={styles.article__location}>
                        <span aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path>
                            </svg>
                        </span>
                        {article.location}
                    </p>
                )}
                <p className={styles.article__introduction}>{article.introduction}</p>
            </div>

        </li>
    );
};

export default Article;
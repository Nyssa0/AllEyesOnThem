'use client';

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../../style/components/articlePage.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
    const articleRef = useRef([]);
    const galleryRef = useRef(null);

    const articleTotalRef = useRef(null);

    useEffect(() => {
        const sections = articleRef.current;
        const articleTotalElement = articleTotalRef.current;
        const headerElement = articleRef.current[0];
        const sectionParallax = articleRef.current[3];
        const articleSections = document.querySelectorAll(`.${styles.articleSection}`);

    gsap.to(sectionParallax, {
        backgroundPositionY: '50%',
        ease: 'none',
        scrollTrigger: {
            trigger: sectionParallax,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true, // Parallax effect
        },
    });

    // Animation pour l'image de fond
    gsap.to(headerElement.querySelector(`.${styles.headerBackground}`), {
        transform: "scale(1)",
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: headerElement,
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
    });

    // Animation pour le titre
    gsap.fromTo(
        headerElement.querySelector(`.${styles.articleTitle}`),
        { opacity: 0, y: 50, scale: 0.8 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: headerElement,
                start: "top center", // Début à mi-écran
                toggleActions: "play none none none",
            },
        }
    );

    // Animation pour la localisation
    gsap.fromTo(
        headerElement.querySelector(`.${styles.articleLocation}`),
        { opacity: 0, y: 20 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: headerElement,
                start: "top center+=100",
                toggleActions: "play none none none",
            },
        }
    );

        gsap.fromTo(
            headerElement.querySelector(`.${styles.articleTitle}`),
            { opacity: 0, y: 50 }, // Initial (caché et décalé)
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headerElement,
                    start: "top center", // Débute à la moitié de l'écran
                    toggleActions: "play none none none",
                },
            }
        );
    
        gsap.fromTo(
            headerElement.querySelector(`.${styles.articleLocation}`),
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headerElement,
                    start: "top center+=100",
                    toggleActions: "play none none none",
                },
            }
        );


        sections.forEach((section, index) => {
            if (section) {
                // Animation des titres
                const title = section.querySelector(`.${styles.sectionTitle}`);
                if (title) {
                    gsap.fromTo(
                        title,
                        { opacity: 0, y: -50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            delay: index * 0.2,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: section,
                                start: "top center+=100",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                }

                // Animation des paragraphes
                const paragraphs = section.querySelectorAll(`.${styles.sectionParagraph}`);
                paragraphs.forEach((p, i) => {
                    gsap.fromTo(
                        p,
                        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
                        {
                            opacity: 1,
                            x: 0,
                            duration: 1,
                            delay: i * 0.2,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: p,
                                start: "top center+=100",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                });
            }
        });

        // Animation pour la galerie
        if (galleryRef.current) {
            gsap.to(galleryRef.current, {
                xPercent: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: galleryRef.current,
                    start: "top center",
                    end: "+=500",
                    scrub: 1,
                },
            });
        }

        // Animation de la couleur de fond et du texte
        gsap.to(articleTotalElement, {
            backgroundColor: "#CFD6C2",
            ease: "none",
            scrollTrigger: {
                trigger: articleTotalElement,
                start: "top+=2000 center",
                end: "bottom bottom",
                scrub: true,
            },
        });

        ScrollTrigger.create({
            trigger: articleTotalElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                if (progress >= 0.6) {
                    articleTotalElement.style.color = "#000000";
                } else {
                    articleTotalElement.style.color = "#ffffff";
                }
            },
        });

    return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
    }, []);
    const article = {
        title: "La guerre en Ukraine",
        introduction: "Depuis le 24 février 2022, chaque jour qui passe est une lutte pour survivre pour près de 15 millions d’Ukrainiens, soit 40% de la population. Des grandes villes comme Kiev, Kharkiv ou encore la région de Donetsk sont bombardées chaque jour. Des écoles, des hôpitaux, des maisons, tout n’est plus que ruines et chaos. Cette guerre, c’est aussi plus de 10 millions de personnes, dont des enfants, en proie à l’anxiété, la peur et des troubles psychologiques profonds.",
        location: "Ukraine",
        content1: `La guerre d’agression menée par la Russie contre l’Ukraine s’est poursuivie. Elle s’est traduite par de nombreuses victimes dans la population civile, des destructions d’infrastructures et un nombre de personnes déplacées ou réfugiées qui restait très élevé. Au mois de novembre, les Nations unies recensaient 28 711 victimes civiles, dont 10 058 personnes tuées, depuis le déclenchement de l’invasion russe à grande échelle, en février 2022. La contre-offensive ukrainienne s’est soldée par de modestes gains territoriaux, laissant entrevoir la perspective d’une guerre d’usure s’installant dans la durée et suscitant une certaine inquiétude quant à la capacité des alliés de l’Ukraine à lui apporter un soutien durable. Le net ralentissement de l’économie s’est confirmé, le pays dépendant de plus en plus des subventions et des prêts en provenance de l’étranger. La Russie s’est retirée en juillet de l’Initiative sur l’exportation de céréales par la mer Noire, destinée à assurer la stabilité des prix alimentaires et à écarter la menace de la famine dans certains pays à faibles revenus.`,
        content2: `Aussi bien les forces russes que les forces ukrainiennes ont fait usage de bombes à sous-munitions. Aucun des deux adversaires ne semblait prêt à renoncer à ce type d’armes, malgré leur caractère par nature non discriminant et les risques durables qu’elles présentaient pour la population civile. Après la fourniture d’armes à sous-munitions à l’Ukraine par les États-Unis, les autorités ukrainiennes se seraient engagées à ne pas les utiliser dans des zones construites et à établir un relevé de leur emplacement pour faciliter les futures opérations de déminage1. Les mines terrestres antipersonnel et antichars étaient également très largement utilisées, à tel point que, selon certaines estimations, l’Ukraine est devenue le pays le plus densément miné de la planète.`,
        content3: `Aussi bien les forces russes que les forces ukrainiennes ont fait usage de bombes à sous-munitions. Aucun des deux adversaires ne semblait prêt à renoncer à ce type d’armes, malgré leur caractère par nature non discriminant et les risques durables qu’elles présentaient pour la population civile. Après la fourniture d’armes à sous-munitions à l’Ukraine par les États-Unis, les autorités ukrainiennes se seraient engagées à ne pas les utiliser dans des zones construites et à établir un relevé de leur emplacement pour faciliter les futures opérations de déminage1. Les mines terrestres antipersonnel et antichars étaient également très largement utilisées, à tel point que, selon certaines estimations, l’Ukraine est devenue le pays le plus densément miné de la planète.`,
        content4: `La guerre en cours continuait d’avoir des répercussions sur l’accès des enfants à l’éducation, en particulier concernant les cours en présentiel dans les territoires contrôlés par le gouvernement. Les élèves des établissements ne disposant pas d’abris antiaériens ou situés à proximité du front suivaient une scolarité exclusivement en ligne. Les autres établissements dispensaient à la fois des cours en ligne et des cours en présentiel. Les élèves suivant un enseignement en ligne dépendaient de connexions Internet souvent peu fiables en raison des coupures d’électricité et du manque d’équipements informatiques adaptés, d’où une surcharge de travail pour les enseignant·e·s, qui devaient en outre gérer les traumatismes causés par la guerre, ceux des enfants comme les leurs.`,
        content5: `La répression s’est intensifiée dans les territoires occupés par la Russie, où les droits et les libertés étaient de plus en plus limités. En septembre, les personnes se trouvant hors de Russie qui ne détenaient pas de passeport russe et souhaitaient se rendre dans les territoires occupés étaient obligées de passer par l’aéroport moscovite de Cheremetievo. Certaines personnes ont été contraintes d’attendre parfois 24 heures, le temps que soient accomplies les formalités de vérification, sans pouvoir manger ni se laver. Elles ont dû se plier à des contrôles intrusifs et dire si elles soutenaient l’« opération militaire spéciale » de la Russie contre l’Ukraine.`,
        title2: "La situation humanitaire",
        title3: "Les droits humains",
        hero: "https://war.ukraine.ua/wp-content/uploads/2024/07/Snapinsta.app_452508556_7855989397814414_1285532103254499927_n_1080.jpg",
        image2: "https://war.ukraine.ua/wp-content/uploads/2024/07/Snapinsta.app_452484790_1526958764902341_1355677307637107146_n_1080.jpg",
        image3: "https://war.ukraine.ua/wp-content/uploads/2024/07/Snapinsta.app_452508556_7855989397814414_1285532103254499927_n_1080.jpg",
        gallery: ['https://war.ukraine.ua/wp-content/uploads/2024/07/Snapinsta.app_452484790_1526958764902341_1355677307637107146_n_1080.jpg', 'https://war.ukraine.ua/wp-content/uploads/2024/07/Snapinsta.app_452508556_7855989397814414_1285532103254499927_n_1080.jpg', 'https://war.ukraine.ua/wp-content/uploads/2024/07/Snapinsta.app_452508556_7855989397814414_1285532103254499927_n_1080.jpg', 'https://war.ukraine.ua/wp-content/uploads/2024/07/Snapinsta.app_452508556_7855989397814414_1285532103254499927_n_1080.jpg'],
        donate: ['https://donner.croix-rouge.fr/urgence-ukraine/~mon-don'],
        events: ['https://donner.croix-rouge.fr/urgence-ukraine/~mon-don'],
        sources: ['https://donner.croix-rouge.fr/urgence-ukraine/~mon-don'],


        
    };
    

    return (
        <main className={styles.articlePage} ref={(el) => (articleTotalRef.current = el)}>
           {/* Section Header */}
            <section className={styles.articleHeader} ref={(el) => (articleRef.current[0] = el)}>
                <div className={styles.headerBackground} style={{ backgroundImage: `url(${article.gallery[0]})` }}>
                    <h1 className={`${styles.articleTitle} ${styles.animatedTitle}`}>{article.title}</h1>
                    {article.location && <p className={styles.articleLocation}>{article.location}</p>}
                </div>
            </section>

            

            {/* Section Content 1 */}
            <section className={styles.articleSection} ref={(el) => (articleRef.current[1] = el)}>
                <h2 className={styles.sectionTitle}>Contexte</h2>
                <p className={styles.sectionParagraph}>{article.content1}</p>
            </section>

            {/* Section Content 2 */}
            <section className={styles.articleSection} ref={(el) => (articleRef.current[2] = el)}>
                <h2 className={styles.sectionTitle}>Conséquences</h2>
                <p className={styles.sectionParagraph}>{article.content2}</p>
            </section>

            {/* Section Parallax */}
            <section className={styles.parallaxSection} ref={(el) => (articleRef.current[3] = el)} style={{ backgroundImage: `url(${article.image2})` }}>
                <div className={styles.parallaxContent}>
                </div>
            </section>


            {/* Section Content 3 */}
            <section className={styles.articleSection} ref={(el) => (articleRef.current[3] = el)}>
                <h2 className={styles.sectionTitle}>Éducation</h2>
                <p className={styles.sectionParagraph}>{article.content3}</p>
            </section>

            {/* Section Gallery */}
            <section
                className={`${styles.articleGallery} gallery-section`}
                ref={galleryRef}
            >
                <div className={styles.galleryWrapper}>
                    {article.gallery.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Image ${index + 1}`}
                            className={styles.galleryImage}
                        />
                    ))}
                </div>
            </section>


            {/* Section Content 4 */}
            <section className={styles.articleSection} ref={(el) => (articleRef.current[4] = el)}>
                <h2 className={styles.sectionTitle}>Répression</h2>
                <p className={styles.sectionParagraph}>{article.content4}</p>
            </section>

            {/* Section Content 5 */}
            <section className={styles.articleSection} ref={(el) => (articleRef.current[5] = el)}>
                <h2 className={styles.sectionTitle}>Situation humanitaire</h2>
                <p className={styles.sectionParagraph}>{article.content5}</p>
            </section>

            {/* Section Image 3 */}
            <section className={styles.articleSection} ref={(el) => (articleRef.current[4] = el)}>
                <img
                    src={article.image3}
                    alt="Illustration de l'article"
                    className={styles.articleImage}
                />
            </section>
                
            {/* Section Donate */}
            <section className={styles.articleSection} ref={(el) => (articleRef.current[6] = el)}>
                <h2 className={styles.sectionTitle}>Faire un don</h2>
                <p>Vous pouvez vous engager auprès de ces différents organismes pour apporter une aide financière.</p>
                <a href={article.donate} className={styles.buttonDonate}>Croix Rouge</a>
            </section>
                    
            {/* Section Events */}
            <section className={styles.articleSection} ref={(el) => (articleRef.current[7] = el)}>
                <h2 className={styles.sectionTitle}>Événements</h2>
                <a href={article.events} className={styles.sectionParagraph}>Événements</a>
            </section>
                        
            {/* Section Sources */}
            <section className={styles.articleSection} ref={(el) => (articleRef.current[8] = el)}>
                <h2 className={styles.sectionTitle}>Sources</h2>
                <a href={article.sources} className={styles.sectionParagraph}>Sources</a>
            </section>


        </main>
    );
}

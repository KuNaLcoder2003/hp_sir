import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion"


const products = [{ link: '/WhatsApp Image 2025-08-27 at 5.52.34 PM.jpeg' }, { link: 'https://picsum.photos/200/300?grayscale' },
{ link: '/WhatsApp Image 2025-08-27 at 5.52.34 PM.jpeg' },
{ link: 'https://picsum.photos/seed/picsum/200/300' }, { link: 'https://picsum.photos/seed/picsum/200/300' }, { link: 'https://picsum.photos/seed/picsum/200/300' },
{ link: 'https://picsum.photos/seed/picsum/200/300' }, { link: 'https://picsum.photos/seed/picsum/200/300' }, { link: 'https://picsum.photos/seed/picsum/200/300' }, { link: 'https://picsum.photos/seed/picsum/200/300' },
{ link: 'https://picsum.photos/seed/picsum/200/300' }, { link: 'https://picsum.photos/seed/picsum/200/300' },
{ link: 'https://picsum.photos/200/300?grayscale' }, { link: 'https://picsum.photos/200/300?grayscale' }, { link: 'https://picsum.photos/200/300?grayscale' }]

export const HeroParallax = () => {
    const firstRow = products.slice(0, 5);
    const secondRow = products.slice(5, 10);
    const thirdRow = products.slice(10, 15);
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
    const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
    const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
    const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
    const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
    const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);
    return (
        <div
            ref={ref}
            className="h-[300vh] bg-white text-black py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]">
            <Header />
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
                className="">
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
                    {firstRow.map((product, index) => (
                        <ProductCard product={product} translate={translateX} key={`first_row${index}`} />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row  mb-20 space-x-20 ">
                    {secondRow.map((product, index) => (
                        <ProductCard product={product} translate={translateXReverse} key={`second_row${index}`} />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
                    {thirdRow.map((product, index) => (
                        <ProductCard product={product} translate={translateX} key={`third_row${index}`} />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export const Header = () => {
    return (
        <div
            className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
            <h1 className="text-2xl md:text-7xl font-bold">
                Shaping <br /> Future Minds
            </h1>
            <p className="max-w-2xl text-base md:text-xl mt-8">
                We nurture curious minds and inspire lifelong learning,
                empowering students to achieve their full potential and excel in every field.
            </p>

        </div>
    );
};

export const ProductCard = ({
    product,
    translate
}) => {
    return (
        <motion.div
            style={{
                x: translate,
            }}
            whileHover={{
                y: -20,
            }}
            key={product.title || Math.floor(Math.random() * 1000)}
            className="group/product h-96 w-[30rem] relative shrink-0">
            <a href={""} className="block group-hover/product:shadow-2xl ">
                <img
                    src={product.link}
                    height="600"
                    width="600"
                    className="object-cover object-left-top absolute h-full w-full inset-0"
                    alt={""} />
            </a>
            <div
                className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
            <h2
                className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
                {""}
            </h2>
        </motion.div>
    );
};
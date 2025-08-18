import React from "react"
import { motion } from "framer-motion"

const DURATION = 0.25
const STAGGER = 0.025

interface FlipLinkProps {
    children: string
    href: string
}

const FlipLink: React.FC<FlipLinkProps> = ({ children, href }) => {
    const letters = children.split("")
    const gradient =
        "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)"

    return (
        <motion.a
            initial="initial"
            animate="initial"
            whileHover="hovered"
            target="_blank"
            rel="noopener noreferrer"
            href={href}
            className="relative m-auto block overflow-hidden whitespace-nowrap font-semibold uppercase text-[clamp(2rem,8vw,6rem)]"
            style={{ lineHeight: 0.75 }}
        >
            {/* Top layer (slides up) */}
            <div>
                {letters.map((l, i) => (
                    <motion.span
                        key={i}
                        variants={{
                            initial: { y: 0 },
                            hovered: { y: "-100%" },
                        }}
                        transition={{
                            duration: DURATION,
                            ease: "easeInOut",
                            delay: STAGGER * i,
                        }}
                        className="inline-block bg-clip-text text-transparent"
                        style={{ backgroundImage: gradient }}
                    >
                        {l}
                    </motion.span>
                ))}
            </div>

            {/* Bottom layer (slides in) */}
            <div className="absolute inset-0">
                {letters.map((l, i) => (
                    <motion.span
                        key={i}
                        variants={{
                            initial: { y: "100%" },
                            hovered: { y: 0 },
                        }}
                        transition={{
                            duration: DURATION,
                            ease: "easeInOut",
                            delay: STAGGER * i,
                        }}
                        className="inline-block bg-clip-text text-transparent"
                        style={{ backgroundImage: gradient }}
                    >
                        {l}
                    </motion.span>
                ))}
            </div>
        </motion.a>
    )
}

export default FlipLink

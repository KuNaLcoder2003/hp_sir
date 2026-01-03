import React from "react"
import { BookOpen, Twitter, Linkedin, Instagram, Mail } from "lucide-react"

const cn = (...classes: (string | false | null | undefined)[]) =>
    classes.filter(Boolean).join(" ")

const Footer = ({
    brandName = "Myna Academy",
    brandDescription = "Concept-driven learning for CBSE & JEE aspirants. Building strong foundations from Class 8 to 12.",
    socialLinks = [],
    navLinks = [],
    className,
}: {
    brandName?: string
    brandDescription?: string
    socialLinks?: { icon: React.ReactNode; href: string; label: string }[]
    navLinks?: { label: string; href: string }[]
    className?: string
}) => {
    return (
        <section className={cn("relative w-full overflow-hidden", className)}>
            <footer className="border-t border-gray-200 bg-white relative">
                <div className="max-w-7xl mx-auto min-h-[28rem] px-4 py-16 flex flex-col justify-between">

                    {/* Brand */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-7 h-7 text-[#FF6B2C]" />
                            <span className="text-2xl font-mono font-bold text-gray-900">
                                {brandName}
                            </span>
                        </div>

                        <p className="max-w-md text-sm font-mono text-gray-600">
                            {brandDescription}
                        </p>

                        {/* Socials */}
                        {socialLinks.length > 0 && (
                            <div className="flex gap-5 pt-2">
                                {socialLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        aria-label={link.label}
                                        className="text-gray-500 hover:text-[#FF6B2C] transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {link.icon}
                                    </a>
                                ))}
                            </div>
                        )}

                        {/* Navigation */}
                        {navLinks.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-6 pt-6 text-xs font-mono text-gray-600">
                                {navLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        className="hover:text-[#FF6B2C] transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-12 text-center">
                        <p className="text-xs font-mono text-gray-500">
                            © {new Date().getFullYear()} {brandName}. All rights reserved.
                        </p>
                    </div>
                </div>

                {/* Background Brand Text */}
                <div
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none select-none font-mono font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FF6B2C]/20 to-transparent text-center"
                    style={{
                        fontSize: "clamp(3rem, 12vw, 9rem)",
                        lineHeight: 1,
                    }}
                >
                    {brandName.toUpperCase()}
                </div>
            </footer>
        </section>
    )
}

export default function FooterSection() {
    const socialLinks = [
        { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
        { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
        { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
        { icon: <Mail className="w-5 h-5" />, href: "mailto:info@mynaacademy.in", label: "Email" },
    ]

    const navLinks = [
        { label: "Batches", href: "#batches" },
        { label: "Courses", href: "#courses" },
        { label: "About Us", href: "#about" },
        { label: "Contact", href: "#contact" },
    ]

    return (
        <Footer
            brandName="DYRTN BY HP SIR"
            brandDescription="Structured learning for CBSE & JEE students with a focus on concepts, clarity, and confidence."
            socialLinks={socialLinks}
            navLinks={navLinks}
        />
    )
}

import { useState, useEffect, useRef } from "react";
import { Activity, ArrowRight, BarChart, Bird, Menu, Plug, Sparkles, Zap, X } from "lucide-react";

export default function Hero() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [animated, setAnimated] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        setTimeout(() => setAnimated(true), 100);
    }, []);

    const navigationItems = [
        { title: "ABOUT DYRTN", href: "#" },
        { title: "PROGRAMS", href: "#" },
        { title: "ADMISSIONS", href: "#" },
        { title: "CAMPUS LIFE", href: "#" },
    ];

    const labels = [
        { icon: Sparkles, label: "Academic Excellence" },
        { icon: Plug, label: "Practical Learning" },
        { icon: Activity, label: "Student Development" },
    ];


    const features = [
        {
            icon: BarChart,
            label: "Outcome-Oriented Education",
            description:
                "Our programs are designed to deliver measurable academic and professional results through focused learning.",
        },
        {
            icon: Zap,
            label: "Skill-Based Training",
            description:
                "We emphasize hands-on learning, real-world exposure, and industry-relevant skills.",
        },
        {
            icon: Activity,
            label: "Holistic Development",
            description:
                "Beyond academics, we nurture leadership, discipline, confidence, and character.",
        },
    ];


    const titleWords = [
        "DEDICATION",
        "YIELDS",
        "RESULTS",
        "THROUGH",
        "NURTURING",
    ];


    return (
        <>
            <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .word-animate {
          display: inline-block;
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .word-animate:nth-child(1) { animation-delay: 0.1s; }
        .word-animate:nth-child(2) { animation-delay: 0.25s; }
        .word-animate:nth-child(3) { animation-delay: 0.4s; }
        .word-animate:nth-child(4) { animation-delay: 0.55s; }
        .word-animate:nth-child(5) { animation-delay: 0.7s; }
        .word-animate:nth-child(6) { animation-delay: 0.85s; }

        .subtitle-animate {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
          animation-delay: 1.2s;
        }

        .label-animate {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .label-animate:nth-child(1) { animation-delay: 1.8s; }
        .label-animate:nth-child(2) { animation-delay: 1.95s; }
        .label-animate:nth-child(3) { animation-delay: 2.1s; }

        .cta-animate {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
          animation-delay: 2.4s;
        }

        .feature-animate {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .feature-animate:nth-child(1) { animation-delay: 0.2s; }
        .feature-animate:nth-child(2) { animation-delay: 0.4s; }
        .feature-animate:nth-child(3) { animation-delay: 0.6s; }

        .menu-slide {
          animation: slideRight 0.3s ease-out;
        }
      `}</style>

            <div className="min-h-screen bg-white">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <header>
                        <div className="flex h-16 items-center justify-between">
                            <a href="#" className="flex items-center gap-2">
                                <Bird className="h-8 w-8 text-gray-900" />
                                <span className="font-mono text-xl font-bold text-gray-900">
                                    DYRTN
                                </span>
                            </a>

                            <nav className="hidden md:flex items-center space-x-8">
                                {navigationItems.map((item) => (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        className="text-sm font-mono text-gray-900 hover:text-[#FF6B2C] transition-colors"
                                    >
                                        {item.title}
                                    </a>
                                ))}
                            </nav>

                            <div className="flex items-center space-x-4">
                                <button className="rounded-none hidden md:inline-flex h-10 px-4 py-2 bg-[#FF6B2C] hover:opacity-90 font-mono text-white items-center transition-opacity cursor-pointer">
                                    EXPLORE PROGRAMS
                                    <ArrowRight className="ml-1 w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="md:hidden h-10 w-10 inline-flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors"
                                >
                                    <Menu className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Mobile Menu */}
                    {menuOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-40 bg-black/80"
                                onClick={() => setMenuOpen(false)}
                            />
                            <div className="menu-slide fixed inset-y-0 right-0 z-50 w-3/4 max-w-sm bg-white border-l p-6 shadow-lg">
                                <button
                                    onClick={() => setMenuOpen(false)}
                                    className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                                <nav className="flex flex-col gap-6 mt-12">
                                    {navigationItems.map((item) => (
                                        <a
                                            key={item.title}
                                            href={item.href}
                                            className="text-sm font-mono text-gray-900 hover:text-[#FF6B2C] transition-colors"
                                        >
                                            {item.title}
                                        </a>
                                    ))}
                                    <button className="rounded-none h-10 px-4 py-2 bg-[#FF6B2C] hover:opacity-90 font-mono text-white inline-flex items-center justify-center transition-opacity cursor-pointer">
                                        Explore Programs <ArrowRight className="ml-1 w-4 h-4" />
                                    </button>
                                </nav>
                            </div>
                        </>
                    )}

                    {/* Hero Section */}
                    <main>
                        <section className="py-24">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="font-mono text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto leading-tight text-gray-900">
                                    {animated && titleWords.map((text, index) => (
                                        <span key={index} className="word-animate mx-2 md:mx-4">
                                            {text}
                                        </span>
                                    ))}
                                </h1>

                                {animated && (
                                    <>
                                        <p className="subtitle-animate mx-auto mt-8 max-w-2xl text-xl text-gray-700 font-mono">
                                            At DYRTN, we nurture talent through dedicated mentorship, academic excellence,
                                            and holistic development—preparing students to succeed in education,
                                            careers, and life.
                                        </p>

                                        <div className="mt-12 flex flex-wrap justify-center gap-6">
                                            {labels.map((feature) => {
                                                const Icon = feature.icon;
                                                return (
                                                    <div
                                                        key={feature.label}
                                                        className="label-animate flex items-center gap-2 px-6"
                                                    >
                                                        <Icon className="h-5 w-5 text-[#FF6B2C]" />
                                                        <span className="text-sm font-mono text-gray-900">{feature.label}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className="cta-animate">
                                            <button className="rounded-none h-11 px-8 mt-12 bg-[#FF6B2C] hover:opacity-90 font-mono text-white inline-flex items-center transition-opacity">
                                                Explore Programs <ArrowRight className="ml-1 w-4 h-4" />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </section>

                        {/* Features Section */}
                        <section className="pb-24" ref={sectionRef}>
                            <h2 className="text-center text-4xl font-mono font-bold mb-6 text-gray-900">
                                Building Future-Ready Individuals
                            </h2>
                            <div className="grid md:grid-cols-3 max-w-6xl mx-auto gap-px bg-gray-200">
                                {features.map((feature) => {
                                    const Icon = feature.icon;
                                    return (
                                        <div
                                            key={feature.label}
                                            className="feature-animate flex flex-col items-center text-center p-8 bg-white"
                                        >
                                            <div className="mb-6 rounded-full bg-[#FF6B2C]/10 p-4">
                                                <Icon className="h-8 w-8 text-[#FF6B2C]" />
                                            </div>
                                            <h3 className="mb-4 text-xl font-mono font-bold text-gray-900">
                                                {feature.label}
                                            </h3>
                                            <p className="text-gray-600 font-mono text-sm leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
}
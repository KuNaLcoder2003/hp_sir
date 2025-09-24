import Hyperspeed from "./HyperSpeed";

const Test = () => {
    return (
        <div className="relative w-screen h-screen bg-black overflow-hidden">

            {/* 🔹 Hyperspeed Effect */}
            <div className="absolute inset-0">
                <Hyperspeed
                    effectOptions={{
                        onSpeedUp: () => { },
                        onSlowDown: () => { },
                        distortion: "turbulentDistortion",
                        length: 400,
                        roadWidth: 10,
                        islandWidth: 2,
                        lanesPerRoad: 4,
                        fov: 90,
                        fovSpeedUp: 150,
                        speedUp: 2,
                        carLightsFade: 0.4,
                        totalSideLightSticks: 20,
                        lightPairsPerRoadWay: 40,
                        shoulderLinesWidthPercentage: 0.05,
                        brokenLinesWidthPercentage: 0.1,
                        brokenLinesLengthPercentage: 0.5,
                        lightStickWidth: [0.12, 0.5],
                        lightStickHeight: [1.3, 1.7],
                        movingAwaySpeed: [60, 80],
                        movingCloserSpeed: [-120, -160],
                        carLightsLength: [400 * 0.03, 400 * 0.2],
                        carLightsRadius: [0.05, 0.14],
                        carWidthPercentage: [0.3, 0.5],
                        carShiftX: [-0.8, 0.8],
                        carFloorSeparation: [0, 5],
                        colors: {
                            roadColor: 0x080808,
                            islandColor: 0x0a0a0a,
                            background: 0x000000,
                            shoulderLines: 0xffffff,
                            brokenLines: 0xffffff,
                            leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
                            rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
                            sticks: 0x03b3c3,
                        },
                    }}
                />
            </div>

            {/* 🔹 Navbar */}
            <nav className="absolute top-6 left-1/2 -translate-x-1/2 z-20 
                flex items-center justify-between w-[90%] max-w-4xl 
                px-6 py-3 rounded-full
                bg-gradient-to-r from-zinc-900 to-zinc-800 from-slate-800 to-slate-900 backdrop-blur-xl border border-white/10 shadow-lg">
                <h1 className="text-white text-xl font-bold"> Kunal</h1>
                <div className="flex gap-6 text-white font-medium">
                    <a href="#" className="hover:text-gray-300 transition">Home</a>
                    <a href="#" className="hover:text-gray-300 transition">Docs</a>
                    <a href="#" className="hover:text-gray-300 transition">Testimonials</a>
                    <a href="#" className="hover:text-gray-300 transition">Pricing</a>
                </div>
            </nav>

            {/* 🔹 Center Content */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 text-white items-center z-10">
                {/* Small Tag/Button above */}
                <button className="px-4 py-2 rounded-full bg-gradient-to-r from-zinc-800 to-zinc-900 backdrop-blur-md border border-white/20 text-sm font-medium hover:bg-black/60 transition">
                    New Templates Available
                </button>

                {/* Heading */}
                <h1 className="text-center text-5xl font-extrabold max-w-2xl leading-tight">
                    Click &amp; hold to see the real magic of hyperspeed!
                </h1>

                {/* Buttons */}
                <div className="flex items-center gap-4">
                    <button className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition">
                        Get Started
                    </button>
                    <button className="px-6 py-3 bg-black/40 text-white font-semibold rounded-full border border-white/20 backdrop-blur-md hover:bg-black/60 transition">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Test;

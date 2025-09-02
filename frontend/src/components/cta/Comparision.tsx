

export default function ComparisonGrid() {
    // Sample data for the comparison grid
    const categories = [
        'Cost',
        'Senior-level Designer',
        'Turnaround Time',
        'Start Time',
        'Revisions',
        'Communication'
    ];

    const companies = [
        {
            name: 'Mimic Design',
            logo: '/api/placeholder/40/40',
            values: [
                { text: '$', positive: true },
                { text: 'Guaranteed', positive: true },
                { text: 'Within 1 week', positive: true },
                { text: 'Today', positive: true },
                { text: 'Unlimited', positive: true },
                { text: '24/7 support', positive: true }
            ]
        },
        {
            name: 'Full-time',
            values: [
                { text: '$$$$ (High Overhead)', positive: false },
                { text: 'Hopefully', positive: false },
                { text: 'Weeks', positive: false },
                { text: 'Months to train', positive: false },
                { text: 'Limited', positive: false },
                { text: 'Monday-Friday', positive: false }
            ]
        },
        {
            name: 'Other Agencies',
            values: [
                { text: '$$$', positive: false },
                { text: 'Maybe', positive: false },
                { text: 'Months', positive: false },
                { text: 'Weeks (Contracts)', positive: false },
                { text: 'Limited per project', positive: false },
                { text: 'Back-forth emails', positive: false }
            ]
        }
    ];

    return (
        <div className="w-[80%] lg:w-[90%] xl:w-[80%] m-auto bg-white p-8 rounded-xl 3xl:w-[50%]">
            <div className="overflow-x-auto">
                <div className="min-w-max">
                    {/* Header Row */}
                    <div className="grid grid-cols-4 gap-4 mb-6 px-2">
                        <div className="col-span-1"></div>
                        {companies.map((company, index) => (
                            <div key={index} className="flex flex-col justify-center">

                                <h3 style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }} className="font-bold bg-clip-text text-2xl text-transparent">{company.name}</h3>
                            </div>
                        ))}
                    </div>

                    {/* Content Rows */}
                    {categories.map((category, idx) => (
                        <div key={idx} className="grid grid-cols-4 gap-4 border-t border-gray-200 py-4 px-4">
                            <div className="col-span-1">
                                <h4 style={{ backgroundImage: "radial-gradient(98.0344% 98.0344% at 1.35135% 3.04878%, rgb(49, 46, 129) 0%, rgb(3, 7, 18) 100%)" }} className="font-bold bg-clip-text text-transparent">{category}</h4>
                            </div>

                            {companies.map((company, companyIdx) => {
                                const value = company.values[idx];
                                return (
                                    <div key={companyIdx} className="flex items-center font-semibold">
                                        <span className={`mr-2 ${value.positive ? 'text-green-500' : 'text-red-500'}`}>
                                            {value.positive ? '✓' : '✗'}
                                        </span>
                                        <span className="text-gray-700">{value.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
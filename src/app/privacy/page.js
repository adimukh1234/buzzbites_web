import React from 'react';
import Image from 'next/image';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="w-full px-8 py-5 flex justify-center items-center bg-transparent border-b border-gray-800">
                <div className="flex items-center">
                    <Image
                        src="/Buzz_logo-01.png"
                        alt="Buzzbites Logo"
                        width={180}
                        height={60}
                        className="object-contain"
                        priority
                    />
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-16 max-w-4xl">
                {/* Title Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-satoshi font-black text-white mb-6">
                        Privacy 
                        <span className="text-yellow-500 ml-4">Policy</span>
                    </h1>
                    <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></div>
                    <p className="text-xl text-gray-300 font-satoshi max-w-2xl mx-auto leading-relaxed">
                        At Buzzbites, we take the privacy of our users very seriously. This Privacy Policy explains how we collect, use, disclose, and protect your personal information.
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-12">
                    {/* Information Collection Section */}
                    <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                        <h2 className="text-3xl font-satoshi font-bold text-yellow-400 mb-6 flex items-center">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-4"></span>
                            Information Collection and Use
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            We may collect personal information from you, such as your name, email address, and other contact information, when you register for an account or use our services. We may also collect information about your use of our website and services, such as your browsing history and usage data. We use this information to provide and improve our website and services, as well as to communicate with you.
                        </p>
                    </section>

                    {/* Information Sharing Section */}
                    <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                        <h2 className="text-3xl font-satoshi font-bold text-yellow-400 mb-6 flex items-center">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-4"></span>
                            Information Sharing and Disclosure
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            We do not share or disclose your personal information to third parties without your consent, except as required by law or to protect the rights and safety of Buzzbites or its users. We may share your personal information with third-party service providers who assist us in providing our website and services.
                        </p>
                    </section>

                    {/* Data Security Section */}
                    <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                        <h2 className="text-3xl font-satoshi font-bold text-yellow-400 mb-6 flex items-center">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-4"></span>
                            Data Security
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            We take reasonable measures to protect your personal information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. However, no data transmission over the internet can be guaranteed to be 100% secure. As a result, we cannot ensure or warrant the security of any information you transmit to us, and you do so at your own risk.
                        </p>
                    </section>

                    {/* Children's Privacy Section */}
                    <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                        <h2 className="text-3xl font-satoshi font-bold text-yellow-400 mb-6 flex items-center">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-4"></span>
                            Children's Privacy
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            Our website and services are intended for users who are at least 18 years of age. We do not knowingly collect personal information from children under the age of 18. If we become aware that we have collected personal information from a child under the age of 18, we will take steps to delete such information.
                        </p>
                    </section>

                    {/* Changes to Policy Section */}
                    <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                        <h2 className="text-3xl font-satoshi font-bold text-yellow-400 mb-6 flex items-center">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-4"></span>
                            Changes to this Privacy Policy
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any changes to this Privacy Policy by posting the revised policy on our website. Your continued use of our website and services following any changes to this Privacy Policy will constitute your acceptance of such changes.
                        </p>
                    </section>

                    {/* Contact Section */}
                    <section className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-2xl p-8 text-center">
                        <h2 className="text-3xl font-satoshi font-bold text-yellow-400 mb-4">
                            Questions About This Policy?
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-lg mb-6">
                            By using Buzzbites, you agree to the terms and conditions of this Privacy Policy. If you have any questions about this Privacy Policy, please contact us.
                        </p>
                        <a 
                            href="mailto:info@buzzbites.in"
                            className="inline-flex items-center px-6 py-3 bg-yellow-500 text-black font-satoshi font-bold rounded-full hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
                        >
                            Contact Us at info@buzzbites.in
                        </a>
                    </section>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-16">
                    <a 
                        href="/"
                        className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-300 font-satoshi font-semibold text-lg"
                    >
                        ← Back to Home
                    </a>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-800 py-8 mt-16">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-gray-400 font-satoshi">
                        © 2025 Buzzbites Media & Entertainment Pvt. Ltd. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
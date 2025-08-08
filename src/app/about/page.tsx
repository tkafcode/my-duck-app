import Link from 'next/link';

export default function About() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        About Our Artisanal Fabrication Business
        </h1>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl text-center">
        Welcome to our artisanal fabrication business, where craftsmanship meets creativity. As a one-man operation, I take pride in every piece I create, ensuring that each item is not only functional but also a work of art. My journey began with a passion for building and designing unique pieces that tell a story. Over the years, I have honed my skills in various fabrication techniques, allowing me to bring my clients' visions to life.
        </p>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl text-center">
        I specialize in custom commissions, working closely with clients to understand their needs and preferences. Whether it's a bespoke piece of furniture, intricate metalwork, or unique home decor, I approach each project with dedication and attention to detail. My goal is to create pieces that not only meet functional requirements but also enhance the aesthetic of any space.
        </p>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl text-center">
        Sustainability is at the heart of my business. I source materials responsibly and strive to minimize waste in my fabrication process. Each piece is crafted with care, ensuring that it will stand the test of time. I believe that quality craftsmanship should be accessible, and I work hard to provide my clients with exceptional value for their investment.
        </p>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl text-center">
        My fabrication process is transparent and collaborative. From the initial consultation to the final delivery, I keep my clients informed and involved. I value open communication and believe that the best results come from a partnership between the maker and the client. This approach not only ensures satisfaction but also fosters a sense of community and trust.
        </p>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl text-center">
        I am open for commissions and welcome inquiries from individuals and businesses alike. Whether you have a specific idea in mind or need guidance in conceptualizing a project, I am here to help. My commitment to quality and customer satisfaction drives me to exceed expectations with every commission I undertake.
        </p>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl text-center">
        Thank you for considering my artisanal fabrication services. I look forward to the opportunity to work with you and create something truly special together. Please feel free to reach out with any questions or to discuss your project ideas.
        </p>
        <Link href="/" className="mt-8 flex items-center text-blue-500 hover:text-blue-600 transition duration-200">
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l6-6m-6 6l6 6" />
        </svg>
        Back to Home
        </Link>
        </main>
    );
}

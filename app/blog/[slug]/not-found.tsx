import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-700 mb-6">
                    Article Not Found
                </h2>
                <p className="text-gray-600 mb-8 max-w-md">
                    The article you're looking for doesn't exist or may have been removed.
                </p>
                <Link
                    href="/blog"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    ← Back to Blog
                </Link>
            </div>
        </div>
    );
}

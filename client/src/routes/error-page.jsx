import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
                    <h2 className="text-3xl font-bold text-base-content mb-2">
                        {error.status === 404 ? 'Page Not Found' : 'An error occurred'}
                    </h2>
                    <p className="text-base-content mb-4">{error.statusText || error.message}</p>
                    <div className="mt-6">
                        <a href="/" className="text-base font-medium text-blue-600 hover:text-blue-500">
                            Go back home
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

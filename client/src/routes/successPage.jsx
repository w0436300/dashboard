import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const SuccessPage = () => {
    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    useEffect(() => {
        const handleSuccess = async () => {
            try {
                await refreshUser();
                
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                navigate('/dashboard');
            } catch (error) {
                console.error('Error processing success:', error);
                setIsLoading(false);
            }
        };

        handleSuccess();
    }, [navigate, refreshUser]);

  if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
                    <p className="text-gray-600 mb-2">Processing your subscription...</p>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                </div>
            </div>
        );
    }
};

export default SuccessPage;
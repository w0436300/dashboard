// //     1. Check user  status
// //     2. Check access permissions
// //     3. Redirect or display content
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';



export const ProtectedChart = ({ children }) => {
    const { user, fetchUser } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        const checkUser = async () => {
            if (fetchUser) {
                await fetchUser();
            }
        };
        checkUser();
        
        const interval = setInterval(checkUser, 1000);
        return () => clearInterval(interval);
    }, [fetchUser]);
 
    useEffect(() => {
        if (user?.subscription?.status === 'active') {
            fetchUser();
        }
    }, [user?.subscription?.status]);
 
    if (!user) {
        return (
            <div className="relative border rounded-lg p-4">
                <div className="absolute inset-0 bg-gray-100/90 backdrop-blur flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-600 mb-2">Please sign in to view this chart</p>
                        <button onClick={() => navigate('/signin')} 
                            className="text-indigo-600 font-semibold hover:text-indigo-500">
                            Sign In
                        </button>
                    </div>
                </div>
                <div className="blur-sm">{children}</div>
            </div>
        );
    }
 
    if (user.subscription?.status !== 'active') {
        return (
            <div className="relative border rounded-lg p-4">
                <div className="absolute inset-0 bg-gray-100/90 backdrop-blur flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-600 mb-2">Subscribe to access this premium chart</p>
                        {user.subscription?.endDate && (
                            <p className="text-sm text-gray-500 mb-2">
                                Subscription expired on {new Date(user.subscription.endDate).toLocaleDateString()}
                            </p>
                        )}
                        <button onClick={() => navigate('/subscribe')}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors">
                            Upgrade Now
                        </button>
                    </div>
                </div>
                <div className="blur-sm">{children}</div>
            </div>
        );
    }
 
    return children;
 };


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export default function Settings() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        businessName: '',
        about: '',
        firstName: '',
        lastName: '',
        email: ''
    });

    useEffect(() => {
        if (!loading && !user) {
            navigate('/signin');
        } else if (user) {
            setFormData(prev => ({
                ...prev,
                firstName: user.firstname || '',
                businessName: user.businessName || '',
                email: user.email || ''
            }));
        }
    }, [user, loading, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            alert('New passwords do not match!');
            return;
        }
        try {
            console.log('Password change submitted:', {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Failed to change password');
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Profile update submitted:', {
                businessName: formData.businessName,
                about: formData.about,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    if (!user) return null;

    const inputClassName = "block w-full rounded-md border-0 py-1.5 bg-base-200 text-base-content shadow-sm ring-1 ring-inset ring-base-300 placeholder:text-base-content/60 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm";
    
    return (
        <div className="relative isolate bg-base-100 px-6 py-24 sm:py-32 lg:px-8">
            <form>
                <div className="space-y-12">
                    {/* Main Sections Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Change Password Section */}
                        <div className="border-b lg:border-b-0 lg:border-r border-base-300 pb-12 lg:pr-8">
                            <h2 className="text-base font-semibold text-base-content">Change Password</h2>
                            <div className="mt-10 w-full max-w-sm">
                                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="current-password" className="block text-sm font-medium text-base-content">
                                            Current password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="current-password"
                                                name="currentPassword"
                                                type="password"
                                                value={formData.currentPassword}
                                                onChange={handleInputChange}
                                                required
                                                className={inputClassName}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="new-password" className="block text-sm font-medium text-base-content">
                                            New password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="new-password"
                                                name="newPassword"
                                                type="password"
                                                value={formData.newPassword}
                                                onChange={handleInputChange}
                                                required
                                                className={inputClassName}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="confirm-password" className="block text-sm font-medium text-base-content">
                                            Confirm new password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="confirm-password"
                                                name="confirmPassword"
                                                type="password"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                required
                                                className={inputClassName}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-full"
                                        >
                                            Change password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Profile Section */}
                        <div className="border-b border-base-300 pb-12 lg:pl-8">
                            <h2 className="text-base font-semibold text-base-content">Profile</h2>
                            <p className="mt-1 text-sm text-base-content/70">
                                This information will be displayed publicly so be careful what you share.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="business-name" className="block text-sm font-medium text-base-content">
                                        Business Name
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-base-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                                            <span className="flex select-none items-center pl-3 text-base-content/70 sm:text-sm">
                                                dashboard.group2/
                                            </span>
                                            <input
                                                id="business-name"
                                                name="businessName"
                                                type="text"
                                                value={formData.businessName}
                                                onChange={handleInputChange}
                                                className={inputClassName}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="about" className="block text-sm font-medium text-base-content">
                                        About
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="about"
                                            name="about"
                                            rows={3}
                                            value={formData.about}
                                            onChange={handleInputChange}
                                            className={inputClassName}
                                        />
                                    </div>
                                    <p className="mt-3 text-sm text-base-content/70">
                                        Write a few sentences about your business.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Personal Information Section */}
                    <div className="border-b border-base-300 pb-12">
                        <h2 className="text-base font-semibold text-base-content">Personal Information</h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium text-base-content">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="first-name"
                                        name="firstName"
                                        type="text"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={inputClassName}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium text-base-content">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="lastname"
                                        name="lastname"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={inputClassName}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium text-base-content">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={inputClassName}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="btn btn-ghost">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
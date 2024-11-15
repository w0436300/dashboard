//subscribe frontend
import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

const tiers = [
    {
        name: 'Free',
        id: 'tier-free',
        priceId: null,
        href: '#',
        price: '$0',
        period: 'forever',
        description: 'Perfect for trying out our platform.',
        features: [
            'Basic analytics dashboard',
            'Up to 100 monthly visitors',
            'Basic sales reports',
            'Email support',
            'Single user account'
        ],
        featured: true,
        recommend: false
    },
    {
        name: 'Monthly',
        id: 'tier-monthly',
        priceId: 'price_1QLMdBEieCH6fleqcgMt0iys',
        href: 'https://buy.stripe.com/test_fZedS11Y83YufNC8ww',
        price: '$9.9',
        period: '/month',
        description: 'Great for growing businesses and teams.',
        features: [
            'Advanced analytics',
            'Unlimited visitors',
            'Custom reports',
            'Priority support',
            'Up to 5 team members',
            'Customer segmentation',
            'Sales forecasting'
        ],
        featured: false,
        recommend: true
    },
    {
        name: 'Lifetime',
        id: 'tier-lifetime',
        priceId: 'price_1QLMioEieCH6fleqWEzM5BPS',
        href: 'https://buy.stripe.com/test_bIY7tD6eo52y0SI5km',
        price: '$199',
        period: 'one-time payment',
        description: 'Best value for long-term commitment.',
        features: [
            'Everything in Monthly plan',
            'Lifetime access',
            'All future updates',
            'Premium support',
            'Unlimited team members',
            'API access',
            'Custom integrations',
            'Data export'
        ],
        featured: false,
        recommend: false
    }
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function SubscriptionPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    

    return (
        <div className="relative isolate bg-base-200 px-6 py-9">
            {/* title */}
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-xl font-semibold text-indigo-600"> Choose the right plan for you</h2>
            </div>
            {/* price card */}
            <div className="mx-auto mt-4 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
                {tiers.map((tier) => (
                    <div
                        key={tier.id}
                        className={classNames(
                            tier.featured ? 'relative bg-gray-900 shadow-2xl' : 'bg-white/60 sm:mx-4 lg:mx-0',
                            'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10'
                        )}
                    >
                        <h3
                            id={tier.id}
                            className={classNames(
                                tier.featured ? 'text-indigo-400' : 'text-indigo-600',
                                'text-3xl/7 font-semibold text-center'
                            )}
                        >
                            {tier.name}
                            {tier.recommend && (
                                <span className="mt-2 block rounded-md px-3 py-1 text-center text-sm font-bold text-red-600 border border-red-600">
                                    Recommended
                                </span>
                            )}
                        </h3>
                        <p className="mt-4 flex items-baseline gap-x-2 justify-center">
                            <span
                                className={classNames(
                                    tier.featured ? 'text-white' : 'text-gray-900',
                                    'text-5xl font-semibold tracking-tight'
                                )}
                            >
                                {tier.price}
                            </span>
                            <span
                                className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base')}
                            >
                                {tier.period}
                            </span>
                        </p>
                        <p
                            className={classNames(
                                tier.featured ? 'text-gray-300' : 'text-gray-600',
                                'mt-6 text-base/7 text-center'
                            )}
                        >
                            {tier.description}
                        </p>
                        <ul
                            role="list"
                            className={classNames(
                                tier.featured ? 'text-gray-300' : 'text-gray-600',
                                'mt-8 space-y-3 text-sm/6 sm:mt-10'
                            )}
                        >
                            {tier.features.map((feature) => (
                                <li key={feature} className="flex gap-x-3">
                                    <CheckIcon
                                        aria-hidden="true"
                                        className={classNames(
                                            tier.featured ? 'text-indigo-400' : 'text-indigo-600',
                                            'h-6 w-5 flex-none'
                                        )}
                                    />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        {tier.featured ? (
                            <span className="mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-gray-500 bg-gray-200 cursor-not-allowed sm:mt-10">
                                You Are Here
                            </span>
                        ) : (
                            <a
                                target="_blank"
                                href={tier.href}
                                aria-describedby={tier.id}
                                className={classNames(
                                    'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-indigo-600',
                                    'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10'
                                )}
                            >
                                Get started today
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

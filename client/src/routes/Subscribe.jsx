//subscribe frontend
import React from 'react';

//export default function subscribe() {
//  return (
//    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
//      <h1 className="text-3xl font-bold">subscribe </h1>
//    </div>
//  );
//}

import { CheckIcon } from '@heroicons/react/20/solid'

const tiers = [
  {
    name: 'Free',
    id: 'tier-free',
    href: '#',
    priceMonthly: '$0',
    description: "A basic plan to get started with our product for free.",
    features: ['15 products', 'Up to 1,000 subscribers', 'Basic analytics', 'Email support'],
    featured: true,
    recommend: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '#',
    priceMonthly: '$9.9',
    description: 'A professional plan for growing your business.',
    features: ['75 products', 'Up to 20,000 subscribers', 'Advanced analytics', 'Priority support', 'Marketing intelligence'],
    featured: false,
    recommend: true,
  },
  {
    name: 'Premium',
    id: 'tier-premium',
    href: '#',
    priceMonthly: '$19.9',
    description: 'All the tools and support you need to scale your business.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      'Marketing intelligence',
      'Dedicated support representative',
      'Custom integrations',
    ],
    featured: false,
    recommend: false,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl/7 font-semibold text-indigo-600">Pricing</h2>
        <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Choose the right plan for you
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
      Choose an affordable plan and enjoy the best features for analyzing sales data, enhancing customer loyalty, and boosting sales.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
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
              className={classNames(tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'text-3xl/7 font-semibold text-center')}
            >
              {tier.name}
              {tier.recommend && (
                <span className="mt-2 block rounded-md px-3 py-1 text-center text-sm font-bold text-red-600 border border-red-600">
                    Recommended
                    </span>
                )
                }
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2 justify-center">
              <span
                className={classNames(
                  tier.featured ? 'text-white' : 'text-gray-900',
                  'text-5xl font-semibold tracking-tight',
                )}
              >
                {tier.priceMonthly}
              </span>
              <span className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base')}>
                /month
              </span>
            </p>
            <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7 text-center')}>
              {tier.description}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured ? 'text-gray-300' : 'text-gray-600',
                'mt-8 space-y-3 text-sm/6 sm:mt-10',
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={classNames(tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'h-6 w-5 flex-none')}
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
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-indigo-600',
                  'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
                )}
              >
                Get started today
              </a>
            )
        }
          </div>
        ))}
      </div>
    </div>
  )
}

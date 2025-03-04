import type { AppProps } from 'next/app';

import CapsuleNavigation from '@/components/CapsuleNavigation';
import '@/styles/index.scss';
import { AppInfoStore } from '@/zustand';
import { Analytics } from '@vercel/analytics/next';

import $styles from './index.module.scss';

export default function App({ Component, pageProps, router }: AppProps) {
    return (
        <div className={$styles.outer_layout}>
            <AppInfoStore>
                <CapsuleNavigation
                    hrefList={[
                        {
                            href: '/about',
                            title: 'About',
                        },
                        {
                            href: '/gallery',
                            title: 'Gallery',
                        },
                        {
                            href: '/archive',
                            title: 'Archive',
                        },
                    ]}
                />
                <Component key={router.route} {...pageProps} />
            </AppInfoStore>
            <Analytics />
        </div>
    );
}

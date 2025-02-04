import type { AppProps } from 'next/app';

import CapsuleNavigation from '@/components/CapsuleNavigation';
import { AppInfoStore } from '@/zustand';
import '@/styles/index.scss';
import { AnimatePresence } from 'framer-motion';

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
                <AnimatePresence mode="wait">
                    <Component key={router.route} {...pageProps} />
                </AnimatePresence>
            </AppInfoStore>
        </div>
    );
}

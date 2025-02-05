import type { AppProps } from 'next/app';

import CapsuleNavigation from '@/components/CapsuleNavigation';
import { Transform } from '@/components/PageTransition/Transform';
import '@/styles/index.scss';
import { AppInfoStore } from '@/zustand';

import $styles from './index.module.scss';

export default function App({ Component, pageProps, router }: AppProps) {
    return (
        <div className={$styles.outer_layout}>
            <AppInfoStore>
                <Transform>
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
                    <Component {...pageProps} />
                </Transform>
            </AppInfoStore>
        </div>
    );
}

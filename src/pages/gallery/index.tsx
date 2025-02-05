import type { FC } from 'react';

import InfiniteGallery from '@/components/InfiniteGallery';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import $styles from './index.module.scss';

const Gallery: FC = () => {
    const [imgData] = useState<string[]>(
        Array.from({ length: 28 })
            .fill(null)
            .map((_, index) => `/assets/img/gallery/pic${index + 1}.webp`),
    );
    useEffect(() => {
        console.log('Gallery');
    }, []);
    return (
        <>
            <Head>
                <title>personal website -- Gallery</title>
                <meta
                    name="description"
                    content="This is the home page of my Next.js application."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="personal website" />
                <meta property="og:description" content="Welcome to my site" />
            </Head>
            <div className={$styles.container}>
                <InfiniteGallery imgData={imgData} />
            </div>
        </>
    );
};

export default Gallery;

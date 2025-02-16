import type { ImgData } from '@/types/InfiniteGallery.types';
import type { FC } from 'react';

import InfiniteGallery from '@/pages/gallery/components/InfiniteGallery';
import { isMobileDevice } from '@/utils';
import {
    CloudinaryCloudName,
    CloudinaryDomain,
    CloudinaryQuality,
    CloudinaryResourcePath,
    CloudinaryVersion,
} from '@/utils/constants';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import $styles from './index.module.scss';

const Gallery: FC = () => {
    // mock
    const [imgData] = useState<ImgData[]>(
        Array.from({ length: 28 })
            .fill(null)
            .map((_, index) => ({
                previewImageSrc: `/assets/img/gallery/pic${index + 1}.webp`,
                originImageSrc: `${CloudinaryDomain}${CloudinaryCloudName}${CloudinaryResourcePath}${CloudinaryQuality}${CloudinaryVersion}${index + 1}.jpg`,
            })),
    );
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    useEffect(() => {
        setIsMobile(isMobileDevice());
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
                {isMobile !== null && (
                    <InfiniteGallery imgData={imgData} isMobileDevice={isMobile} />
                )}
            </div>
        </>
    );
};

export default Gallery;

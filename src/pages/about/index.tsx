import type { FC } from 'react';

import ContainerBox from '@/components/ContainerBox';
import MouseFollow from '@/components/MouseFollow';
import Head from 'next/head';

import $styles from './index.module.scss';
import Top from './top';

const About: FC = () => {
    return (
        <>
            <Head>
                <title>personal website -- about</title>
                <meta
                    name="description"
                    content="This is the home page of my Next.js application."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="personal website" />
                <meta property="og:description" content="Welcome to my site" />
            </Head>
            <div className={$styles.container}>
                <Top />
                <ContainerBox />
            </div>
            <MouseFollow />
        </>
    );
};

export default About;

import MouseFollow from '@/components/MouseFollow';
import ContainerBox from '@/pageComponents/about/ContainerBox';
import Top from '@/pageComponents/about/Top';
import { isMobileDevice } from '@/utils';
import Head from 'next/head';
import { type FC, useEffect, useState } from 'react';

import $styles from './index.module.scss';

const About: FC = () => {
    const [isDeskTopDevice, setIsDeskTopDevice] = useState<boolean>(false);
    useEffect(() => {
        setIsDeskTopDevice(isMobileDevice());
    }, []);
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
            {isDeskTopDevice ? <MouseFollow /> : <></>}
        </>
    );
};

export default About;

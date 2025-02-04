import Head from "next/head";
import { FC } from "react";
import $styles from "./index.module.scss"
import { Inner } from "@/components/PageTransition";
import Top from "./top";
import ContainerBox from "@/components/ContainerBox";
import MouseFollow from "@/components/MouseFollow";

const About: FC = () => {

    return (
        <>
            <Head>
                <title>personal website -- about</title>
                <meta name="description" content="This is the home page of my Next.js application." />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="personal website" />
                <meta property="og:description" content="Welcome to my site" />
            </Head>
            <Inner>
                <div className={$styles.container}>
                    <Top/>
                    <ContainerBox/>
                </div>
            </Inner>
            <MouseFollow/>
        </>
    )
}

export default About;
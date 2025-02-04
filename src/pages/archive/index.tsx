import Head from "next/head";
import { FC } from "react";
import $styles from "./index.module.scss"
import Inner from "@/components/PageTransition/Inner";

const About: FC = () => {
    return (
        <>
            <Head>
                <title>personal website -- archive</title>
                <meta name="description" content="This is the home page of my Next.js application." />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="personal website" />
                <meta property="og:description" content="Welcome to my site" />
            </Head>
            <Inner>
                <div className={$styles.container}>
                    Archive
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore, autem unde fugit nesciunt necessitatibus itaque molestiae omnis! Neque velit, officiis recusandae qui quia vero sapiente? Numquam facere laboriosam harum obcaecati?
                </div>
            </Inner>
        </>
    )
}

export default About;
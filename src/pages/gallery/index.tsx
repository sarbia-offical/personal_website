import Head from "next/head";
import { FC, useState } from "react"
import Inner from "@/components/PageTransition/Inner";
import InfiniteGallery from "@/components/InfiniteGallery";
import $styles from "./index.module.scss"

const Gallery: FC = () => {
    const [imgData] = useState<string[]>(Array(28).fill(null).map((_,index) => `/assets/img/gallery/pic${index + 1}.webp`))
    return (
        <>
            <Head>
                <title>personal website -- Gallery</title>
                <meta name="description" content="This is the home page of my Next.js application." />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="personal website" />
                <meta property="og:description" content="Welcome to my site" />
            </Head>
            <Inner>
                <div className={$styles.container}>
                    <InfiniteGallery imgData={imgData}/>
                </div>
            </Inner>
        </>
    )
}

export default Gallery;
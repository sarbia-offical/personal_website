
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import CapsuleNavigation from "@/components/CapsuleNavigation";
import "@/styles/index.scss"
import $styles from "./index.module.scss"
import { AppInfoStore } from "@/zustand";

export default function App({ Component, pageProps, router }: AppProps) {

  return <div className={$styles.outer_layout}>
    <AppInfoStore>
      <CapsuleNavigation hrefList={[{
        href: '/about',
        title: 'About'
      }, {
        href: '/gallery',
        title: 'Gallery'
      }, {
        href: '/archive',
        title: 'Archive'
      }]} />
      <AnimatePresence mode="wait">
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </AppInfoStore>
  </div>;
}

import { FC, ReactNode } from "react"
import $styles from "./index.module.scss"
import { motion, Variant, HTMLMotionProps } from "framer-motion";
import { slide, perspective, opacity } from "./animation"

const animationFunc: (variants: Variant) => HTMLMotionProps<'div'> = (variants) => {
    return {
        initial: 'initial',
        animate: 'enter',
        exit: 'exit',
        variants: {
            ...variants
        }
    }
}

const Inner: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className={$styles.inner}>
            <motion.div className={$styles.slide} {...animationFunc(slide)}></motion.div>
            <motion.div className={$styles.page} {...animationFunc(perspective)}>
                <motion.div {...animationFunc(opacity)}>
                    { children }
                </motion.div>
            </motion.div>
        </div>
    )
}
export default Inner;
import type { HTMLMotionProps, Variant } from 'framer-motion';
import type { FC, ReactNode } from 'react';

import { motion } from 'framer-motion';

import { opacity, perspective, slide } from './animation';
import $styles from './index.module.scss';

const animationFunc: (variants: Variant) => HTMLMotionProps<'div'> = (variants) => {
    return {
        initial: 'initial',
        animate: 'enter',
        exit: 'exit',
        variants: {
            ...variants,
        },
    };
};

const Inner: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className={$styles.inner}>
            <motion.div className={$styles.slide} {...animationFunc(slide)}></motion.div>
            <motion.div className={$styles.page} {...animationFunc(perspective)}>
                <motion.div {...animationFunc(opacity)}>{children}</motion.div>
            </motion.div>
        </div>
    );
};
export default Inner;

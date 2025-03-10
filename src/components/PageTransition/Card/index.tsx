import type { HTMLMotionProps, Variant } from 'framer-motion';
import type { FC, ReactNode } from 'react';

import { motion } from 'framer-motion';

import { card, cardInnerEnter, opacity } from './animation';
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

const CardTransition: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <div>
                <motion.div
                    className={$styles.cardMovementInner}
                    {...animationFunc(cardInnerEnter)}
                >
                    <p>inner loading</p>
                </motion.div>
                <motion.div className={$styles.cardMovement} {...{ ...animationFunc(card) }}>
                    outer loading
                </motion.div>
                <motion.div {...animationFunc(opacity)}>{children}</motion.div>
            </div>
        </>
    );
};

export default CardTransition;

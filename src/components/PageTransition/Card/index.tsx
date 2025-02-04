import { FC, ReactNode, useState } from "react";
import { HTMLMotionProps, motion, Variant } from "framer-motion";
import $styles from "./index.module.scss"
import { card, opacity, cardInnerEnter } from "./animation"

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

const CardTransition: FC<{ children: ReactNode }> = ({ children }) => {
    const [completeState, setCompleteState] = useState<'enter' | 'exit'>('enter');
    return (
        <>
            <div>
                <motion.div className={$styles.cardMovementInner} { ...animationFunc(cardInnerEnter) }>
                    <p>inner loading</p>
                </motion.div>
                <motion.div className={$styles.cardMovement} { ...{ ...animationFunc(card), ...{
                    onAnimationComplete: (state: 'enter' | 'exit') => {
                        console.log(state, '动画执行完毕');
                        setCompleteState(state);
                    }
                } } }>
                    outer loading
                </motion.div>
                <motion.div {...animationFunc(opacity)}>
                    { children }
                </motion.div>
            </div>
        </>
    )
}

export default CardTransition;
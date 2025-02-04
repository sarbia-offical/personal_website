import type { HTMLMotionProps } from 'framer-motion';

import { useCursorDirection } from '@/hooks/useCursorDirection';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import $styles from './index.module.scss';
interface DragMaskProps {
    style?: React.CSSProperties;
    children: React.ReactNode;
}

const motionSetting: HTMLMotionProps<'div'> = {
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
    variants: {
        initial: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
            transition: {
                duration: 1,
                ease: 'linear',
            },
        },
    },
};

const DragMask = (props: DragMaskProps) => {
    const { children, style } = props;
    const cursorRef = useRef<HTMLImageElement>(null);
    const { cursorAngle } = useCursorDirection();
    useEffect(() => {
        if (cursorRef.current) {
            const ele = cursorRef.current as unknown as HTMLImageElement;
            if (ele && cursorAngle) {
                ele.style.transform = `rotate(${cursorAngle}deg)`;
            }
        }
    }, [cursorRef.current, cursorAngle]);
    return (
        <>
            <motion.div className={$styles.drag_mask} style={{ ...style }} {...motionSetting}>
                <img ref={cursorRef} alt="Cursor Hand" src={'/assets/svg/rotating-cursor.svg'} />
            </motion.div>
            {children}
        </>
    );
};

export default DragMask;

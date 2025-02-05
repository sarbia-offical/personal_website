import type { ReactNode } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface IProps {
    children: ReactNode;
}

export const Transform = ({ children }: IProps) => {
    const router = useRouter();
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={router.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onAnimationComplete={(definition) => {
                    console.log('动画完成阶段:', definition);
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

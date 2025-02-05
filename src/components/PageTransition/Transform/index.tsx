import type { ReactNode } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { variants } from './animation';

interface IProps {
    children: ReactNode;
}

export const Transform = ({ children }: IProps) => {
    const router = useRouter();
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={router.asPath}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

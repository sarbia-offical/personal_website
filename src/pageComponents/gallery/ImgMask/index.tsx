import type { FC } from 'react';

import { motion } from 'framer-motion';

import $styles from './index.module.scss';

interface IProps {
    handleClose?: () => void;
}

const ImgMask: FC<IProps> = (props: IProps) => {
    const { handleClose } = props;
    return (
        <motion.div
            className={$styles.ImgMask}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            onClick={handleClose}
        ></motion.div>
    );
};

export default ImgMask;

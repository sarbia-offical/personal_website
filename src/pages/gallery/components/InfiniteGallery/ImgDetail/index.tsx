import type { FC } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useCallback, useMemo, useState } from 'react';

import type { IImageData } from '../type';

import { IMG_HEIGHT, IMG_WIDTH } from '../constant';
import $styles from './index.module.scss';

interface IProps {
    imgInfo: IImageData;
    handleClose: () => void;
}

const ImgDetail: FC<IProps> = (props: IProps) => {
    const { imgInfo, handleClose } = props;
    const position = useMemo<{ x: number; y: number }>(
        () => ({
            x: imgInfo.x,
            y: imgInfo.y,
        }),
        [imgInfo],
    );
    const [isReverse, setIsReverse] = useState<boolean>(false);

    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        setIsReverse((prevIsReverse) => !prevIsReverse);
        e.stopPropagation();
    }, []);

    const bundleClose = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (isReverse) {
                setIsReverse((prevIsReverse) => !prevIsReverse);
            }
            handleClose();
        },
        [isReverse],
    );

    return (
        <div className={$styles.img_detail} onClick={bundleClose}>
            <motion.div
                className={$styles.img_card}
                initial={{
                    left: position.x,
                    top: position.y,
                }}
                animate={{
                    left: '50%',
                    top: '50%',
                    transform: `translateX(-50%) translateY(-50%)`,
                }}
                exit={{
                    left: position.x,
                    top: position.y,
                    opacity: 0,
                    transform: `translateX(0) translateY(0)`,
                }}
            >
                <div
                    className={`${$styles.img_card_front} ${!isReverse ? $styles.normal_img : $styles.reverse_img}`}
                    onClick={handleClick}
                >
                    <Image
                        src={imgInfo.detail.previewImageSrc}
                        width={IMG_WIDTH}
                        height={IMG_HEIGHT}
                        alt="pic"
                    />
                </div>
                <div
                    className={`${$styles.img_card_reverse} ${isReverse ? $styles.normal_img : $styles.reverse_img}`}
                    onClick={handleClick}
                >
                    <img src={imgInfo.detail.originImageSrc} />
                </div>
            </motion.div>
        </div>
    );
};

export default ImgDetail;

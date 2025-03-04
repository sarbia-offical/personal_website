import type { IImageData } from '@/types/InfiniteGallery.types';
import type { FC } from 'react';

import { IMG_HEIGHT, IMG_WIDTH } from '@/constants/InfiniteGallery.constants';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useCallback, useMemo, useState } from 'react';

import $styles from './index.module.scss';

interface IProps {
    imgInfo: IImageData;
    handleClose: () => void;
}

const ImgDetail: FC<IProps> = (props: IProps) => {
    const { imgInfo, handleClose } = props;
    const position = useMemo<{ x: number; y: number }>(
        () => ({
            x: imgInfo?.x ?? 0,
            y: imgInfo?.y ?? 0,
        }),
        [imgInfo],
    );
    const [imgVisible, setImgVisible] = useState<boolean>(false);
    const [isReverse, setIsReverse] = useState<boolean>(false);

    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        setIsReverse((prevIsReverse) => !prevIsReverse);
        !imgVisible && setImgVisible(true);
        e.stopPropagation();
    }, []);

    const bundleClose = useCallback(() => {
        if (isReverse) {
            setIsReverse((prevIsReverse) => !prevIsReverse);
        }
        handleClose();
    }, [isReverse]);

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
                    transition: {
                        delay: 0.2,
                    },
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
                        src={imgInfo?.detail?.previewImageSrc || ''}
                        width={IMG_WIDTH}
                        height={IMG_HEIGHT}
                        alt="pic"
                    />
                </div>
            </motion.div>
            <div
                className={`${$styles.img_reverse} ${isReverse ? $styles.normal_img : $styles.reverse_img}`}
                onClick={handleClick}
            >
                {imgVisible && <img src={imgInfo?.detail?.originImageSrc ?? ''} />}
            </div>
        </div>
    );
};

export default ImgDetail;

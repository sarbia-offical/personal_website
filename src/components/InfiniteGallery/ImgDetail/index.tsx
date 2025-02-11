import type { FC } from 'react';

import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import type { IImageData } from '../type';

import { IMG_HEIGHT, IMG_WIDTH } from '../constant';
import $styles from './index.module.scss';

interface IProps {
    imgInfo: IImageData;
    handleClose: () => void;
}

const ImgDetail: FC<IProps> = (props: IProps) => {
    const { imgInfo, handleClose } = props;
    const normalStyle = 'translate(-50%, -50%) rotateY(0deg)';
    const reverseStyle = 'translate(-50%, -50%) rotateY(180deg)';
    console.log('imgInfo', imgInfo);
    const position = useMemo<{ x: number; y: number }>(
        () => ({
            x: imgInfo.x,
            y: imgInfo.y,
        }),
        [imgInfo],
    );
    const [imgVisible, setImgVisible] = useState<boolean>(false);
    const [isReverse, setIsReverse] = useState<boolean>(false);

    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        setIsReverse((prevIsReverse) => !prevIsReverse);
        e.stopPropagation();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setImgVisible(true);
        }, 50);
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);
    return (
        <div className={$styles.img_detail}>
            <div className={$styles.img_card} onClick={handleClose}>
                {
                    <div
                        className={$styles.img_card_front}
                        style={{
                            left: imgVisible ? '50%' : position.x,
                            top: imgVisible ? '50%' : position.y,
                            transform: isReverse ? `${reverseStyle}` : `${normalStyle}`,
                        }}
                        onClick={handleClick}
                    >
                        {
                            <Image
                                src={imgInfo.detail.previewImageSrc}
                                width={IMG_WIDTH}
                                height={IMG_HEIGHT}
                                alt="pic"
                            />
                        }
                    </div>
                }
                <div
                    className={$styles.img_card_reverse}
                    style={{
                        transform: isReverse ? `${normalStyle}` : `${reverseStyle}`,
                    }}
                    onClick={handleClick}
                >
                    reverse
                </div>
            </div>
        </div>
    );
};

export default ImgDetail;

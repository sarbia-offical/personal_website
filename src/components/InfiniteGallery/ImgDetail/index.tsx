import type { FC } from 'react';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import type { IImageData } from '../type';

import { IMG_HEIGHT, IMG_WIDTH } from '../constant';
import $styles from './index.module.scss';

interface IProps {
    imgInfo: IImageData;
}

const ImgDetail: FC<IProps> = (props: IProps) => {
    const { imgInfo } = props;
    console.log('imgInfo', imgInfo);
    const position = useMemo<{ x: number; y: number }>(
        () => ({
            x: imgInfo.x,
            y: imgInfo.y,
        }),
        [imgInfo],
    );
    const [imgVisible, setImgVisible] = useState<boolean>(false);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setImgVisible(true);
        }, 50);
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);
    return (
        <div
            className={`${$styles.img_detail} ${imgVisible ? `${$styles.img_detail_center}` : ''}`}
            style={{
                left: imgVisible ? '50%' : position.x,
                top: imgVisible ? '50%' : position.y,
            }}
        >
            {imgVisible && (
                <div className={$styles.img_card}>
                    <Image
                        src={imgInfo.detail.previewImageSrc}
                        width={IMG_WIDTH}
                        height={IMG_HEIGHT}
                        alt="pic"
                    />
                </div>
            )}
        </div>
    );
};

export default ImgDetail;

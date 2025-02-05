import type { FC } from 'react';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import type { IImageData } from '../type';

import $styles from './index.module.scss';

interface IProps {
    imgData: IImageData;
}

const ImgDetail: FC<IProps> = (props: IProps) => {
    const { imgData } = props;
    const x = useMemo<number>(() => imgData.x, [imgData]);
    const y = useMemo<number>(() => imgData.y, [imgData]);
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
                left: x,
                top: y,
            }}
        >
            {imgVisible && (
                <div className={$styles.img_card}>
                    <Image src={imgData.img} width={300} height={450} alt="pic" />
                </div>
            )}
        </div>
    );
};

export default ImgDetail;

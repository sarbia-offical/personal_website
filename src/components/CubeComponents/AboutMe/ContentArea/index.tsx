import type { FC } from 'react';

import Portrait from '@/components/Portrait';
import { DeviceEnum } from '@/hooks/type';
import { useDeviceType } from '@/hooks/useDeviceType';
import { useInViewport } from 'ahooks';
import { motion } from 'framer-motion';
import { useMemo, useRef } from 'react';

import $styles from './index.module.scss';

export interface IContentArea {
    selfIntroduction: string | JSX.Element;
}

const ContentArea: FC<IContentArea> = (props: IContentArea) => {
    const { selfIntroduction } = props;
    const aboutMeRef = useRef<HTMLDivElement>(null);
    const deviceType = useDeviceType();
    const [inViewport, ratio] = useInViewport(() => aboutMeRef.current, {
        threshold: Array.from({ length: 10 })
            .fill({})
            .map((_, index) => index * 0.1),
    });
    const isDeskTopDevice = useMemo(() => deviceType === DeviceEnum.DESKTOP, [deviceType]);
    return (
        <div ref={aboutMeRef} className={$styles.content_area}>
            {inViewport ? (
                <>
                    <div className={$styles.portrait}>
                        <Portrait loadingRate={isDeskTopDevice ? ratio || 0 : 1} />
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: ratio ? 1 : 0 }} // 根据滚动位置控制透明度
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2 }}
                        className={$styles.self_introduction}
                    >
                        <p className={$styles.self_introduction_desc}>{selfIntroduction}</p>
                        <span className={$styles.self_introduction_marks}></span>
                    </motion.div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ContentArea;

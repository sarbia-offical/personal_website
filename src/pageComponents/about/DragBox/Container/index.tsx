import RotatingCursor from '@/components/RotatingCursor';
import { useInViewport } from 'ahooks';
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import BoxHeader from '../../BoxHeader';
import $styles from './index.module.scss';

const Container = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dragBoxRef = useRef<HTMLDivElement>(null);
    const [currentAngle, setCurrentAngle] = useState(0); // 累计旋转角度
    const lastAngleRef = useRef<number>(0); // 上一次鼠标/触摸点对应的角度
    const [boxHeaderTitle] = useState<string>('Press 1s & Drag Me');
    const [inViewport, ratio] = useInViewport(() => containerRef.current, {
        threshold: Array.from({ length: 10 })
            .fill({})
            .map((_, index) => index * 0.1),
    });

    const calculateAngle = useCallback((x: number, y: number) => {
        if (!dragBoxRef.current) return;

        // 获取元素中心点
        const rect = dragBoxRef.current.getBoundingClientRect();
        const boxCenterX = rect.left + rect.width / 2;
        const boxCenterY = rect.top + rect.height / 2;

        // 计算鼠标/触摸点与元素中心的夹角
        const angle = Math.atan2(y - boxCenterY, x - boxCenterX) * (180 / Math.PI);

        // 将角度范围转换为 0 ~ 360
        const normalizedAngle = angle < 0 ? angle + 360 : angle;

        // 计算角度差（考虑跨越 0/360 度修正）
        let deltaAngle = normalizedAngle - lastAngleRef.current;
        if (deltaAngle > 180) deltaAngle -= 360; // 顺时针修正
        if (deltaAngle < -180) deltaAngle += 360; // 逆时针修正

        // 更新上一帧的角度
        lastAngleRef.current = normalizedAngle;

        // 累加旋转角度
        setCurrentAngle((prev) => prev + deltaAngle);
    }, []);

    const handlePointerMove = useCallback(
        (event: MouseEvent | TouchEvent) => {
            if (event instanceof MouseEvent) {
                calculateAngle(event.clientX, event.clientY);
            } else if (event instanceof TouchEvent && event.touches.length > 0) {
                const touch = event.touches[0];
                calculateAngle(touch.clientX, touch.clientY);
            }
        },
        [calculateAngle],
    );

    const clearEvent = () => {
        document.removeEventListener('mousemove', handlePointerMove);
        document.removeEventListener('touchmove', handlePointerMove);
    };

    const handlePointerEnter = useCallback(() => {
        document.addEventListener('mousemove', handlePointerMove);
        document.addEventListener('touchmove', handlePointerMove);
    }, [handlePointerMove]);

    const handlePointerLeave = useCallback(() => {
        clearEvent();
    }, []);

    useEffect(() => {
        return () => {
            clearEvent();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={$styles.viewport}
            onMouseEnter={handlePointerEnter}
            onMouseLeave={handlePointerLeave}
        >
            {inViewport ? (
                <motion.div
                    style={{
                        height: '100%',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: ratio ? 1 : 0 }} // 根据滚动位置控制透明度
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2 }}
                    ref={dragBoxRef}
                    className={$styles.container}
                >
                    <BoxHeader title={boxHeaderTitle} />
                    <div className={$styles.container_icons}>
                        <div
                            className={$styles.rotate_box}
                            style={{
                                rotate: `${currentAngle}deg`,
                            }}
                        >
                            <RotatingCursor />
                            <RotatingCursor />
                        </div>
                    </div>
                </motion.div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Container;

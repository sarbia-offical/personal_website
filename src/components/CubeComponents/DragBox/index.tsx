import type { FC } from 'react';

import { useInViewport } from 'ahooks';
import { useRef } from 'react';

import type { IComponentProps } from '../mapData/type';

import Container from './Container';
import $styles from './index.module.scss';

const DragBox: FC<IComponentProps> = (props: IComponentProps) => {
    const dragBoxRef = useRef<HTMLDivElement>(null);
    const [inViewport] = useInViewport(() => dragBoxRef.current, {
        threshold: Array.from({ length: 10 })
            .fill({})
            .map((_, index) => index * 0.1),
    });

    /**
     * 处理高频鼠标移动的节流函数
     */

    return (
        <div className={$styles.drag_box} ref={dragBoxRef}>
            {inViewport ? <Container /> : <></>}
        </div>
    );
};

export default DragBox;

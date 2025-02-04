import { FC, useRef } from "react";
import { IComponentProps } from "../mapData/type";
import $styles from "./index.module.scss"
import { useInViewport } from "ahooks";
import _ from "lodash"
import Container from "./Container";

const DragBox: FC<IComponentProps> = (props: IComponentProps) => {
    const dragBoxRef = useRef<HTMLDivElement>(null);
    const [inViewport] = useInViewport(() => dragBoxRef.current, {
        threshold: new Array(10).fill({}).map((_, index) => index * 0.1),
    });

    /**
     * 处理高频鼠标移动的节流函数
     */


    return (
        <div className={$styles.drag_box} ref={dragBoxRef}>
            {
                inViewport ? <Container/> : <></>
            }
        </div>
    )
}

export default DragBox;
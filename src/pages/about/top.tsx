import { FC, useCallback, useEffect, useRef } from "react";
import { useCursorDirection } from "@/hooks/useCursorDirection";
import $styles from "./top.module.scss"
import _ from "lodash";

export const Top: FC = () => {
    const { cursorAngle, mouseMove } = useCursorDirection();
    // const { cursorAngle } = useCursorDirection();
    const textRef = useRef<any>(null);
    useEffect(() => {
        if (textRef.current) {
            const ele = (textRef.current as unknown as HTMLImageElement);
            if (ele && cursorAngle) {
                let shadowX = Math.cos(cursorAngle * Math.PI / 180) * 2;
                let shadowY = Math.sin(cursorAngle * Math.PI / 180) * 2;
                ele.style.textShadow = `${shadowX}px ${shadowY}px 1px var(--foreground), 
                        1px 1px 1px var(--foreground), 
                        1px 1px 1px var(--foreground), 
                        1px 1px 1px var(--foreground)`;
            }
        }
    }, [textRef.current, cursorAngle]);
    /**
     * 处理高频鼠标移动的节流函数
     */
    const handleMouseMove = useCallback(_.throttle((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        mouseMove(e.clientX, e.clientY);
    }, 100), [])

    return (
        <div className={$styles.top} onMouseMove={handleMouseMove}>
            <div className={$styles.top_lines}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={$styles.top_inner}>
                {/* <h1 className={$styles.top_inner_title}>響應式,</h1>
                <h1 className={$styles.top_inner_title}>拖&拽,</h1>
                <h1 className={$styles.top_inner_title}>個人小站</h1> */}
                <p className={$styles.top_inner_title}>RESPONSIVE,</p>
                <p className={$styles.top_inner_title} ref={textRef}>D&D,</p>
                <p className={$styles.top_inner_title}>PERSONAL WEBSITE</p>
            </div>
        </div>
    )
}

export default Top;
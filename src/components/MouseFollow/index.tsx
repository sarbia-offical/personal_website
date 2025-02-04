import React, { useCallback, useEffect, useMemo, useRef } from "react";
import $styles from "./index.module.scss";
import { ICursor, ILastCursor } from "./type";
import { useMouse } from "ahooks";
import _ from "lodash";
import { lerp } from "@/utils";
import { useAppInfoContext } from "@/zustand/hooks";
import { AppInfoState, CursorPointType } from "@/zustand/type";

const MouseFollow: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const currentCursor = useRef<ICursor>({ clientX: -100, clientY: -100 });
  const lastCursor = useRef<ILastCursor>({ lastX: -99, lastY: -99 });
  const mouse = useMouse();
  const pointerStatus = useAppInfoContext<CursorPointType>(
    (state: AppInfoState) => state.pointerStatus
  );

  const render = () => {
    const { clientX = 0, clientY = 0 } = currentCursor.current;
    const { lastX = 0, lastY = 0 } = lastCursor.current;
    const delta = 0.8;
    const formatLastX = lerp(lastX, clientX, delta);
    const formatLastY = lerp(lastY, clientY, delta);
    const ele = cursorRef.current as HTMLDivElement;
    if (ele) {
      const x = isNaN(formatLastX) ? -100 : formatLastX;
      const y = isNaN(formatLastY) ? -100 : formatLastY;
      ele.style.transform = `translate(${x}px, ${y}px)`;
      lastCursor.current = {
        lastX: x,
        lastY: y,
      };
    }
  };

  const throttleMouseMove = useRef(
    _.throttle((clientX: number, clientY: number) => {
      currentCursor.current = {
        clientX,
        clientY,
      };
      render();
    }, 50)
  );

  // 移动端的触摸事件处理
  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch && pointerStatus === CursorPointType.normal) {
        throttleMouseMove.current(touch.clientX, touch.clientY);
      }
    },
    [pointerStatus]
  );

  useEffect(() => {
    const { clientX, clientY } = mouse;
    if (pointerStatus === CursorPointType.normal) {
      throttleMouseMove.current(clientX, clientY);
    }
  }, [mouse, pointerStatus]);

  useEffect(() => {
    // 添加触摸事件监听
    document.addEventListener("touchmove", handleTouchMove);
    return () => {
      // 清理触摸事件监听
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleTouchMove]);

  const className = useMemo(
    () => [$styles.cursor_hide, $styles.cursor_long_press, ""][pointerStatus],
    [pointerStatus]
  );

  return (
    <div className={`${$styles.cursor} ${className}`} ref={cursorRef}>
      <div className={$styles.cursor_inner} />
    </div>
  );
};

export default MouseFollow;
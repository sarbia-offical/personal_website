import { useRef, useState } from 'react';

import type { ICursor } from './type';

export const useCursorDirection = () => {
    const [cursorAngle, setCursorAngle] = useState<number>(0);

    const currentCursor = useRef<ICursor>({ clientX: 0, clientY: 0 });
    const lastCursor = useRef<ICursor>({ clientX: 0, clientY: 0 });
    const lastCursorAngle = useRef<number>(0);

    // 重置角度逻辑
    const resetAngle = (_lastCursorAngle: number, _cursorAngle: number) => {
        while (Math.abs(_lastCursorAngle - _cursorAngle) > 180) {
            if (_cursorAngle > _lastCursorAngle) {
                _cursorAngle -= 360;
            } else if (_cursorAngle < _lastCursorAngle) {
                _cursorAngle += 360;
            }
        }
        return _cursorAngle - 90;
    };

    // 计算角度回调函数
    const calculateAngle = () => {
        const { clientX, clientY } = currentCursor.current;
        const { clientX: lastClientX, clientY: lastClientY } = lastCursor.current;
        const delt = {
            x: lastClientX - clientX,
            y: lastClientY - clientY,
        };
        if (Math.abs(delt.x) < 10 && Math.abs(delt.y) < 10) return;

        let angle = (Math.atan2(delt.y, delt.x) * 180) / Math.PI;
        angle = resetAngle(lastCursorAngle.current, angle);

        setCursorAngle(angle);
        lastCursorAngle.current = angle;
        lastCursor.current = {
            clientX,
            clientY,
        };
    };

    const mouseMove = (clientX: number, clientY: number) => {
        currentCursor.current = {
            clientX,
            clientY,
        };
        if (lastCursor.current.clientX === 0 && lastCursor.current.clientY === 0) {
            lastCursor.current = { ...currentCursor.current };
        }
        calculateAngle();
    };

    return { cursorAngle, mouseMove };
};

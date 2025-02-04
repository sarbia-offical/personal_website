import { DragOverlay } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
// DragOverlayWrapper.tsx
import { createPortal } from 'react-dom';

import type { DragOverlayWrapperProps } from './type';

const DragOverlayWrapper: React.FC<DragOverlayWrapperProps> = (props: DragOverlayWrapperProps) => {
    const { children, ...otherProps } = props;
    const [isClient, setIsClient] = useState(false);

    // 在客户端渲染后设置状态
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // 在服务器端不渲染
    }
    return (
        <>{createPortal(<DragOverlay {...otherProps}>{children}</DragOverlay>, document.body)}</>
    );
};

export default DragOverlayWrapper;

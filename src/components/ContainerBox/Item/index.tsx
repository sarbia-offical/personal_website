import { omit } from 'lodash';
import React, { forwardRef } from 'react';

import $styles from './index.module.scss';

interface IItemProps {
    size?: string;
    style?: React.CSSProperties;
    dragOverlay?: boolean;
    children?: React.ReactNode;
}

const Item = forwardRef<HTMLDivElement, IItemProps>((props: IItemProps, ref) => {
    const { size, style, dragOverlay, children } = props;

    return (
        <div
            ref={ref}
            className={`${$styles.item} ${$styles[`item_${size}`]} ${dragOverlay ? $styles.drag_grabbing : $styles.drag_grab}`}
            style={{
                ...style,
            }}
            {...omit(props, 'dragOverlay')}
        >
            <div className={`${$styles.item_inner}`}>{children}</div>
        </div>
    );
});
export default Item;

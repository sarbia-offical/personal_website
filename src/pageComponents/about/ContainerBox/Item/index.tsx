import React, { forwardRef } from 'react';

import $styles from './index.module.scss';

interface IItemProps {
    size?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

const Item = forwardRef<HTMLDivElement, IItemProps>((props: IItemProps, ref) => {
    const { size, style, children } = props;

    return (
        <div
            ref={ref}
            className={`${$styles.item} ${$styles[`item_${size}`]}`}
            style={{
                ...style,
            }}
        >
            <div className={`${$styles.item_inner}`}>{children}</div>
        </div>
    );
});
export default Item;

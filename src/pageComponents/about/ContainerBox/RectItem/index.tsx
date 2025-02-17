import type { UniqueIdentifier } from '@dnd-kit/core';

import React from 'react';

import Item from '../Item';

interface RectItemProps {
    id: UniqueIdentifier;
    size: string;
    children?: React.ReactNode;
}

const RectItem = (props: RectItemProps) => {
    const { children, size } = props;
    return <Item size={size}>{children}</Item>;
};

export default RectItem;

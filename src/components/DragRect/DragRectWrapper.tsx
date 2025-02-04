import type { FC } from 'react';

import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import React from 'react';

import type { DndWrapperProps } from './type';

const DragRectWrapper: FC<DndWrapperProps> = (props: DndWrapperProps) => {
    const { children, onDragStart, onDragOver, onDragEnd, onDragCancel, ...otherProps } = props;
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                delay: 1000,
                tolerance: 5,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 1000,
                tolerance: 5,
            },
        }),
    );
    return (
        <DndContext
            autoScroll
            sensors={sensors}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            onDragCancel={onDragCancel}
            {...otherProps}
        >
            {children}
        </DndContext>
    );
};
export default DragRectWrapper;

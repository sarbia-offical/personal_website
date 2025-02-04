import React, { FC } from "react";
import { DndWrapperProps } from "./type"
import { DndContext, useSensors, useSensor, MouseSensor, TouchSensor } from "@dnd-kit/core";

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
        })
    );
    return (
        <DndContext
            autoScroll={true}
            sensors={sensors}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            onDragCancel={onDragCancel}
            { ...otherProps }
        >
            {children}
        </DndContext>
    );   
}
export default DragRectWrapper;
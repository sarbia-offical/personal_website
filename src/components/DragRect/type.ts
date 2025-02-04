import {
    DragStartEvent, 
    DragOverEvent, 
    DragEndEvent, 
    DragCancelEvent,
    DndContextProps,
    UniqueIdentifier,
    DragOverlayProps
} from "@dnd-kit/core";

import { SortableContextProps } from "@dnd-kit/sortable";
import React from "react";

export interface DndWrapperProps extends Partial<DndContextProps>{
    children: React.ReactNode,
    onDragStart: (event: DragStartEvent) => void,
    onDragOver?: (event: DragOverEvent) => void,
    onDragEnd: (event: DragEndEvent) => void,
    onDragCancel: (event: DragCancelEvent) => void
}

export interface SortableWrapperProps extends Partial<SortableContextProps>{
    items: UniqueIdentifier[],
    children: React.ReactNode
}

export interface DragOverlayWrapperProps extends Partial<DragOverlayProps>{
    children: React.ReactNode
}
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import $styles from "./index.module.scss"
import Item from "../Item";
import React from "react";

interface RectItemProps {
    id: UniqueIdentifier,
    size: string,
    activeId: UniqueIdentifier | null,
    direction?: 'left' | 'right',
    children?: React.ReactNode
}


const RectItem = (props: RectItemProps) => {
    const { id, activeId, direction, children, size } = props;
    const { listeners, setNodeRef, transform, transition } = useSortable({
        id
    });
    return (
            <Item
                ref={setNodeRef}
                size={size}
                {...listeners}
                style={{
                    transform: CSS.Translate.toString(transform),
                    transition,
                }}
            >
                <div className={activeId === id ? $styles.drag_active : ''}>
                    <div className={`${$styles.drag_active_progress_bar} ${direction === 'left' ? `${$styles.animate_lr}` : `${$styles.animate_rl}`}`}></div>
                </div>
                { children }
            </Item>
    );
};

export default RectItem;
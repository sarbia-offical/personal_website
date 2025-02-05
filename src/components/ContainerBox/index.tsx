import type { AppInfoState } from '@/zustand/type';
import type { Active, DragMoveEvent, DragStartEvent, Over, UniqueIdentifier } from '@dnd-kit/core';

import { DragOverlayWrapper, DragRectWrapper, DragSortableWrapper } from '@/components/DragRect';
import cubeList from '@/mock/cubeList';
import { useAppInfoContext } from '@/zustand/hooks';
import { CursorPointType } from '@/zustand/type';
import { arrayMove } from '@dnd-kit/sortable';
import { useLongPress } from 'ahooks';
import { useCallback, useMemo, useRef, useState } from 'react';

import type { IComponentProps } from '../CubeComponents/mapData/type';

import { getCubecomponentListById } from '../CubeComponents/mapData';
import $styles from './index.module.scss';
import Item from './Item';
import RectItem from './RectItem';

const ContainerBox = () => {
    const [items, setItems] = useState<IComponentProps[]>(cubeList.data.setting);
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [dragClientX, setDragClientX] = useState<number | null>(null);
    const [direction, setDirection] = useState<'left' | 'right' | null>(null);
    const sortTableRef = useRef<HTMLDivElement>(null);
    const changeDragStatus = useAppInfoContext((state: AppInfoState) => state.changeDragStatus);
    const changePointerStatus = useAppInfoContext(
        (state: AppInfoState) => state.changePointerStatus,
    );

    /**
     * 长按加载
     */
    useLongPress(
        () => {
            changePointerStatus(CursorPointType.LongPress);
        },
        sortTableRef,
        {
            onLongPressEnd() {
                changePointerStatus(CursorPointType.normal);
            },
        },
    );

    const handleDragStart = useCallback(
        (event: DragStartEvent) => {
            const { active, activatorEvent } = event;
            if (!active) {
                return;
            }
            const clientX = (activatorEvent as MouseEvent).clientX;
            if (dragClientX === null) {
                setDragClientX(clientX);
            }
            setActiveId(active.id);
            changeDragStatus(true);
            setTimeout(() => {
                changePointerStatus(CursorPointType.HideCursorPoint);
            }, 100);
        },
        [dragClientX],
    );

    const handleDragEnd = useCallback(() => {
        setActiveId(null);
        changeDragStatus(false);
        changePointerStatus(CursorPointType.normal);
    }, [activeId]);

    const handleDragOver = useCallback(
        (event: DragMoveEvent) => {
            const { active, over } = event;
            if (!over) return;
            const _items = handleMove(active, over);
            _items && setItems(_items);
        },
        [items],
    );

    const handleMove = (active: Active, over: Over) => {
        if (active.id !== over.id) {
            const oldIndex = items.findIndex((i) => i.id === active.id);
            const newIndex = items.findIndex((i) => i.id === over.id);
            return arrayMove(items, oldIndex, newIndex);
        }
        return null;
    };

    const handleDragOverlayMove = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            const { clientX } = event;
            if (dragClientX && clientX > dragClientX) {
                setDirection('right');
            } else if (dragClientX && clientX < dragClientX) {
                setDirection('left');
            }
            setDragClientX(clientX);
        },
        [dragClientX],
    );

    const activeItem = useMemo(() => items.find((item) => item.id === activeId), [items, activeId]);

    return (
        <div>
            <DragRectWrapper
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragEnd}
            >
                <DragSortableWrapper items={items.map((item) => item.id)}>
                    <div className={$styles.sort_table} ref={sortTableRef}>
                        {items.map((item) => {
                            const { Component } =
                                getCubecomponentListById(item.componentId || '') || {};
                            return (
                                <RectItem
                                    key={item.id}
                                    activeId={activeId}
                                    direction={direction as 'left' | 'right'}
                                    {...item}
                                >
                                    {Component ? <Component {...item} /> : <></>}
                                </RectItem>
                            );
                        })}
                    </div>
                </DragSortableWrapper>
                <DragOverlayWrapper>
                    {activeId != null ? (
                        <div
                            onMouseMove={handleDragOverlayMove}
                            style={{
                                opacity: 0.9,
                            }}
                        >
                            <Item size={activeItem?.size} dragOverlay />
                        </div>
                    ) : null}
                </DragOverlayWrapper>
            </DragRectWrapper>
        </div>
    );
};

export default ContainerBox;

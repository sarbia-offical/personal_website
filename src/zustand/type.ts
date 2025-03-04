export enum CursorPointType {
    'HideCursorPoint',
    'LongPress',
    'normal',
}

/**
 * position 当前鼠标位置
 * dragStatus 拖拽状态
 * hideCursorPoint 隐藏光标状态
 */
export interface AppInfoOptions {
    dragStatus: boolean;
    pointerStatus: CursorPointType;
}

export interface AppInfoActions {
    changeDragStatus: (value: boolean) => void;
    changePointerStatus: (value: CursorPointType) => void;
}

export type AppInfoState = AppInfoOptions & AppInfoActions;

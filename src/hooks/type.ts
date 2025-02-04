export interface ICursor{
    clientX: number,
    clientY: number,
}
export interface ILastCursor{
    lastX: number,
    lastY: number
}
export enum DeviceEnum {
    MOBILE = "mobile",
    TABLET = "tablet",
    DESKTOP = "desktop",
}
export type ScrollHeightType = number | string | HTMLElement;
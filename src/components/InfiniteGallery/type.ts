export interface cell {
    col: number; // x轴
    row: number; // y轴
}
export interface IProps {
    cols?: number;
    rows?: number;
    imgMargin?: number;
    imgData: string[];
}

export interface IImageData {
    img: HTMLImageElement;
    imgSrc: string;
    targetX: number;
    targetY: number;
    x: number;
    y: number;
}

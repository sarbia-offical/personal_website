export interface cell {
    col: number; // x轴
    row: number; // y轴
}

export interface ImgData {
    previewImageSrc: string;
    originImageSrc: string;
}

export interface IProps {
    cols?: number;
    rows?: number;
    imgMargin?: number;
    imgData: ImgData[];
}

export interface IImageData {
    img: HTMLImageElement;
    detail: ImgData;
    targetX: number;
    targetY: number;
    x: number;
    y: number;
}

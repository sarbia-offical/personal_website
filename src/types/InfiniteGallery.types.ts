export interface cell {
    col: number; // x轴
    row: number; // y轴
}

export interface ImgData {
    previewImageSrc: string;
    originImageSrc: string;
}

export interface IProps {
    isMobileDevice: boolean;
    imgData: ImgData[];
    cols?: number;
    rows?: number;
    imgMargin?: number;
}

export interface IImageData {
    img: HTMLImageElement;
    detail: ImgData;
    targetX: number;
    targetY: number;
    x: number;
    y: number;
}

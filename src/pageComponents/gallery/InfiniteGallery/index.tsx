import type { cell, IImageData, IProps } from '@/types/InfiniteGallery.types';
import type { FC } from 'react';

import MouseFollow from '@/components/MouseFollow';
import {
    BORDER_RADIUS,
    COLS,
    FRAME_TIME,
    IMG_HEIGHT,
    IMG_HEIGHT_MOBILE,
    IMG_MARGIN,
    IMG_WIDTH,
    IMG_WIDTH_MOBILE,
    MAX_DIFF,
    MIN_DIFF,
    ROWS,
} from '@/constants/InfiniteGallery.constants';
import { AnimatePresence } from 'framer-motion';
import { isNil, throttle } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

import ImgDetail from '../ImgDetail';
import ImgMask from '../ImgMask';
import $styles from './index.module.scss';

const InfiniteGallery: FC<IProps> = (props: IProps) => {
    const { cols = COLS, rows = ROWS, imgMargin = IMG_MARGIN, imgData, isMobileDevice } = props;
    const galleryRef = useRef<HTMLCanvasElement>(null);
    const galleryCtxRef = useRef<CanvasRenderingContext2D | null>(null);
    const animationFrameIdRef = useRef<number | null>(null);
    // 新增触摸起始位置ref
    const touchStartPos = useRef<{ x: number; y: number } | null>(null);
    // 新增最近触摸位置ref（用于计算增量）
    const lastTouchPos = useRef<{ x: number; y: number } | null>(null);
    // 存储按下时的事件
    const mouseDownTime = useRef<number>(0);
    // 存储需要绘制的图片信息
    const imageDataRef = useRef<IImageData[]>([]);
    const [imgInfo, setImgInfo] = useState<IImageData | null>(null);
    const totalWidth: number =
        cols * ((isMobileDevice ? IMG_WIDTH : IMG_WIDTH_MOBILE) + imgMargin) - imgMargin;
    const totalHeight: number =
        rows * ((isMobileDevice ? IMG_HEIGHT : IMG_HEIGHT_MOBILE) + imgMargin) - imgMargin;
    const imgWidth: number = isMobileDevice ? IMG_WIDTH : IMG_WIDTH_MOBILE;
    const imgHeight: number = isMobileDevice ? IMG_HEIGHT : IMG_HEIGHT_MOBILE;
    const [moveable, setMoveable] = useState<boolean>(false);
    // 绘制图片网格
    const [grid] = useState<cell[][]>(
        Array.from({ length: rows })
            .fill(null)
            .map((_, row) =>
                Array.from({ length: cols })
                    .fill(null)
                    .map((_, col) => ({ row, col })),
            ),
    );

    // 绘制圆角矩形
    const drawRoundedRect = (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        radius: number,
    ) => {
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, radius);
        ctx.closePath();
    };

    // 绘制圆角图片
    const drawRoundedImage = (
        ctx: CanvasRenderingContext2D,
        img: HTMLImageElement,
        x: number,
        y: number,
        imgWidth: number,
        imgHeight: number,
    ) => {
        if (!ctx) return;
        ctx.save();
        ctx.beginPath();
        drawRoundedRect(ctx, x, y, imgWidth, imgHeight, BORDER_RADIUS);
        ctx.clip();
        ctx.drawImage(img, x, y, imgWidth, imgHeight);
        ctx.restore();
    };

    // 图片网格绘制
    const drawGrid = async (ctx: CanvasRenderingContext2D) => {
        const list: IImageData[] = [];
        const loadPromises = grid.flatMap((arr) =>
            arr.map(
                ({ row, col }) =>
                    new Promise<void>((resolve) => {
                        const yOffset = col % 2 === 0 ? imgMargin : -imgMargin * 2;
                        const imgIndex = row * cols + col;
                        const image = new Image();
                        image.src = imgData[imgIndex].previewImageSrc;
                        image.onload = () => {
                            const x = col * (imgWidth + imgMargin);
                            const y = row * (imgHeight + imgMargin) + yOffset;
                            list.push({
                                img: image,
                                detail: imgData[imgIndex],
                                x,
                                y,
                                targetX: x,
                                targetY: y,
                            });
                            drawRoundedImage(ctx, image, x, y, imgWidth, imgHeight);
                            resolve();
                        };
                    }),
            ),
        );
        await Promise.all(loadPromises);
        imageDataRef.current = list;
    };

    // 平滑移动图像
    const smoothMoveImages = (ctx: CanvasRenderingContext2D, deltaX: number, deltaY: number) => {
        let lastTime = performance.now(); // 记录上次动画帧的时间

        // 更新每个图片的目标位置
        imageDataRef.current = imageDataRef.current.map((item) => {
            let newTargetX = item.targetX + deltaX;
            let newTargetY = item.targetY + deltaY;

            // 边界调整
            // 如果图片到了最右侧，则需要重新挪回到最左
            if (newTargetX > totalWidth - imgWidth) {
                newTargetX -= totalWidth + imgMargin;
            } else if (newTargetX < -imgWidth * 2) {
                newTargetX += totalWidth + imgMargin;
            }

            // 如果图片到了最下侧，则需要重新挪回到最上
            if (newTargetY > totalHeight - imgHeight) {
                newTargetY -= totalHeight + imgMargin;
            } else if (newTargetY < -imgHeight * 2) {
                newTargetY += totalHeight + imgMargin;
            }

            return { ...item, targetX: newTargetX, targetY: newTargetY };
        });

        const animate = (now: number) => {
            const deltaTime = now - lastTime; // 计算两帧之间的时间差
            if (deltaTime < FRAME_TIME) {
                animationFrameIdRef.current = requestAnimationFrame(animate); // 延迟动画帧的请求
                return;
            }
            lastTime = now; // 更新时间戳

            let shouldContinue = false;
            ctx.clearRect(0, 0, totalWidth, totalHeight); // 清除画布

            // 使用 map 更新图像位置
            imageDataRef.current = imageDataRef.current.map((item) => {
                const easeFactor = 0.08; // 缓动因子
                const diffX = item.targetX - item.x;
                const diffY = item.targetY - item.y;

                let newX = item.x + diffX * easeFactor;
                let newY = item.y + diffY * easeFactor;

                // 如果差值过大，则直接进行位置转换
                if (Math.abs(diffX) > MAX_DIFF || Math.abs(diffY) > MAX_DIFF) {
                    newX = item.targetX;
                    newY = item.targetY;
                }

                // 如果差值过小，目标位置间距小于0.5时，直接更新到目标位置
                if (Math.abs(diffX) < MIN_DIFF) {
                    newX = item.targetX;
                }
                if (Math.abs(diffY) < MIN_DIFF) {
                    newY = item.targetY;
                }
                // 绘制图片
                drawRoundedImage(ctx, item.img, newX, newY, imgWidth, imgHeight);
                // 返回更新后的图片信息
                return { ...item, x: newX, y: newY };
            });

            // 判断是否继续动画
            shouldContinue = imageDataRef.current.some((item) => {
                const diffX = item.targetX - item.x;
                const diffY = item.targetY - item.y;
                return Math.abs(diffX) >= MIN_DIFF || Math.abs(diffY) >= MIN_DIFF;
            });

            // 根据判断继续或结束动画
            if (shouldContinue) {
                animationFrameIdRef.current = requestAnimationFrame(animate);
            } else {
                animationFrameIdRef.current = null;
            }
        };

        if (!animationFrameIdRef.current) {
            animationFrameIdRef.current = requestAnimationFrame(animate); // 启动动画
        }
    };

    const handleCanvasMouseDown = useCallback(() => {
        mouseDownTime.current = performance.now();
        setMoveable(true);
    }, []);

    const handleCanvasMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const { clientX, clientY } = e;
        const duration = performance.now() - mouseDownTime.current;
        if (duration < 200) {
            checkImg(clientX, clientY);
        }
        setMoveable(false);
    }, []);

    const handleCanvasMouseLeave = useCallback(() => {
        setMoveable(false);
    }, []);

    const handleCanvasMouseMove = useCallback(
        throttle((e: React.MouseEvent<HTMLCanvasElement>) => {
            if (!moveable) {
                return;
            }
            const { movementX, movementY } = e;
            if (galleryCtxRef.current) {
                smoothMoveImages(galleryCtxRef.current, movementX, movementY);
            }
        }, FRAME_TIME),
        [moveable, imgWidth, imgHeight],
    );

    // 新增触摸事件处理
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        const touch = e.touches[0];
        touchStartPos.current = { x: touch.clientX, y: touch.clientY };
        lastTouchPos.current = { x: touch.clientX, y: touch.clientY };
        setMoveable(true);
    }, []);

    const handleTouchMove = useCallback(
        throttle((e: React.TouchEvent) => {
            if (!lastTouchPos.current || !moveable) return;

            const touch = e.touches[0];
            const deltaX = touch.clientX - lastTouchPos.current.x;
            const deltaY = touch.clientY - lastTouchPos.current.y;

            lastTouchPos.current = { x: touch.clientX, y: touch.clientY };
            if (galleryCtxRef.current) {
                smoothMoveImages(galleryCtxRef.current, deltaX, deltaY);
            }
        }, FRAME_TIME),
        [moveable],
    );

    const handleTouchEnd = useCallback(() => {
        touchStartPos.current = null;
        lastTouchPos.current = null;
        setMoveable(false);
    }, []);

    const checkImg = useCallback((x: number, y: number) => {
        const list = imageDataRef.current;
        if (isNil(list) || list.length === 0) {
            return;
        }
        const img = list.find(
            (item: IImageData) =>
                x >= item.x && x < item.x + imgWidth && y >= item.y && y < item.y + imgHeight,
        );
        if (img) {
            setImgInfo(img);
        }
    }, []);

    const handleClose = useCallback(() => {
        setImgInfo(null);
    }, []);

    useEffect(() => {
        const canvasEle = galleryRef.current;
        if (!canvasEle) {
            return;
        }
        canvasEle.width = totalWidth;
        canvasEle.height = totalHeight;
        const ctx = canvasEle.getContext('2d');
        if (!ctx) {
            return;
        }
        galleryCtxRef.current = ctx;
        drawGrid(ctx);
    }, [imgData]);

    useEffect(() => {
        return () => {
            animationFrameIdRef.current && cancelAnimationFrame(animationFrameIdRef.current);
        };
    }, []);
    return (
        <div className={$styles.gallery}>
            <canvas
                className={$styles.canvas}
                ref={galleryRef}
                /* 鼠标事件 */
                onMouseDown={handleCanvasMouseDown}
                onMouseUp={handleCanvasMouseUp}
                onMouseMove={handleCanvasMouseMove}
                onMouseLeave={handleCanvasMouseLeave}
                /* 触摸事件 */
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
            ></canvas>
            {/* 鼠标跟随 */}
            {isMobileDevice ? <MouseFollow /> : <></>}

            <AnimatePresence mode="wait">
                {/* 详情遮罩 */}
                {!!imgInfo && <ImgMask />}
            </AnimatePresence>
            <AnimatePresence mode="wait">
                {/* 查看单图 */}
                {!!imgInfo && <ImgDetail imgInfo={imgInfo} handleClose={handleClose} />}
            </AnimatePresence>
        </div>
    );
};
export default InfiniteGallery;

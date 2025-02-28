import type { FC } from 'react';

import $styles from './index.module.scss';

const RotatingCursor: FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="68"
            viewBox="0 0 56 68"
            xlinkHref="http://www.w3.org/1999/xlink"
            className={$styles.svg}
        >
            <defs>
                <path
                    id="a"
                    d="M28.15 30.01c-2.916 0-3.322-.818-2.63-1.6l7.52-7.49c1.317-1.32 1.278-3.5-.09-4.868-1.365-1.368-3.54-1.407-4.858-.088l-8.925 8.94S10.534 32.932 8 32.932v19.96c4.18 0 10.71 6.105 16.997 6.105 6.288 0 12.06-.016 12.06-.016 1.632 0 2.955-1.34 2.955-2.99 0-1.65-1.318-2.985-2.946-2.99h2.064c2.142 0 3.878-1.796 3.878-4.01 0-2.216-1.736-4.01-3.878-4.01h2.996c2.142 0 3.878-1.79 3.878-3.995 0-2.206-1.736-3.994-3.878-3.994H61.44c1.968 0 3.563-1.562 3.563-3.49.002-1.93-1.594-3.49-3.562-3.49H28.15z"
                />
                <filter
                    id="b"
                    width="200%"
                    height="200%"
                    x="-50%"
                    y="-50%"
                    filterUnits="objectBoundingBox"
                >
                    <feMorphology
                        radius="3"
                        operator="dilate"
                        in="SourceAlpha"
                        result="shadowSpreadOuter1"
                    />
                    <feOffset dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
                    <feGaussianBlur
                        stdDeviation="1"
                        in="shadowOffsetOuter1"
                        result="shadowBlurOuter1"
                    />
                    <feComposite
                        in="shadowBlurOuter1"
                        in2="SourceAlpha"
                        operator="out"
                        result="shadowBlurOuter1"
                    />
                    <feColorMatrix
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.582908741 0"
                        in="shadowBlurOuter1"
                        result="shadowMatrixOuter1"
                    />
                    <feMorphology
                        radius="3"
                        operator="dilate"
                        in="SourceAlpha"
                        result="shadowSpreadOuter2"
                    />
                    <feOffset dy="3" in="shadowSpreadOuter2" result="shadowOffsetOuter2" />
                    <feGaussianBlur
                        stdDeviation="2"
                        in="shadowOffsetOuter2"
                        result="shadowBlurOuter2"
                    />
                    <feComposite
                        in="shadowBlurOuter2"
                        in2="SourceAlpha"
                        operator="out"
                        result="shadowBlurOuter2"
                    />
                    <feColorMatrix
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.179347826 0"
                        in="shadowBlurOuter2"
                        result="shadowMatrixOuter2"
                    />
                    <feMerge>
                        <feMergeNode in="shadowMatrixOuter1" />
                        <feMergeNode in="shadowMatrixOuter2" />
                    </feMerge>
                </filter>
                <mask id="c" width="63.003" height="49.995" x="-3" y="-3">
                    <path fill="#fff" d="M5 12h63.003v49.995H5z" />
                    <use xlinkHref="#a" />
                </mask>
            </defs>
            <g fill="none" fillRule="evenodd" transform="rotate(-90 29.502 40.998)">
                <use fill="#000" filter="url(#b)" xlinkHref="#a" />
                <use fill="#FFF" xlinkHref="#a" />
                <use stroke="#000" strokeWidth="6" mask="url(#c)" xlinkHref="#a" />
            </g>
        </svg>
    );
};

export default RotatingCursor;

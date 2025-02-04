import deepmerge from "deepmerge";

/**
 * 线性插值函数，用作平滑过渡
 * @param a 起始值
 * @param b 结束值
 * @param n 插值系数
 * @returns 
 */
const lerp = (a: number, b: number, n: number): number => {
    return (1 - n) * a + n * b;
};

/**
 * 深度合并
 * @param x 目标对象
 * @param y 源对象
 * @param strategy 策略
 * @returns 
 */
const deepMerge = <T1, T2>
(
    x: Partial<T1>,
    y: Partial<T2>,
    strategy: 'replace' | 'merge' = 'merge'
) => {
    const options: deepmerge.Options = {};
    if(strategy === 'replace'){
        options.arrayMerge = (_d, s, _o) => s
    } else if (strategy === 'merge') {
        options.arrayMerge = (_d, s, _o) => Array.from(new Set([..._d, ...s]));
    }
    return deepmerge(x, y, options);
}

export {
    lerp,
    deepMerge
};
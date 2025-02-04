import { FC } from "react"
import $styles from "./index.module.scss"
import React from "react";

export interface IProps{
    title: string
}

const areEqual = (prevProps: IProps, nextProps: IProps) => {
    return prevProps.title === nextProps.title;  // 只有 title 变化才重新渲染
};

const BoxHeader: FC<IProps> = (props: IProps) => {
    return (
        <p className={$styles.header}>
            {
                props.title
            }
        </p>
    )
}

export default BoxHeader;
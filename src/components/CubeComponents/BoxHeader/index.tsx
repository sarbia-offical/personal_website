import { FC } from "react"
import $styles from "./index.module.scss"
import React from "react";

export interface IProps{
    title: string
}

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
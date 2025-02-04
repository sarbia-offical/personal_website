import type { FC } from 'react';

import React from 'react';

import $styles from './index.module.scss';

export interface IProps {
    title: string;
}

const BoxHeader: FC<IProps> = (props: IProps) => {
    return <p className={$styles.header}>{props.title}</p>;
};

export default BoxHeader;

import cubeList from '@/mock/cubeList';
import { useState } from 'react';

import type { IComponentProps } from '../../../../mapData/type';

import { getCubecomponentListById } from '../../../../mapData';
import $styles from './index.module.scss';
import RectItem from './RectItem';

const ContainerBox = () => {
    const [items] = useState<IComponentProps[]>(cubeList.data.setting);

    return (
        <div>
            <div className={$styles.sort_table}>
                {items.map((item) => {
                    const { Component } = getCubecomponentListById(item.componentId || '') || {};
                    return (
                        <RectItem key={item.id} {...item}>
                            {Component ? <Component {...item} /> : <></>}
                        </RectItem>
                    );
                })}
            </div>
        </div>
    );
};

export default ContainerBox;

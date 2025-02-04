import type { FC } from 'react';

import _, { isNil } from 'lodash';
import Link from 'next/link';
import React from 'react';

import Icon from '../IconComponent';
import Reverse from '../ReverseComponent';
import $styles from './index.module.scss';

export enum TypeEnum {
    'QRCODE' = 'qrcode',
    'EMAIL' = 'email',
    'LINK' = 'link',
}

export interface IList {
    iconPath: string;
    reverseImg?: string;
    text?: string;
    path?: string;
    type?: TypeEnum;
}

export interface IProps {
    list: IList[][];
}

const linkComponent = (text?: string, path?: string, type?: TypeEnum) => {
    return (
        <div className={$styles.link}>
            <Link
                href={`${type === TypeEnum.EMAIL ? `mailto:${path}` : `${path}`} `}
                target={type === TypeEnum.LINK ? '_blank' : ''}
                className={$styles.link_label}
            >
                {text}
            </Link>
        </div>
    );
};
const areEqual = (prevProps: IProps, nextProps: IProps) => {
    return _.isEqual(prevProps.list, nextProps.list);
};

const BoxListComponent: FC<IProps> = (props: IProps) => {
    const { list } = props;
    return list && list.length ? (
        <>
            {list.map((items, index) => (
                <div
                    className={`${$styles.item_box} ${items.length === 1 ? $styles.large_box : ''}`}
                    key={index}
                >
                    {items.map((item, _i) => (
                        <div className={$styles.item_box_item} key={item.iconPath}>
                            <div className={$styles.item_box_item_inner}>
                                <div className={$styles.item_box_item_inner_front}>
                                    <Icon iconPath={item.iconPath} />
                                </div>
                                <div className={$styles.item_box_item_inner_reverse}>
                                    {item.reverseImg ? (
                                        <Reverse reverseImg={item.reverseImg} />
                                    ) : (
                                        <></>
                                    )}
                                    {!isNil(item.path) ? (
                                        linkComponent(item.text, item.path, item.type)
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </>
    ) : (
        <></>
    );
};

export default React.memo(BoxListComponent, areEqual);

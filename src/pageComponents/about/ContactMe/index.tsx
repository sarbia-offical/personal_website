import type { IComponentProps } from '@/mapData/type';
import type { FC } from 'react';

import { useInViewport } from 'ahooks';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

import BoxHeader from '../BoxHeader';
import BoxListComponent from './BoxListComponent';
import $styles from './index.module.scss';

export interface IList {
    iconPath: string;
    frontIcon: string;
    reverseIcon: string;
    text: string;
    path: string;
}

const ContactMe: FC<IComponentProps> = (props: IComponentProps) => {
    const contactMeRef = useRef<HTMLDivElement>(null);
    const [boxHeaderTitle] = useState<string>('Social Accounts');
    const [inViewport, ratio] = useInViewport(() => contactMeRef.current, {
        threshold: Array.from({ length: 10 })
            .fill({})
            .map((_, index) => index * 0.1),
    });
    const [list, setList] = useState<IList[][]>([]);

    useEffect(() => {
        const items = (props?.options || {}).list?.value;
        const groupData: IList[][] = [];
        for (let i = 0; i < items.length; i += 2) {
            groupData.push(items.slice(i, i + 2));
        }
        setList(groupData);
    }, [props]);
    return (
        <div className={$styles.contact_me} ref={contactMeRef}>
            {inViewport ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: ratio ? 1 : 0 }} // 根据滚动位置控制透明度
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2 }}
                    className={$styles.container}
                >
                    <BoxHeader title={boxHeaderTitle} />
                    <BoxListComponent list={list} />
                </motion.div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ContactMe;

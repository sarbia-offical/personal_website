import type { FC } from 'react';

import { isNil } from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { IComponentProps } from '../mapData/type';

import ContentArea from './ContentArea';
import $styles from './index.module.scss';

const AboutMe: FC<IComponentProps> = (props: IComponentProps) => {
    const { options } = props;
    const [selfIntroduction, setSelfIntroduction] = useState<any>([]);
    // const selfIntroduction = options?.text?.value;
    useEffect(() => {
        const { text, link } = options ?? {};
        if (isNil(text) || isNil(link)) {
            return;
        }
        const textValue = text.value as string;
        const linkValue = link.value;
        if (!isNil(textValue) && !text.hide && !isNil(linkValue) && !link.hide) {
            const parts = textValue.split(/\[\d\]/g);
            const formatStr: (string | JSX.Element)[] = parts
                .map((ele: string, index: number) => {
                    const item = linkValue[index];
                    return [
                        ele,
                        item ? (
                            <Link
                                target="_blank"
                                href={item.value}
                                key={index}
                                className={$styles.link}
                            >
                                <span>{item.label}</span>
                            </Link>
                        ) : (
                            ''
                        ),
                    ];
                })
                .flat();
            setSelfIntroduction(formatStr);
        }
    }, [options]);
    return (
        <div className={$styles.about_me}>
            <ContentArea selfIntroduction={selfIntroduction} />
        </div>
    );
};

export default AboutMe;

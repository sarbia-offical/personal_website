import type { FC } from 'react';

import { isNil } from 'lodash';
import Link from 'next/link';
import React, { forwardRef, useMemo } from 'react';

import type { IComponentProps } from '../mapData/type';

import ContentArea from './ContentArea';
import $styles from './index.module.scss';

interface IJumpLinkProps {
    label: React.ReactNode;
    value: string;
}

type ILinkProps = Omit<React.ComponentProps<typeof Link>, 'href'> & IJumpLinkProps;

const JumpLink = forwardRef<HTMLAnchorElement, ILinkProps>(
    ({ label, value, ...otherProps }, ref) => (
        <Link href={value} className={$styles.link} ref={ref} {...otherProps}>
            <span>{label}</span>
        </Link>
    ),
);
JumpLink.displayName = 'JumpLink';

const AboutMe: FC<IComponentProps> = (props: IComponentProps) => {
    const { options } = props;
    const selfIntroduction = useMemo((): (string | JSX.Element)[] => {
        const { text, link } = options ?? {};
        if (isNil(text) || isNil(link)) {
            return [];
        }
        const textValue = text.value as string;
        const linkValue = link.value;
        const noHide = !isNil(textValue) && !text.hide && !isNil(linkValue) && !link.hide;
        if (noHide) {
            const parts = textValue.split(/\[\d\]/g);
            const formatStr: (string | JSX.Element)[] = parts
                .map((ele: string, index: number) => {
                    const item = linkValue[index];
                    return [
                        ele,
                        item ? (
                            <JumpLink
                                key={index}
                                label={item.label}
                                value={item.value}
                                target="_blank"
                            />
                        ) : (
                            ''
                        ),
                    ];
                })
                .flat();
            return formatStr;
        }
        return [];
    }, [options]);

    return (
        <div className={$styles.about_me}>
            <ContentArea selfIntroduction={selfIntroduction} />
        </div>
    );
};

export default AboutMe;

import type { FC } from 'react';

import dynamic from 'next/dynamic';

import $styles from './index.module.scss';

export interface IProps {
    iconPath: string;
}

const Icon: FC<IProps> = (props: IProps) => {
    const { iconPath } = props;
    const Icon = dynamic(() => import(`@@/public/assets/svg/${iconPath}`));
    return (
        <div className={$styles.icon}>
            <Icon />
        </div>
    );
};

export default Icon;

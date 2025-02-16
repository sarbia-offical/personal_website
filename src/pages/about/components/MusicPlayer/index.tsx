import type { FC } from 'react';

import type { IComponentProps } from '../mapData/type';

import $styles from './index.module.scss';

const MusicPlayer: FC<IComponentProps> = (props: IComponentProps) => {
    return (
        <div className={$styles.musicPlayer}>
            <p>music player</p>
            <p>
                to be continued{' '}
                <span style={{ fontStyle: 'italic', color: 'red' }}>{'Ciallo～(∠・ω< )⌒☆'}</span>
            </p>
        </div>
    );
};

export default MusicPlayer;

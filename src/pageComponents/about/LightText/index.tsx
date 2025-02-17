import type { IComponentProps } from '@/mapData/type';
import type { FC } from 'react';

const LightText: FC<IComponentProps> = (props: IComponentProps) => {
    return (
        <div>
            light text
            <p>
                <span style={{ fontStyle: 'italic', color: 'red' }}>{'Ciallo～(∠・ω< )⌒☆'}</span>
            </p>
        </div>
    );
};

export default LightText;

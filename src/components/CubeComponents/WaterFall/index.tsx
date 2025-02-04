import { FC } from "react";
import { IComponentProps } from "../mapData/type";

const WaterFall: FC<IComponentProps> = (props: IComponentProps) => {
    return (
        <div>
            water fall
            <p><span style={{ fontStyle: 'italic', color: 'red' }}>{'Ciallo～(∠・ω< )⌒☆'}</span></p>
        </div>
    )
}

export default WaterFall;
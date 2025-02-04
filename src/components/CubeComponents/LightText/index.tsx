import { FC } from "react";
import { IComponentProps } from "../mapData/type";

const LightText: FC<IComponentProps> = (props: IComponentProps) => {
    return (
        <div>
            light text
            <p><span style={{ fontStyle: 'italic', color: 'red' }}>{'Ciallo～(∠・ω< )⌒☆'}</span></p>
        </div>
    )
}

export default LightText;
import { FC } from "react";
import $styles from "./index.module.scss"

export interface IProps {
    reverseImg?: string
}

const Reverse: FC<IProps> = (props: IProps) => {
    const { reverseImg } = props;

    return (
        <div className={$styles.reverse}>
            <div className={$styles.reverse_img}>
                {
                    reverseImg ? <img src={`/assets/img/${reverseImg}`} /> : <></>
                }
            </div>
        </div>
    )
}

export default Reverse;
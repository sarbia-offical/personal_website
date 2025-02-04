import { FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import $styles from "./index.module.scss"
import { usePathname } from "next/navigation";
import { HrefList, IHrefProps } from "./type";
import { useAppInfoContext } from "@/zustand/hooks";
import { AppInfoState, CursorPointType } from "@/zustand/type";

const CapsuleNavigation: FC<{ hrefList: HrefList, children?: ReactNode }> = ({ hrefList, children }) => {
    
    const [linkTitle, setLinkTitle] = useState<string>('loading...');
    const activeRef = useRef<HTMLDivElement>(null);
    const [left, setLeft] = useState<number>(2);
    const pathName = usePathname();
    const changeHideCursorPoint = useAppInfoContext((state: AppInfoState) => state.changePointerStatus);

    useEffect(() => {
        const title = hrefList.find((fin: IHrefProps) => fin.href === pathName)?.title ?? '';
        const index = hrefList.findIndex((fin: IHrefProps) => fin.href === pathName);
        setLinkTitle(title);
        const translateX = activeRef.current?.clientWidth ?? 2;
        setLeft(index === 0 ? 2 : index * translateX - 2);
    }, [hrefList, pathName, activeRef])

    const handleMouseEnter = useCallback(() => {
        changeHideCursorPoint(CursorPointType.HideCursorPoint);
    }, [])

    const handleMouseLeave = useCallback(() => {
        changeHideCursorPoint(CursorPointType.normal);
    }, [])

    return (
        <div className={$styles.header}>
            <nav className={$styles.navbar} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className={$styles.linkContainer}>
                    {
                        hrefList.map((ele, index) => (
                            <Link key={index} href={ ele.href } className={$styles.linkActive}>{ ele.title }</Link>
                        ))
                    }
                    <div className={$styles.activeHref} ref={activeRef} style={{ 'left': `${left}px` }}>
                        { linkTitle }
                    </div>
                    { children }
                </div>
            </nav>
        </div>
    )
}

export default CapsuleNavigation;
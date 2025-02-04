import React from "react";
import { AboutMe, DragBox, ContactMe, MusicPlayer, WaterFall, LightText } from ".."
import { IComponentProps } from "./type";

interface ICubeComponentList {
    key: string,
    Component: React.FC<IComponentProps>
}
export const cubeComponentList: Array<ICubeComponentList> = [
    {
        key: 'about-me',
        Component: AboutMe
    },
    {
        key: 'drag-box',
        Component: DragBox
    },
    {
        key: 'contact-me',
        Component: ContactMe
    },
    {
        key: 'music-player',
        Component: MusicPlayer
    },
    {
        key: 'water-fall',
        Component: WaterFall
    },
    {
        key: 'light-text',
        Component: LightText
    }
]

/**
 * 根据组件id查出映射的组件
 * @param componentId 
 * @returns 
 */
export const getCubecomponentListById: (componentId: string) => ICubeComponentList | null = (componentId: string) => cubeComponentList.find(ele => ele.key === componentId) || null;
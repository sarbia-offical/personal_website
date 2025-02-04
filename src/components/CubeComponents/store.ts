import { makeAutoObservable } from "mobx"
import { IComponentProps } from "./mapData/type";

interface ActiveStore {
    previewData: Array<IComponentProps>;
    version: number;
}
class CubeComponentStore {
    activeStore: ActiveStore = {
        previewData: [],
        version: 0,
    }
    constructor() {
        makeAutoObservable(this);
    }
    savePreviewData = (previewData: Array<IComponentProps>) => {
        this.activeStore.previewData = [...previewData];
    }
    get getPreviewData() {
        return this.activeStore.previewData
    }
}
const cubeComponentStore = new CubeComponentStore() 
export default cubeComponentStore;
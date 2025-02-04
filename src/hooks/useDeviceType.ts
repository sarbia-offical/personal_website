import { useState, useEffect } from 'react';
import { throttle } from 'lodash';
import { DeviceEnum } from "./type"
import { MOBILE_DEVICES } from "./constant"

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<DeviceEnum | null>(null);
  
  const checkDeviceType = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const width = window.innerWidth;
    const includeMobileDevice = MOBILE_DEVICES.some((ele: string) => userAgent.includes(ele));
    if(!includeMobileDevice){
        setDeviceType(DeviceEnum.DESKTOP);
    } else {
        if(width <= 768){
            setDeviceType(DeviceEnum.MOBILE);
        } else if(width <= 1024){
            setDeviceType(DeviceEnum.TABLET);
        }
    }
  };

  useEffect(() => {
    const throttledCheckDeviceType = throttle(checkDeviceType, 200);  // 使用节流函数控制触发频率
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);

    return () => {
      window.removeEventListener('resize', throttledCheckDeviceType);
    };
  }, []);
  
  return deviceType;
};

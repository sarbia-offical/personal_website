import { useState, useEffect } from 'react';
import { useScroll } from 'ahooks';
import { ScrollHeightType } from './type';

interface UseVisibleOnScrollProps {
  targetHeight: ScrollHeightType;
}

const useVisibleOnScroll = ({ targetHeight }: UseVisibleOnScrollProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const scroll = useScroll(document);
  const { top = 0 } = scroll ?? {};

  useEffect(() => {
    let targetScrollPosition = 0;

    // 处理不同类型的高度
    if (typeof targetHeight === 'number') {
      targetScrollPosition = targetHeight;
    } else if (typeof targetHeight === 'string' && targetHeight.endsWith('%')) {
      const percentage = parseFloat(targetHeight);
      targetScrollPosition = (document.documentElement.scrollHeight - window.innerHeight) * (percentage / 100);
    } else if (targetHeight instanceof HTMLElement) {
      // 如果是元素，使用该元素的 `offsetTop` 属性
      targetScrollPosition = targetHeight.offsetTop;
    }

    // 判断是否滚动到指定位置
    if (top >= targetScrollPosition) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [top, targetHeight]);

  return isVisible;
};

export default useVisibleOnScroll;
import { useEffect } from 'react';

interface DropZoneCallbacks {
  onDropInside: () => void;
  onDropOutside: () => void;
  onDragOverOutside: () => void; // 新增的回调函数
}

const useDropZone = (className: string, callbacks: DropZoneCallbacks) => {
  useEffect(() => {
    const handleDrop = (event: DragEvent) => {
      event.preventDefault();

      const { mouseX, mouseY } = getMousePosition(event);

      const dropZone = getDropZoneElement(className);
      const isInsideDropZone = isMouseInsideElement(mouseX, mouseY, dropZone);

      if (isInsideDropZone) {
        console.log('drop--inside');
        callbacks.onDropInside();
      } else {
        console.log('drop--outside');
        callbacks.onDropOutside();
      }
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();

      const { mouseX, mouseY } = getMousePosition(event);

      const dropZone = getDropZoneElement(className);
      const isInsideDropZone = isMouseInsideElement(mouseX, mouseY, dropZone);

      if (!isInsideDropZone) {
        callbacks.onDragOverOutside();
      }
    };

    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('drop', handleDrop);

    return () => {
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drop', handleDrop);
    };
  }, [className, callbacks]);

  const getMousePosition = (event: DragEvent) => ({
    mouseX: event.clientX,
    mouseY: event.clientY,
  });

  const getDropZoneElement = (className: string) =>
    document.querySelector(`.${className}`) as HTMLElement;

  const isMouseInsideElement = (x: number, y: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return (
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    );
  };
};

export default useDropZone;

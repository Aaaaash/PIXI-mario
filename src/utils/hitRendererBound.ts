import { LocatableElements } from '../typings/elements';

function hitRendererBound(element: LocatableElements, renderer: LocatableElements): void {
  if (element.x <= 0) {
    element.x = 0;
  }

  if (element.x >= renderer.width - element.width) {
    element.x = renderer.width - element.width;
  }

  if (element.y <= 0) {
    element.y = 0;
  }

  if (element.y >= renderer.height - element.height) {
    element.y = renderer.height - element.height;
  }
}

export default hitRendererBound;

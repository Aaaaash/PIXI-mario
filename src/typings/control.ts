export type Direction = string[] | string | null;

export interface KeyboardControl {
  code?: number;
  isDown?: boolean;
  isUp?: boolean;
  press?: () => void;
  release?: () => void;
  downHandler?: (e: any) => void;
  upHandler?: (e: any) => void;
}

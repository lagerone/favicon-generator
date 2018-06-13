/// <reference types="node" />

declare module 'canvas' {
  export function createCanvas(
    width: number,
    height: number,
    type?: string
  ): HTMLCanvasElement;

  export interface FontFace {
    family: string;
    weight?: string;
    style?: string;
  }

  export function registerFont(src: string, fontFace: FontFace): void;
}

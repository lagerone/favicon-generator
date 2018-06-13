import path from 'path';
import { createCanvas, registerFont } from 'canvas';
import {
  drawRoundedRectangle,
  IRoundRectOptions,
} from './draw-rounded-rectangle';
import { ROOT_PATH } from './config';

registerFont(
  path.join(ROOT_PATH, 'src', 'fonts/OpenSans/OpenSans-Regular.ttf'),
  { family: 'Open Sans' }
);

export interface IIconCanvasOptions {
  widthAndHeight: number;
  backgroundColor: string;
  fontSizePercentage: number;
  fontColor: string;
  textContent: string;
  roundedCornersPercentage: number;
}

function createIconCanvas({
  widthAndHeight,
  backgroundColor,
  fontSizePercentage,
  fontColor,
  textContent,
  roundedCornersPercentage,
}: IIconCanvasOptions): HTMLCanvasElement {
  const canvas: HTMLCanvasElement = createCanvas(
    widthAndHeight,
    widthAndHeight
  );
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

  ctx.fillStyle = backgroundColor;

  drawRoundedRectangle({
    ctx,
    x: 0,
    y: 0,
    width: widthAndHeight,
    height: widthAndHeight,
    radius: widthAndHeight * roundedCornersPercentage,
  } as IRoundRectOptions);

  const fontSize = widthAndHeight * (fontSizePercentage || 0.6);
  ctx.fillStyle = fontColor;
  ctx.font = `normal ${fontSize}px/${fontSize}px "Open Sans"`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.imageSmoothingEnabled = false;
  ctx.fillText(textContent, widthAndHeight / 2, widthAndHeight / 2);

  return canvas;
}

export { createIconCanvas };

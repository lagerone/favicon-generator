interface IRoundRectOptions extends Object {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  fill: boolean;
  stroke: boolean;
}

/**
 * Draws a rounded rectangle using the current state of the canvas.
 *
 * Borrowed from https://stackoverflow.com/a/3368118/975720
 * Thx https://stackoverflow.com/users/227299/juan-mendes
 */
function drawRoundedRectangle({
  ctx,
  x,
  y,
  width,
  height,
  radius,
  fill = true,
  stroke = false,
}: IRoundRectOptions) {
  let radiusSettings = { tl: radius, tr: radius, br: radius, bl: radius };
  ctx.beginPath();
  ctx.moveTo(x + radiusSettings.tl, y);
  ctx.lineTo(x + width - radiusSettings.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radiusSettings.tr);
  ctx.lineTo(x + width, y + height - radiusSettings.br);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radiusSettings.br,
    y + height
  );
  ctx.lineTo(x + radiusSettings.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radiusSettings.bl);
  ctx.lineTo(x, y + radiusSettings.tl);
  ctx.quadraticCurveTo(x, y, x + radiusSettings.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}

export { IRoundRectOptions, drawRoundedRectangle };

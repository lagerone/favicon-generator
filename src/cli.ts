require('dotenv').config();
import path from 'path';
import fse from 'fs-extra';
import { createIconCanvas } from './create-icon-canvas';
import { ROOT_PATH, ICON_SIZES } from './config';
import { writePngFileFromCanvas, writeMarkup } from './file-service';
import { createManifest } from './create-manifest';

const {
  ICON_TEXT,
  ICON_FONT_SIZE,
  ICON_FONT_COLOR,
  ICON_BACKGROUND_COLOR,
  ICON_RADIUS,
} = process.env;
const targetdir = path.join(ROOT_PATH, 'dist');
const iconPromises = ICON_SIZES.map(widthAndHeight => {
  const canvas = createIconCanvas({
    widthAndHeight,
    backgroundColor: ICON_BACKGROUND_COLOR,
    fontSizePercentage: parseFloat(ICON_FONT_SIZE),
    fontColor: ICON_FONT_COLOR,
    textContent: ICON_TEXT,
    roundedCornersPercentage: parseFloat(ICON_RADIUS),
  });
  return writePngFileFromCanvas(
    canvas,
    path.join(targetdir, 'assets', 'favicons'),
    `icon-${widthAndHeight}.png`
  );
});

(async () => {
  try {
    const iconFiles = await Promise.all(iconPromises);
    await writeMarkup(targetdir, iconFiles);
    await fse.writeFile(
      path.join(targetdir, 'assets', 'manifest.json'),
      JSON.stringify(createManifest(), null, 2)
    );
  } catch (error) {
    console.log(error);
  }
})();

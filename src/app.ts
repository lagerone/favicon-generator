import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import { createIconCanvas, IIconCanvasOptions } from './create-icon-canvas';
import { PUBLIC_DIR_PATH, ICON_SIZES } from './config';
import { writePngFileFromCanvas } from './file-service';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

async function createIcon(options: IIconCanvasOptions) {
  const canvas = createIconCanvas(options);
  await writePngFileFromCanvas(
    canvas,
    path.join(PUBLIC_DIR_PATH, 'icons'),
    `icon-${options.widthAndHeight}.png`
  );
}

app.post('/api/icons', async (req, res) => {
  console.log(req.body);
  const {
    textContent,
    fontSizePercentage,
    fontColor,
    backgroundColor,
    roundedCornersPercentage,
  } = req.body;
  const promises = ICON_SIZES.map(widthAndHeight =>
    createIcon({
      widthAndHeight,
      backgroundColor,
      fontSizePercentage: parseFloat(fontSizePercentage),
      fontColor,
      textContent,
      roundedCornersPercentage: parseFloat(roundedCornersPercentage),
    })
  );
  await Promise.all(promises);
  res.send({ payload: ICON_SIZES });
});

export default app;

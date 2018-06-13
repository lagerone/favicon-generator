import fse from 'fs-extra';
import mkdirp from 'mkdirp-promise';
import path from 'path';

function writeMarkup(targetdir: string, iconFiles: string[]) {
  const iconMarkup = iconFiles
    .map(filename => {
      return `<img src="assets/favicons/${filename}" /><br>\n`;
    })
    .join('');
  return fse.writeFile(
    path.join(targetdir, 'index.html'),
    `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/icon-180.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/icon-32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/icon-16.png" />
  <link rel="manifest" href="/assets/manifest.json" />
  <meta name="application-name" content="" />
  <meta name="theme-color" content="">
  <title>Favicons</title>
</head>
<body>
  ${iconMarkup}
</body>
</html>
  `
  );
}

async function writePngFileFromCanvas(
  canvas: HTMLCanvasElement,
  targetdir: string,
  filename: string
) {
  await mkdirp(targetdir);
  const canvasDataUrl = canvas.toDataURL();
  const imageData = canvasDataUrl.replace(/^data:image\/\w+;base64,/, '');
  const imageBuffer = new Buffer(imageData, 'base64');
  await fse.writeFile(path.join(targetdir, filename), imageBuffer);
  return filename;
}

export { writePngFileFromCanvas, writeMarkup };

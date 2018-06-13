import { ICON_SIZES } from './config';

interface IManifestIcon {
  src: string;
  type: string;
  sizes: string;
}

interface IManifest {
  name: string;
  short_name: string;
  theme_color: string;
  background_color: string;
  icons: IManifestIcon[];
  display: string;
  start_url: string;
}

export function createManifest() {
  const manifest: IManifest = {
    name: '',
    short_name: '',
    theme_color: '',
    background_color: '',
    icons: [],
    display: 'standalone',
    start_url: '/?utm_source=homescreen',
  };
  manifest.icons = ICON_SIZES.map(i => ({
    src: `/assets/favicons/icon-${i}.png`,
    type: 'image/png',
    sizes: `${i}x${i}`,
  }));
  return manifest;
}

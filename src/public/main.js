const MANIFEST = {
  name: '',
  short_name: '',
  icons: [
    {
      src: '/assets/favicons/icon-48.png',
      type: 'image/png',
      sizes: '48x48',
    },
    {
      src: '/assets/favicons/icon-96.png',
      type: 'image/png',
      sizes: '96x96',
    },
    {
      src: '/assets/favicons/icon-128.png',
      type: 'image/png',
      sizes: '128x128',
    },
    {
      src: '/assets/favicons/icon-144.png',
      type: 'image/png',
      sizes: '144x144',
    },
    {
      src: '/assets/favicons/icon-152.png',
      type: 'image/png',
      sizes: '152x152',
    },
    {
      src: '/assets/favicons/icon-192.png',
      type: 'image/png',
      sizes: '192x192',
    },
    {
      src: '/assets/favicons/icon-384.png',
      type: 'image/png',
      sizes: '384x384',
    },
  ],
  theme_color: '',
  background_color: '',
  display: 'standalone',
  start_url: '/?utm_source=homescreen',
};
const form = document.querySelector('form');
form.onsubmit = event => {
  event.preventDefault();
  const body = Array.from(document.querySelectorAll('input')).reduce(
    (result, input) => {
      result[input.name] = input.value;
      return result;
    },
    {}
  );
  fetch('/api/icons', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(({ payload }) => {
      const icons = payload.map(
        size => `<img src="icons/icon-${size}.png?${Date.now()}" />`
      );
      document.getElementById(
        'icons'
      ).innerHTML = `<h2>Favicons</h2>${icons.join('\n')}`;
    })
    .then(() => {
      document.getElementById(
        'manifest'
      ).innerHTML = `<h2>Manifest</h2><pre>${JSON.stringify(
        MANIFEST,
        null,
        2
      )}</pre>`;
    })
    .then(() => {
      const metaTags = `
<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/icon-180.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/icon-32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/icon-16.png" />
<link rel="manifest" href="/assets/manifest.json" />
<meta name="application-name" content="" />
<meta name="theme-color" content="">
      `;
      const pre = document.createElement('pre');
      pre.innerText = metaTags;
      const meta = document.getElementById('meta');
      meta.innerHTML = '<h2><code>head</code>-tags</h2>';
      meta.appendChild(pre);
    })
    .catch(console.log);
};

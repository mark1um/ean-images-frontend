/**
 * Avisa Bing (e demais buscadores do IndexNow) que páginas mudaram.
 *
 * Uso (depois do deploy no Vercel):
 *   node scripts/indexnow.mjs                      # todas as URLs dos sitemaps do site e do portal
 *   node scripts/indexnow.mjs https://www.eanimages.com.br/api-ean ...   # só as URLs informadas
 *
 * A chave fica publicada em /<chave>.txt nos dois domínios (pasta public/).
 */
const KEY = 'ae612f55508f631fc8c89d1d16ee83ac';
const SITEMAPS = [
  'https://www.eanimages.com.br/sitemap.xml',
  'https://developers.eanimages.com.br/sitemap.xml',
];

async function urlsFromSitemap(url) {
  const xml = await (await fetch(url)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const urls = process.argv.slice(2).length
  ? process.argv.slice(2)
  : (await Promise.all(SITEMAPS.map(urlsFromSitemap))).flat();

// O IndexNow exige um envio por host
const byHost = new Map();
for (const u of urls) {
  const host = new URL(u).host;
  byHost.set(host, [...(byHost.get(host) ?? []), u]);
}

for (const [host, list] of byHost) {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key: KEY, keyLocation: `https://${host}/${KEY}.txt`, urlList: list }),
  });
  console.log(`${host}: ${list.length} URLs -> HTTP ${res.status}`);
}

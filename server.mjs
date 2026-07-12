// Serveur statique de production (Railway) : sert dist/ via serve-handler
// (le moteur du paquet `serve`), avec en plus :
//   1. redirection 301 www.aitom.fr → aitom.fr (hôte canonique unique) ;
//   2. redirections 301 des anciennes URLs de blog (voir serve.json).
// Lancement : node server.mjs (PORT fourni par Railway, 4321 par défaut).

import http from 'node:http';
import { readFileSync } from 'node:fs';
import handler from 'serve-handler';

const config = JSON.parse(
  readFileSync(new URL('./serve.json', import.meta.url), 'utf8')
);
const PORT = Number(process.env.PORT ?? 4321);

const server = http.createServer((req, res) => {
  // Hôte canonique : tout www.* est redirigé vers l'apex, chemin conservé.
  const host = req.headers.host ?? '';
  if (host.toLowerCase().startsWith('www.')) {
    res.writeHead(301, { Location: `https://${host.slice(4)}${req.url}` });
    res.end();
    return;
  }
  handler(req, res, { public: 'dist', ...config });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Aitom · serveur statique sur le port ${PORT}`);
});

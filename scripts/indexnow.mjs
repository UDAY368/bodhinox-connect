#!/usr/bin/env node
/**
 * Tells IndexNow search engines (Bing, Yandex and others) that our pages
 * changed. Reads the live sitemap and POSTs every <loc> in one request.
 *
 *   npm run indexnow
 *
 * Run it after a deploy that changes content. Google does not use IndexNow;
 * it reads sitemap.xml (submit it once in Search Console).
 *
 * The key is public by design: IndexNow checks that
 * https://www.bodhinoxconnect.in/<key>.txt serves the same key.
 */

const HOST = "www.bodhinoxconnect.in";
const ORIGIN = `https://${HOST}`;
const KEY = "cc9ff792834ebbce854df86a6d0957f3";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const SITEMAP = `${ORIGIN}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function main() {
  const res = await fetch(SITEMAP, { redirect: "follow" });
  if (!res.ok) throw new Error(`Could not read ${SITEMAP}: HTTP ${res.status}`);
  const xml = await res.text();

  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
    .map((m) => m[1].replace(/&amp;/g, "&"))
    .filter((u) => new URL(u).host === HOST);
  const unique = [...new Set(urls)];
  if (unique.length === 0) throw new Error(`No ${HOST} URLs found in ${SITEMAP}`);

  const submit = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: unique }),
  });

  // 200 = accepted, 202 = accepted and the key is still being verified.
  if (submit.status === 200 || submit.status === 202) {
    console.log(`IndexNow: submitted ${unique.length} URLs (HTTP ${submit.status}).`);
    return;
  }
  const body = await submit.text().catch(() => "");
  throw new Error(`IndexNow refused the submission: HTTP ${submit.status} ${body.slice(0, 300)}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});

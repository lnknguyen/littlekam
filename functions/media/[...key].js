export async function onRequest({ params, env }) {
  const key = params.key.join("/");                 // everything after /media/
  const object = await env.MEDIA.get(key);          // fetch from R2
  if (!object) return new Response("Not found", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);                // preserve Content-Type etc.
  headers.set("etag", object.httpEtag);

  return new Response(object.body, { headers });
}

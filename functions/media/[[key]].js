export async function onRequest({ params, env }) {
  // params.key is a *string* because we used [[key]]               ──┐
  const key = params.key;                                          // │
                                                                   // │
  const object = await env.MEDIA.get(key); // env.MEDIA from TOML  ←┘
  if (!object) return new Response("Not found", { status: 404 });

  // Basic headers; content type falls back to jpeg
  return new Response(object.body, {
    headers: {
      "Content-Type": object.httpMetadata?.contentType || "image/jpeg",
      "ETag": object.httpEtag,
    },
  });
}

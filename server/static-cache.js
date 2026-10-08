// Cache-Control của frontend tĩnh. Script admin ít và đổi liên tục: luôn revalidate (ETag → 304) để khỏi phải sửa tay ?v= mỗi lần.
export function staticCacheControl(filePath) {
  const file = filePath.replace(/\\/g, '/');
  if (/\/js\/admin-[^/]*\.js$/i.test(file)) return 'no-cache';
  if (/\.(?:js|css|woff2?|ttf|otf|eot)$/i.test(file)) return 'public, max-age=86400, stale-while-revalidate=604800';
  if (/\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|glb|gltf|hdr|exr|mp3|ogg|wav|mp4|webm)$/i.test(file)) return 'public, max-age=604800, stale-while-revalidate=2592000';
  if (/\.(?:webmanifest|json)$/i.test(file)) return 'public, max-age=3600';
  return null;
}

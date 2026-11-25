// Sample the same block of wood in globe coordinates as the visitor rotates the map.
let grainPromise;
function loadGrain() {
  if (!grainPromise) {
    const image = new Image();
    image.src = new URL('./assets/maple-grain.webp', import.meta.url).href;
    grainPromise = image.decode().then(() => {
      const sheet = document.createElement('canvas');
      sheet.width = image.naturalWidth;
      sheet.height = image.naturalHeight;
      const context = sheet.getContext('2d', { willReadFrequently: true });
      context.drawImage(image, 0, 0);
      const pixels = context.getImageData(0, 0, sheet.width, sheet.height).data;
      const values = new Uint8Array(sheet.width * sheet.height);
      for (let i = 0; i < values.length; i++) values[i] = pixels[i * 4];
      return { values, tile: sheet.width / 3, stride: sheet.width };
    });
  }
  return grainPromise;
}

export function createWoodSurface(redraw) {
  const layer = document.createElement('canvas');
  const context = layer.getContext('2d');
  let grain, pixels, normals, lastLongitude, lastLatitude;
  loadGrain().then(result => { grain = result; redraw(); }).catch(() => {});

  function prepare(size) {
    layer.width = layer.height = size;
    pixels = context.createImageData(size, size);
    normals = new Float32Array(size * size * 3);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = y * size + x;
        const east = 2 * (x + .5) / size - 1;
        const north = 1 - 2 * (y + .5) / size;
        const inward = 1 - east * east - north * north;
        if (inward < 0) continue;
        normals.set([east, north, Math.sqrt(inward)], i * 3);
        pixels.data[i * 4 + 3] = 255;
      }
    }
    lastLongitude = undefined;
  }

  function project(longitude, latitude) {
    const rad = Math.PI / 180;
    const sl = Math.sin(longitude * rad), cl = Math.cos(longitude * rad);
    const sp = Math.sin(latitude * rad), cp = Math.cos(latitude * rad);
    const { values, stride, tile } = grain, edge = tile - 1;
    const rgba = pixels.data;
    for (let i = 0, n = 0; i < rgba.length; i += 4, n += 3) {
      if (!rgba[i + 3]) continue;
      const east = normals[n], north = normals[n + 1], front = normals[n + 2];
      const horizontal = cp * front - sp * north;
      const x = cl * horizontal - sl * east, y = sl * horizontal + cl * east, z = sp * front + cp * north;
      const ax = Math.abs(x), ay = Math.abs(y), az = Math.abs(z);
      let face, u, v, divisor;
      if (ax >= ay && ax >= az) { face = x >= 0 ? 0 : 1; u = y; v = z; divisor = ax; }
      else if (ay >= az) { face = y >= 0 ? 2 : 3; u = x; v = z; divisor = ay; }
      else { face = z >= 0 ? 4 : 5; u = x; v = y; divisor = az; }
      const tx = Math.round((u / divisor + 1) * .5 * edge) + face % 3 * tile;
      const ty = Math.round((v / divisor + 1) * .5 * edge) + Math.floor(face / 3) * tile;
      const value = values[ty * stride + tx];
      rgba[i] = value + 10; rgba[i + 1] = value + 2; rgba[i + 2] = value - 8;
    }
    context.putImageData(pixels, 0, 0);
    lastLongitude = longitude; lastLatitude = latitude;
  }

  return function paint(ctx, x, y, radius, center) {
    if (!grain) return;
    const diameter = radius * 2;
    const size = Math.max(160, Math.min(540, Math.round(diameter * Math.min(window.devicePixelRatio || 1, 1.6) / 16) * 16));
    if (layer.width !== size || !pixels) prepare(size);
    if (lastLongitude !== center[0] || lastLatitude !== center[1]) project(...center);
    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    ctx.globalAlpha = .71;
    ctx.drawImage(layer, x - radius, y - radius, diameter, diameter);
    ctx.restore();
  };
}

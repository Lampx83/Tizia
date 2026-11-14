// ============================================================
// Trạm thao tác bào chế — registry action→station + builder 3D.
// Mỗi builder trả { group, tick(dt, progress, justClicked) }.
// progress 0..1 (theo số click / clicks cần). Giữ hình học primitive để ổn định.
// ============================================================

// ---- material helpers (nhận THREE để không import trùng) ----
function mats(T) {
  return {
    glass: () => new T.MeshPhysicalMaterial({ color: 0xeaf4ff, transparent: true, opacity: 0.45, roughness: 0.03, metalness: 0, transmission: 0.9, thickness: 0.4, ior: 1.45, side: T.DoubleSide, envMapIntensity: 1.2 }),
    metal: (c = 0xb8c0cc) => new T.MeshStandardMaterial({ color: c, roughness: 0.3, metalness: 0.9, envMapIntensity: 1.0 }),
    dark: (c = 0x2b3446) => new T.MeshStandardMaterial({ color: c, roughness: 0.6, metalness: 0.3 }),
    plastic: (c = 0xdfe6ef) => new T.MeshStandardMaterial({ color: c, roughness: 0.5, metalness: 0.05 }),
    liquid: (c = 0xd8e8ff) => new T.MeshStandardMaterial({ color: c, transparent: true, opacity: 0.85, roughness: 0.15, metalness: 0.1 }),
    emiss: (c = 0xff6b35, i = 1) => new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: i, roughness: 0.4 }),
    powder: (c = 0xf2ede0) => new T.MeshStandardMaterial({ color: c, roughness: 0.95, metalness: 0 }),
  };
}

// A simple particle puff/steam system attached to group.
function particles(T, group, { count = 24, color = 0xffffff, size = 0.012, y0 = 0.1, spread = 0.06, rise = 0.35 } = {}) {
  const geo = new T.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  for (let i = 0; i < count; i++) { seed[i] = i / count; pos[i * 3 + 1] = -99; }
  geo.setAttribute('position', new T.BufferAttribute(pos, 3));
  const mat = new T.PointsMaterial({ color, size, transparent: true, opacity: 0.0, depthWrite: false });
  const pts = new T.Points(geo, mat); group.add(pts);
  return {
    pts, mat,
    update(dt, intensity) {
      mat.opacity = 0.55 * intensity;
      const a = geo.attributes.position.array;
      for (let i = 0; i < count; i++) {
        seed[i] += dt * (0.25 + 0.4 * ((i % 5) / 5)) * (0.4 + intensity);
        const t = seed[i] % 1;
        a[i * 3] = Math.sin(i * 12.9) * spread * (0.3 + t);
        a[i * 3 + 1] = y0 + t * rise;
        a[i * 3 + 2] = Math.cos(i * 7.7) * spread * (0.3 + t);
      }
      geo.attributes.position.needsUpdate = true;
    }
  };
}

function lerpHex(T, a, b, t) {
  const ca = new T.Color(a), cb = new T.Color(b);
  return ca.lerp(cb, Math.max(0, Math.min(1, t))).getHex();
}

// beaker with liquid; returns {grp, liquid, setFill(frac,color)}
function beaker(T, M, { r = 0.06, h = 0.14, liquidColor = 0xd8e8ff } = {}) {
  const grp = new T.Group();
  const glass = new T.Mesh(new T.CylinderGeometry(r, r * 0.92, h, 28, 1, true), M.glass());
  glass.position.y = h / 2; grp.add(glass);
  const base = new T.Mesh(new T.CylinderGeometry(r * 0.92, r * 0.92, 0.006, 28), M.glass());
  grp.add(base);
  const liqMat = M.liquid(liquidColor);
  const liquid = new T.Mesh(new T.CylinderGeometry(r * 0.9, r * 0.85, 0.001, 28), liqMat);
  liquid.position.y = 0.003; liquid.visible = false; grp.add(liquid);
  function setFill(frac, color) {
    frac = Math.max(0, Math.min(1, frac));
    if (frac < 0.01) { liquid.visible = false; return; }
    liquid.visible = true;
    const lh = frac * (h - 0.01);
    liquid.geometry.dispose();
    liquid.geometry = new T.CylinderGeometry(r * 0.9, r * 0.85, lh, 28);
    liquid.position.y = lh / 2 + 0.004;
    if (color !== undefined) liqMat.color.setHex(color);
  }
  return { grp, liquid, liqMat, setFill };
}

// digital screen plane with canvas texture
function screen(T, w = 0.11, h = 0.045) {
  const cvs = document.createElement('canvas'); cvs.width = 256; cvs.height = 104;
  const ctx = cvs.getContext('2d');
  const tex = new T.CanvasTexture(cvs);
  const mesh = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ map: tex }));
  function draw(lines, bg = '#04140f', fg = '#39ff9e') {
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 256, 104);
    ctx.fillStyle = fg; ctx.font = 'bold 44px Menlo, monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (Array.isArray(lines)) { ctx.font = 'bold 30px Menlo, monospace'; lines.forEach((l, i) => ctx.fillText(l, 128, 30 + i * 40)); }
    else ctx.fillText(lines, 128, 52);
    tex.needsUpdate = true;
  }
  return { mesh, draw };
}

// ============================================================
// APPARATUS BUILDERS
// ============================================================
const BUILDERS = {
  // ---- CÂN điện tử ----
  balance(T, M, step) {
    const g = new T.Group();
    const body = new T.Mesh(new T.BoxGeometry(0.24, 0.05, 0.2), M.plastic(0xe8edf3)); body.position.y = 0.025; body.castShadow = true; g.add(body);
    const plate = new T.Mesh(new T.CylinderGeometry(0.075, 0.075, 0.006, 32), M.metal(0xcfd6df)); plate.position.y = 0.053; g.add(plate);
    const sc = screen(T, 0.12, 0.05); sc.mesh.position.set(0, 0.02, 0.101); sc.mesh.rotation.x = -0.35; g.add(sc.mesh);
    const bk = beaker(T, M, { r: 0.05, h: 0.1, liquidColor: 0xf2ede0 }); bk.grp.position.y = 0.056; g.add(bk.grp);
    const target = step?.params?.target || 0; const unit = step?.params?.unit || 'g';
    return { group: g, tick(dt, p) { const cur = target * p; sc.draw(`${cur.toFixed(unit === 'g' ? 2 : 0)}${unit}`, p >= 1 ? '#04140f' : '#141b0f', p >= 1 ? '#39ff9e' : '#ffd23a'); bk.setFill(p * 0.7, 0xf2ede0); } };
  },
  // ---- ỐNG ĐONG ----
  cylinder(T, M, step) {
    const g = new T.Group();
    const glass = new T.Mesh(new T.CylinderGeometry(0.032, 0.034, 0.24, 28, 1, true), M.glass()); glass.position.y = 0.12; g.add(glass);
    const foot = new T.Mesh(new T.CylinderGeometry(0.055, 0.055, 0.01, 28), M.glass()); foot.position.y = 0.005; g.add(foot);
    const liq = beaker(T, M, { r: 0.03, h: 0.23, liquidColor: 0xbfe0ff }); g.add(liq.grp);
    // mark line at target
    const mark = new T.Mesh(new T.TorusGeometry(0.033, 0.0012, 6, 28), new T.MeshBasicMaterial({ color: 0xff4d4d })); mark.rotation.x = Math.PI / 2; mark.position.y = 0.18; g.add(mark);
    return { group: g, tick(dt, p) { liq.setFill(p * 0.8, 0xbfe0ff); } };
  },
  // ---- CỐC + KHUẤY (hòa tan/trộn/phân tán) ----
  'beaker-stir'(T, M, step, recipe) {
    const g = new T.Group();
    const col = recipe?.finalColor ?? 0xd8e8ff;
    const bk = beaker(T, M, { r: 0.07, h: 0.16, liquidColor: col }); g.add(bk.grp);
    const rod = new T.Mesh(new T.CylinderGeometry(0.004, 0.004, 0.2, 10), M.glass()); rod.position.set(0.02, 0.13, 0); g.add(rod);
    let ang = 0;
    return { group: g, tick(dt, p) { bk.setFill(0.35 + p * 0.4, col); ang += dt * (3 + p * 8); rod.position.x = Math.cos(ang) * 0.03; rod.position.z = Math.sin(ang) * 0.03; } };
  },
  // ---- MÁY ĐỒNG NHẤT HÓA (nhũ hóa) ----
  homogenizer(T, M, step, recipe) {
    const g = new T.Group();
    const stand = new T.Mesh(new T.BoxGeometry(0.02, 0.34, 0.02), M.metal(0x8892a0)); stand.position.set(-0.13, 0.17, 0); g.add(stand);
    const foot = new T.Mesh(new T.BoxGeometry(0.16, 0.015, 0.14), M.dark()); foot.position.set(-0.05, 0.007, 0); g.add(foot);
    const motor = new T.Mesh(new T.CylinderGeometry(0.03, 0.03, 0.09, 20), M.dark(0x1f2735)); motor.position.set(0, 0.3, 0); g.add(motor);
    const shaft = new T.Mesh(new T.CylinderGeometry(0.006, 0.006, 0.18, 12), M.metal()); shaft.position.set(0, 0.17, 0); g.add(shaft);
    const rotor = new T.Mesh(new T.CylinderGeometry(0.018, 0.018, 0.02, 12), M.metal(0xd8dee6)); rotor.position.set(0, 0.085, 0); g.add(rotor);
    const bk = beaker(T, M, { r: 0.06, h: 0.14, liquidColor: 0x9fb4cc }); g.add(bk.grp);
    let ang = 0;
    return { group: g, tick(dt, p) { ang += dt * (5 + p * 60); rotor.rotation.y = ang; const c = lerpHex(T, 0x9fb4cc, 0xfdfdfb, p); bk.setFill(0.55, c); } };
  },
  // ---- NỒI ĐUN CÁCH THỦY (đun nóng) ----
  waterbath(T, M, step) {
    const g = new T.Group();
    const pot = new T.Mesh(new T.CylinderGeometry(0.12, 0.11, 0.09, 32, 1, true), M.metal(0x9aa4b0)); pot.position.y = 0.045; g.add(pot);
    const water = new T.Mesh(new T.CylinderGeometry(0.115, 0.108, 0.06, 32), M.liquid(0xbfe6ff)); water.position.y = 0.04; g.add(water);
    const bk = beaker(T, M, { r: 0.045, h: 0.11, liquidColor: 0xffe0a3 }); bk.grp.position.y = 0.05; g.add(bk.grp);
    bk.setFill(0.5, 0xffe0a3);
    // thermometer bar
    const tstand = new T.Mesh(new T.BoxGeometry(0.01, 0.16, 0.01), M.plastic(0xffffff)); tstand.position.set(0.1, 0.13, 0.05); g.add(tstand);
    const tbar = new T.Mesh(new T.BoxGeometry(0.006, 0.001, 0.006), M.emiss(0xff3b3b, 0.4)); tbar.position.set(0.1, 0.06, 0.056); g.add(tbar);
    const steam = particles(T, g, { color: 0xffffff, y0: 0.1, rise: 0.4, spread: 0.09, count: 30 });
    const tMax = step?.params?.tempMax || 70;
    return { group: g, tick(dt, p) { steam.update(dt, p); const th = 0.02 + p * 0.13; tbar.geometry.dispose(); tbar.geometry = new T.BoxGeometry(0.006, th, 0.006); tbar.position.y = 0.045 + th / 2; water.material.emissive = new T.Color(0xff5500); water.material.emissiveIntensity = p * 0.25; } };
  },
  // ---- BẾP ĐUN CHẢY (đun chảy tá dược) ----
  hotplate(T, M, step) {
    const g = new T.Group();
    const body = new T.Mesh(new T.BoxGeometry(0.22, 0.05, 0.2), M.dark(0x222a38)); body.position.y = 0.025; g.add(body);
    const coil = new T.Mesh(new T.CylinderGeometry(0.08, 0.08, 0.008, 32), M.emiss(0x3a1a10, 0.1)); coil.position.y = 0.053; g.add(coil);
    const bk = beaker(T, M, { r: 0.055, h: 0.12, liquidColor: 0xf7e6c8 }); bk.grp.position.y = 0.057; g.add(bk.grp);
    const chunk = new T.Mesh(new T.BoxGeometry(0.05, 0.05, 0.05), M.powder(0xfff7e0)); chunk.position.y = 0.09; bk.grp.add(chunk);
    return { group: g, tick(dt, p) { coil.material.emissive = new T.Color(0xff3300); coil.material.emissiveIntensity = 0.15 + p * 1.1; const s = Math.max(0.02, 1 - p); chunk.scale.set(s, s, s); chunk.position.y = 0.09 * s + 0.02; bk.setFill(p * 0.55, lerpHex(T, 0xf7e6c8, 0xf3d59a, p)); } };
  },
  // ---- CỐI CHÀY (nghiền) ----
  mortar(T, M, step) {
    const g = new T.Group();
    const bowl = new T.Mesh(new T.CylinderGeometry(0.09, 0.055, 0.07, 32, 1, true), M.plastic(0xe9e2d2)); bowl.position.y = 0.05; g.add(bowl);
    const bowlIn = new T.Mesh(new T.SphereGeometry(0.06, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), M.plastic(0xd8cfba)); bowlIn.position.y = 0.05; bowlIn.rotation.x = Math.PI; g.add(bowlIn);
    const powder = new T.Mesh(new T.CylinderGeometry(0.05, 0.035, 0.012, 24), M.powder(0xf0e9d8)); powder.position.y = 0.045; g.add(powder);
    const pestle = new T.Mesh(new T.CylinderGeometry(0.012, 0.018, 0.14, 16), M.plastic(0xe9e2d2)); pestle.position.set(0.02, 0.12, 0); pestle.rotation.z = 0.25; g.add(pestle);
    const dust = particles(T, g, { color: 0xefe6d2, y0: 0.06, rise: 0.06, spread: 0.05, count: 16 });
    let ang = 0;
    return { group: g, tick(dt, p, click) { ang += dt * 6; pestle.position.x = Math.cos(ang) * 0.03; pestle.position.z = Math.sin(ang) * 0.03; pestle.position.y = 0.11 - Math.abs(Math.sin(ang * 2)) * 0.015; powder.scale.set(1 + p * 0.3, 1, 1 + p * 0.3); dust.update(dt, click ? 1 : 0.15); } };
  },
  // ---- RÂY ----
  sieve(T, M, step) {
    const g = new T.Group();
    const ring = new T.Mesh(new T.CylinderGeometry(0.09, 0.09, 0.03, 32, 1, true), M.metal(0xc7ced7)); ring.position.y = 0.13; g.add(ring);
    const mesh = new T.Mesh(new T.CircleGeometry(0.088, 32), new T.MeshStandardMaterial({ color: 0x8a929c, roughness: 0.9, metalness: 0.3, transparent: true, opacity: 0.55, side: T.DoubleSide })); mesh.rotation.x = -Math.PI / 2; mesh.position.y = 0.118; g.add(mesh);
    const tray = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 0.02, 32), M.plastic(0xdfe6ef)); tray.position.y = 0.01; g.add(tray);
    const pile = new T.Mesh(new T.CylinderGeometry(0.02, 0.06, 0.02, 24), M.powder()); pile.position.y = 0.02; pile.visible = false; g.add(pile);
    const fall = particles(T, g, { color: 0xf0e9d8, y0: 0.11, rise: -0.09, spread: 0.05, count: 22 });
    return { group: g, tick(dt, p, click) { ring.position.x = Math.sin(performance.now ? 0 : 0) ; const jitter = click ? 0.01 : 0.002; ring.position.x = (Math.random() - 0.5) * jitter; fall.update(dt, click ? 1 : 0.2); pile.visible = p > 0.1; pile.scale.set(0.3 + p, 1 + p, 0.3 + p); } };
  },
  // ---- PHỄU LỌC ----
  funnel(T, M, step) {
    const g = new T.Group();
    const stand = new T.Mesh(new T.BoxGeometry(0.015, 0.3, 0.015), M.metal(0x8892a0)); stand.position.set(-0.11, 0.15, 0); g.add(stand);
    const arm = new T.Mesh(new T.BoxGeometry(0.09, 0.012, 0.012), M.metal(0x8892a0)); arm.position.set(-0.06, 0.24, 0); g.add(arm);
    const funnel = new T.Mesh(new T.CylinderGeometry(0.06, 0.006, 0.08, 24, 1, true), M.glass()); funnel.position.set(0, 0.22, 0); g.add(funnel);
    const paper = new T.Mesh(new T.ConeGeometry(0.055, 0.07, 24, 1, true), new T.MeshStandardMaterial({ color: 0xf6f3ea, roughness: 1, side: T.DoubleSide })); paper.position.set(0, 0.225, 0); paper.rotation.x = Math.PI; g.add(paper);
    const flask = new T.Mesh(new T.SphereGeometry(0.06, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.62), M.glass()); flask.position.y = 0.06; flask.rotation.x = Math.PI; g.add(flask);
    const flLiq = beaker(T, M, { r: 0.05, h: 0.08, liquidColor: 0xdff0ff }); g.add(flLiq.grp);
    const drip = particles(T, g, { color: 0xdff0ff, y0: 0.18, rise: -0.12, spread: 0.006, count: 10 });
    return { group: g, tick(dt, p, click) { drip.update(dt, 0.6); flLiq.setFill(p * 0.7, lerpHex(T, 0xcfe0f0, 0xeaf6ff, p)); } };
  },
  // ---- MÁY ĐO pH ----
  phmeter(T, M, step) {
    const g = new T.Group();
    const box = new T.Mesh(new T.BoxGeometry(0.11, 0.14, 0.05), M.plastic(0x1f2735)); box.position.set(-0.11, 0.09, 0); g.add(box);
    const sc = screen(T, 0.09, 0.05); sc.mesh.position.set(-0.11, 0.12, 0.026); g.add(sc.mesh);
    const bk = beaker(T, M, { r: 0.06, h: 0.13, liquidColor: 0xdfeaff }); g.add(bk.grp); bk.setFill(0.6, 0xdfeaff);
    const probe = new T.Mesh(new T.CylinderGeometry(0.006, 0.004, 0.16, 12), M.glass()); probe.position.set(0.01, 0.11, 0); probe.rotation.z = -0.15; g.add(probe);
    const phMin = step?.params?.phMin ?? 5, phMax = step?.params?.phMax ?? 7;
    const start = phMin - 2.2;
    return { group: g, tick(dt, p) { const ph = start + (phMax - 0.3 - start) * p; const ok = ph >= phMin && ph <= phMax; sc.draw([`pH`, ph.toFixed(2)], '#04140f', ok ? '#39ff9e' : '#ffd23a'); } };
  },
  // ---- XÁT HẠT ----
  granulator(T, M, step) {
    const g = new T.Group();
    const bowl = new T.Mesh(new T.CylinderGeometry(0.1, 0.08, 0.07, 32, 1, true), M.metal(0xc7ced7)); bowl.position.y = 0.05; g.add(bowl);
    const base = new T.Mesh(new T.CylinderGeometry(0.08, 0.08, 0.005, 32), M.metal(0xc7ced7)); base.position.y = 0.016; g.add(base);
    const massMat = M.powder(0xefe3cf); const mass = new T.Mesh(new T.CylinderGeometry(0.07, 0.06, 0.03, 24), massMat); mass.position.y = 0.03; g.add(mass);
    const grains = [];
    for (let i = 0; i < 40; i++) { const gm = new T.Mesh(new T.DodecahedronGeometry(0.007), M.powder(0xe8d9b8)); gm.position.set((Math.sin(i * 3.3)) * 0.06, 0.035, (Math.cos(i * 2.1)) * 0.06); gm.visible = false; g.add(gm); grains.push(gm); }
    return { group: g, tick(dt, p) { mass.scale.y = Math.max(0.15, 1 - p); const n = Math.floor(p * grains.length); grains.forEach((gm, i) => gm.visible = i < n); } };
  },
  // ---- TỦ NHIỆT (sấy / làm nguội / tiệt khuẩn khô) ----
  oven(T, M, step, recipe, variant) {
    const g = new T.Group();
    const body = new T.Mesh(new T.BoxGeometry(0.26, 0.24, 0.22), M.plastic(0xd7dde5)); body.position.y = 0.13; g.add(body);
    const door = new T.Mesh(new T.BoxGeometry(0.2, 0.18, 0.008), new T.MeshStandardMaterial({ color: 0x223, transparent: true, opacity: 0.5, roughness: 0.2 })); door.position.set(0, 0.13, 0.112); g.add(door);
    const glow = new T.Mesh(new T.BoxGeometry(0.18, 0.16, 0.16), M.emiss(0xff6a00, 0)); glow.position.set(0, 0.13, 0); g.add(glow);
    const sc = screen(T, 0.1, 0.045); sc.mesh.position.set(0, 0.235, 0.111); g.add(sc.mesh);
    const cool = step?.action === 'cool';
    const dry = step?.action === 'dry';
    const tMax = step?.params?.tempMax || (cool ? 8 : dry ? 65 : 160);
    const glowColor = cool ? 0x2aa8ff : 0xff6a00;
    return { group: g, tick(dt, p) { glow.material.color = new T.Color(glowColor); glow.material.emissive = new T.Color(glowColor); glow.material.emissiveIntensity = (cool ? 0.15 : 0.2) + p * (cool ? 0.4 : 1.0); const cur = cool ? (25 - (25 - tMax) * p) : (25 + (tMax - 25) * p); sc.draw(`${cur.toFixed(0)}°C`, '#04140f', cool ? '#7fd3ff' : '#ffb457'); } };
  },
  // ---- NỒI HẤP TIỆT TRÙNG (autoclave) ----
  autoclave(T, M, step) {
    const g = new T.Group();
    const drum = new T.Mesh(new T.CylinderGeometry(0.11, 0.11, 0.2, 32), M.metal(0xaeb7c2)); drum.position.y = 0.12; g.add(drum);
    const lid = new T.Mesh(new T.CylinderGeometry(0.115, 0.115, 0.03, 32), M.metal(0x8b95a2)); lid.position.y = 0.235; g.add(lid);
    // pressure gauge
    const gauge = new T.Mesh(new T.CircleGeometry(0.03, 24), new T.MeshBasicMaterial({ color: 0xf5f7fa })); gauge.position.set(0, 0.16, 0.112); g.add(gauge);
    const needle = new T.Mesh(new T.BoxGeometry(0.003, 0.026, 0.001), new T.MeshBasicMaterial({ color: 0xd21b1b })); needle.position.set(0, 0.16, 0.114); g.add(needle);
    const steam = particles(T, g, { color: 0xffffff, y0: 0.25, rise: 0.35, spread: 0.1, count: 26 });
    return { group: g, tick(dt, p) { needle.rotation.z = -p * Math.PI * 1.2 + 0.6; steam.update(dt, p * 0.9); drum.material.emissive = new T.Color(0xff5500); drum.material.emissiveIntensity = p * 0.1; } };
  },
  // ---- KHUÔN THUỐC ĐẶT (đổ khuôn / tháo khuôn) ----
  mold(T, M, step) {
    const g = new T.Group();
    const isDemold = step?.action === 'demold';
    const halfL = new T.Mesh(new T.BoxGeometry(0.09, 0.06, 0.16), M.metal(0xb9c1cc)); halfL.position.set(-0.045, 0.05, 0); g.add(halfL);
    const halfR = new T.Mesh(new T.BoxGeometry(0.09, 0.06, 0.16), M.metal(0xb9c1cc)); halfR.position.set(0.045, 0.05, 0); g.add(halfR);
    const sups = [];
    for (let i = 0; i < 3; i++) { const s = new T.Mesh(new T.CapsuleGeometry(0.012, 0.03, 6, 12), M.powder(0xf3e6c8)); s.position.set(0, 0.05, -0.05 + i * 0.05); s.scale.set(1, 0.01, 1); g.add(s); sups.push(s); }
    return { group: g, tick(dt, p) { if (isDemold) { halfL.position.x = -0.045 - p * 0.08; halfR.position.x = 0.045 + p * 0.08; sups.forEach(s => { s.scale.set(1, 1, 1); s.position.y = 0.05 + p * 0.03; s.material.color = new T.Color(0xf7ecd6); }); } else { sups.forEach((s, i) => { const fill = Math.max(0, Math.min(1, p * 3 - i)); s.scale.y = Math.max(0.01, fill); s.material.color = new T.Color(lerpHex(T, 0xf7d98a, 0xf3e6c8, fill)); }); } } };
  },
  // ---- MÁY DẬP VIÊN ----
  press(T, M, step) {
    const g = new T.Group();
    const frame = new T.Mesh(new T.BoxGeometry(0.03, 0.34, 0.03), M.metal(0x8892a0)); frame.position.set(-0.1, 0.17, 0); g.add(frame);
    const top = new T.Mesh(new T.BoxGeometry(0.18, 0.03, 0.08), M.metal(0x8892a0)); top.position.set(-0.02, 0.33, 0); g.add(top);
    const die = new T.Mesh(new T.CylinderGeometry(0.04, 0.04, 0.05, 24), M.metal(0xc7ced7)); die.position.set(0, 0.075, 0); g.add(die);
    const punch = new T.Mesh(new T.CylinderGeometry(0.022, 0.022, 0.14, 16), M.metal(0xd8dee6)); punch.position.set(0, 0.24, 0); g.add(punch);
    const tablet = new T.Mesh(new T.CylinderGeometry(0.024, 0.024, 0.012, 24), M.powder(0xfbfaf6)); tablet.position.set(0, 0.1, 0); g.add(tablet);
    const tray = new T.Mesh(new T.BoxGeometry(0.14, 0.008, 0.09), M.plastic(0xdfe6ef)); tray.position.set(0.13, 0.02, 0); g.add(tray);
    const made = [];
    return { group: g, tick(dt, p, click) { const cyc = (p * 5) % 1; punch.position.y = 0.24 - Math.sin(cyc * Math.PI) * 0.11; tablet.scale.y = 1 - Math.sin(cyc * Math.PI) * 0.5; if (click) { const t = new T.Mesh(new T.CylinderGeometry(0.02, 0.02, 0.01, 20), M.powder(0xfbfaf6)); t.position.set(0.09 + made.length * 0.012, 0.03, (Math.random() - 0.5) * 0.05); g.add(t); made.push(t); } } };
  },
  // ---- BÀN ĐÓNG NANG ----
  capsule(T, M, step) {
    const g = new T.Group();
    const board = new T.Mesh(new T.BoxGeometry(0.24, 0.02, 0.16), M.plastic(0xcfd6df)); board.position.y = 0.01; g.add(board);
    const bodies = [], caps = [];
    for (let i = 0; i < 8; i++) {
      const x = -0.09 + (i % 4) * 0.06, z = -0.03 + Math.floor(i / 4) * 0.06;
      const body = new T.Mesh(new T.CapsuleGeometry(0.012, 0.03, 4, 12), new T.MeshStandardMaterial({ color: 0xe23b3b, roughness: 0.4 })); body.position.set(x, 0.03, z); g.add(body); bodies.push(body);
      const cap = new T.Mesh(new T.CapsuleGeometry(0.0135, 0.018, 4, 12), new T.MeshStandardMaterial({ color: 0xf5d020, roughness: 0.4 })); cap.position.set(x, 0.09, z); g.add(cap); caps.push(cap);
    }
    return { group: g, tick(dt, p) { caps.forEach((c, i) => { const closed = Math.max(0, Math.min(1, p * 8 - i)); c.position.y = 0.09 - closed * 0.052; }); } };
  },
  // ---- ĐÈN HÀN ỐNG TIÊM ----
  burner(T, M, step) {
    const g = new T.Group();
    const base = new T.Mesh(new T.CylinderGeometry(0.03, 0.04, 0.05, 20), M.dark(0x1f2735)); base.position.y = 0.025; g.add(base);
    const tube = new T.Mesh(new T.CylinderGeometry(0.012, 0.012, 0.1, 16), M.metal()); tube.position.y = 0.1; g.add(tube);
    const flame = new T.Mesh(new T.ConeGeometry(0.02, 0.07, 16), M.emiss(0x3aa0ff, 1.6)); flame.position.y = 0.19; g.add(flame);
    const amp = new T.Mesh(new T.CylinderGeometry(0.014, 0.014, 0.09, 16), M.glass()); amp.position.set(0.06, 0.16, 0); g.add(amp);
    const neck = new T.Mesh(new T.CylinderGeometry(0.014, 0.004, 0.03, 12), M.glass()); neck.position.set(0.06, 0.215, 0); g.add(neck);
    const liq = new T.Mesh(new T.CylinderGeometry(0.011, 0.011, 0.05, 12), M.liquid(0xdfeaff)); liq.position.set(0.06, 0.14, 0); g.add(liq);
    return { group: g, tick(dt, p) { flame.scale.set(1 + Math.sin(performance ? 0 : 0), 1 + p * 0.4, 1); flame.material.emissiveIntensity = 1.2 + Math.random() * 0.5; neck.scale.x = 1 - p * 0.8; neck.material.emissive = new T.Color(0xff6a00); neck.material.emissiveIntensity = p * 0.8; } };
  },
  // ---- ĐÈN SOI (kiểm tra độ trong) ----
  lamp(T, M, step) {
    const g = new T.Group();
    const stand = new T.Mesh(new T.BoxGeometry(0.02, 0.28, 0.02), M.dark()); stand.position.set(-0.12, 0.14, 0); g.add(stand);
    const hood = new T.Mesh(new T.CylinderGeometry(0.05, 0.03, 0.05, 20, 1, true), M.dark(0x111827)); hood.position.set(-0.05, 0.26, 0); hood.rotation.z = 1.2; g.add(hood);
    const bulb = new T.Mesh(new T.SphereGeometry(0.02, 16, 16), M.emiss(0xfff2c0, 2)); bulb.position.set(-0.02, 0.24, 0); g.add(bulb);
    const light = new T.PointLight(0xfff0c0, 0, 1); light.position.set(-0.02, 0.24, 0); g.add(light);
    const vial = new T.Mesh(new T.CylinderGeometry(0.02, 0.02, 0.1, 20, 1, true), M.glass()); vial.position.set(0.05, 0.16, 0); g.add(vial);
    const liqMat = M.liquid(0xcdd8e6); const liq = new T.Mesh(new T.CylinderGeometry(0.017, 0.017, 0.07, 20), liqMat); liq.position.set(0.05, 0.15, 0); g.add(liq);
    return { group: g, tick(dt, p) { light.intensity = 0.4 + p; liqMat.opacity = 0.85 - p * 0.55; liqMat.color = new T.Color(lerpHex(T, 0xc7d2e0, 0xeaf4ff, p)); } };
  },
  // ---- CHAI THÀNH PHẨM (đóng chai / dán nhãn) ----
  bottle(T, M, step, recipe) {
    const g = new T.Group();
    const col = recipe?.finalColor ?? 0xa67c2a;
    const body = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 0.16, 28, 1, true), M.glass()); body.position.y = 0.09; g.add(body);
    const base = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 0.006, 28), M.glass()); base.position.y = 0.01; g.add(base);
    const neck = new T.Mesh(new T.CylinderGeometry(0.02, 0.03, 0.03, 20), M.glass()); neck.position.y = 0.185; g.add(neck);
    const cap = new T.Mesh(new T.CylinderGeometry(0.022, 0.022, 0.025, 20), M.plastic(0x2b3446)); cap.position.y = 0.205; g.add(cap);
    const fillMat = M.liquid(col); const fill = new T.Mesh(new T.CylinderGeometry(0.046, 0.046, 0.001, 28), fillMat); fill.position.y = 0.015; g.add(fill);
    const isLabel = step?.action === 'label';
    const label = new T.Mesh(new T.PlaneGeometry(0.07, 0.06), new T.MeshStandardMaterial({ color: 0xf7f4ec, roughness: 1 })); label.position.set(0, 0.09, 0.051); label.visible = false; g.add(label);
    return { group: g, tick(dt, p) { if (isLabel) { label.visible = true; label.scale.set(Math.min(1, p * 1.2), Math.min(1, p * 1.2), 1); fill.geometry.dispose(); fill.geometry = new T.CylinderGeometry(0.046, 0.046, 0.13, 28); fill.position.y = 0.075; } else { const h = p * 0.14; fill.geometry.dispose(); fill.geometry = new T.CylinderGeometry(0.046, 0.046, Math.max(0.001, h), 28); fill.position.y = h / 2 + 0.012; } } };
  },
  // ---- BỒN RỬA (vệ sinh dụng cụ) ----
  sink(T, M, step) {
    const g = new T.Group();
    const basin = new T.Mesh(new T.BoxGeometry(0.24, 0.06, 0.18), M.metal(0xc7ced7)); basin.position.y = 0.06; g.add(basin);
    const inner = new T.Mesh(new T.BoxGeometry(0.2, 0.05, 0.14), M.dark(0x1b2230)); inner.position.y = 0.075; g.add(inner);
    const tap = new T.Mesh(new T.CylinderGeometry(0.008, 0.008, 0.12, 12), M.metal()); tap.position.set(0, 0.16, -0.07); g.add(tap);
    const spout = new T.Mesh(new T.CylinderGeometry(0.008, 0.008, 0.05, 12), M.metal()); spout.position.set(0, 0.21, -0.05); spout.rotation.x = 1.1; g.add(spout);
    const water = particles(T, g, { color: 0xbfe6ff, y0: 0.2, rise: -0.15, spread: 0.01, count: 16 });
    const bk = beaker(T, M, { r: 0.04, h: 0.08, liquidColor: 0xdff0ff }); bk.grp.position.set(0.02, 0.09, 0.02); g.add(bk.grp);
    return { group: g, tick(dt, p) { water.update(dt, 0.8); } };
  },
  // ---- SỤC KHÍ TRƠ (đuổi oxy) ----
  degas(T, M, step) {
    const g = new T.Group();
    const bk = beaker(T, M, { r: 0.06, h: 0.15, liquidColor: 0xbfe0ff }); g.add(bk.grp); bk.setFill(0.6, 0xbfe0ff);
    // cylinder khí N2 + ống dẫn
    const cyl = new T.Mesh(new T.CylinderGeometry(0.03, 0.03, 0.2, 20), M.metal(0x2f7d55)); cyl.position.set(-0.16, 0.1, -0.02); g.add(cyl);
    const cap = new T.Mesh(new T.CylinderGeometry(0.014, 0.014, 0.03, 12), M.metal(0xb8c0cc)); cap.position.set(-0.16, 0.215, -0.02); g.add(cap);
    const tube = new T.Mesh(new T.CylinderGeometry(0.004, 0.004, 0.16, 10), M.plastic(0xdfe6ef)); tube.position.set(-0.05, 0.13, 0); tube.rotation.z = 0.9; g.add(tube);
    const dip = new T.Mesh(new T.CylinderGeometry(0.004, 0.004, 0.1, 10), M.plastic(0xdfe6ef)); dip.position.set(0, 0.07, 0); g.add(dip);
    // bọt khí bên trong dung dịch
    const bub = particles(T, g, { color: 0xffffff, y0: 0.02, rise: 0.11, spread: 0.028, count: 26, size: 0.008 });
    return { group: g, tick(dt, p) { bub.update(dt, 0.4 + p * 0.6); const c = lerpHex(T, 0xbfe0ff, 0xd8ecff, p); bk.setFill(0.6, c); } };
  },
  // ---- default ----
  _default(T, M, step, recipe) {
    return BUILDERS['beaker-stir'](T, M, step, recipe);
  },
};

// ============================================================
// STATION REGISTRY — action → {apparatus key + UI text}
// ============================================================
function n(step, base) { return step?.params?.target ? Math.max(3, Math.ceil(Math.log2(step.params.target + 2)) + 2) : base; }

export const STATIONS = {
  weigh:        { key: 'balance',     icon: '⚖️', equipName: 'Cân điện tử',      verb: s => `Cân ${s.params?.reagent || 'hoạt chất'}${s.params?.target ? ` (${s.params.target} ${s.params.unit})` : ''}`, hint: () => 'Bấm để rót dần lên cân đến đủ khối lượng', clicks: s => 4 },
  measure:      { key: 'cylinder',    icon: '🧪', equipName: 'Ống đong',         verb: s => `Đong ${s.params?.reagent || 'dung môi'}${s.params?.target ? ` (${s.params.target} ${s.params.unit})` : ''}`, hint: () => 'Bấm để đong đến vạch', clicks: s => 4 },
  'adjust-volume':{ key: 'cylinder',  icon: '💧', equipName: 'Ống đong',         verb: () => 'Thêm dung môi vừa đủ (q.s.)', hint: () => 'Bấm để thêm đến vạch thể tích', clicks: () => 4 },
  dissolve:     { key: 'beaker-stir', icon: '🥄', equipName: 'Cốc + đũa khuấy',  verb: () => 'Khuấy hòa tan', hint: () => 'Bấm để khuấy đến khi tan hoàn toàn', clicks: () => 4 },
  mix:          { key: 'beaker-stir', icon: '🥄', equipName: 'Cốc + đũa khuấy',  verb: () => 'Trộn đều', hint: () => 'Bấm để trộn đều', clicks: () => 4 },
  disperse:     { key: 'beaker-stir', icon: '🌀', equipName: 'Cốc phân tán',     verb: () => 'Phân tán', hint: () => 'Bấm để dùng lực gây phân tán', clicks: () => 5 },
  emulsify:     { key: 'homogenizer', icon: '🌪️', equipName: 'Máy đồng nhất hóa', verb: () => 'Nhũ hóa', hint: () => 'Bấm để nhũ hóa đến khi trắng đục đồng nhất', clicks: () => 6 },
  heat:         { key: 'waterbath',   icon: '🔥', equipName: 'Nồi đun cách thủy', verb: s => `Đun cách thủy${s.params?.tempMax ? ` (${s.params.tempMin || ''}-${s.params.tempMax}°C)` : ''}`, hint: () => 'Bấm để tăng nhiệt đến khoảng yêu cầu', clicks: () => 5 },
  melt:         { key: 'hotplate',    icon: '🫕', equipName: 'Bếp đun chảy',      verb: () => 'Đun chảy tá dược', hint: () => 'Bấm để đun đến khi chảy lỏng hoàn toàn', clicks: () => 5 },
  grind:        { key: 'mortar',      icon: '⚗️', equipName: 'Cối chày',          verb: () => 'Nghiền', hint: () => 'Bấm để nghiền mịn trong cối', clicks: () => 6 },
  sieve:        { key: 'sieve',       icon: '🕸️', equipName: 'Rây',              verb: s => `Rây${s.params?.mesh ? ` (rây ${s.params.mesh})` : ''}`, hint: () => 'Bấm để rây bột qua lưới', clicks: () => 5 },
  filter:       { key: 'funnel',      icon: '🌬️', equipName: 'Phễu lọc + màng',  verb: s => `Lọc${s.params?.pore ? ` (${s.params.pore})` : ''}`, hint: () => 'Bấm để lọc trong dung dịch', clicks: () => 4 },
  'adjust-ph':  { key: 'phmeter',     icon: '🧫', equipName: 'Máy đo pH',         verb: () => 'Đo & chỉnh pH', hint: () => 'Bấm để chỉnh pH vào khoảng yêu cầu', clicks: () => 4 },
  degas:        { key: 'degas',       icon: '🫧', equipName: 'Sục khí trơ (N₂)',  verb: () => 'Sục khí trơ đuổi oxy', hint: () => 'Bấm để sục N₂ đuổi oxy hòa tan', clicks: () => 5 },
  granulate:    { key: 'granulator',  icon: '🌾', equipName: 'Khay xát hạt',      verb: () => 'Xát hạt', hint: () => 'Bấm để nhào và xát tạo hạt', clicks: () => 5 },
  dry:          { key: 'oven',        icon: '♨️', equipName: 'Tủ sấy',            verb: s => `Sấy${s.params?.tempMax ? ` (${s.params.tempMax}°C)` : ''}`, hint: () => 'Bấm để sấy đến độ ẩm đạt', clicks: () => 5 },
  cool:         { key: 'oven',        icon: '❄️', equipName: 'Làm nguội/lạnh',    verb: () => 'Làm nguội', hint: () => 'Bấm để làm nguội đông rắn', clicks: () => 4 },
  'fill-capsule':{ key: 'capsule',    icon: '💊', equipName: 'Bàn đóng nang',     verb: () => 'Đóng nang', hint: () => 'Bấm để đóng bột vào nang', clicks: () => 6 },
  press:        { key: 'press',       icon: '🔩', equipName: 'Máy dập viên',      verb: () => 'Dập viên', hint: () => 'Bấm để dập từng viên', clicks: () => 6 },
  mold:         { key: 'mold',        icon: '🧊', equipName: 'Khuôn thuốc đặt',   verb: () => 'Đổ khuôn', hint: () => 'Bấm để rót vào khuôn', clicks: () => 5 },
  demold:       { key: 'mold',        icon: '📤', equipName: 'Tháo khuôn',        verb: () => 'Tháo khuôn', hint: () => 'Bấm để mở khuôn lấy viên', clicks: () => 4 },
  'seal-ampoule':{ key: 'burner',     icon: '🔥', equipName: 'Đèn hàn ống',       verb: () => 'Hàn ống tiêm', hint: () => 'Bấm để hàn kín đầu ống', clicks: () => 5 },
  autoclave:    { key: 'autoclave',   icon: '♨️', equipName: 'Nồi hấp tiệt trùng', verb: () => 'Hấp tiệt trùng (121°C)', hint: () => 'Bấm để hấp đạt áp/nhiệt', clicks: () => 5 },
  sterilize:    { key: 'autoclave',   icon: '🧼', equipName: 'Tiệt khuẩn dụng cụ', verb: () => 'Tiệt khuẩn dụng cụ', hint: () => 'Bấm để tiệt khuẩn dụng cụ', clicks: () => 3 },
  inspect:      { key: 'lamp',        icon: '🔦', equipName: 'Đèn soi độ trong',  verb: () => 'Soi kiểm tra', hint: () => 'Bấm để soi độ trong dưới đèn', clicks: () => 3 },
  'fill-bottle':{ key: 'bottle',      icon: '🍶', equipName: 'Đóng lọ/chai',      verb: () => 'Đóng lọ thành phẩm', hint: () => 'Bấm để đóng vào lọ/chai', clicks: () => 4 },
  label:        { key: 'bottle',      icon: '🏷️', equipName: 'Dán nhãn',         verb: () => 'Dán nhãn', hint: () => 'Bấm để dán nhãn đúng quy chế', clicks: () => 3 },
  clean:        { key: 'sink',        icon: '🚿', equipName: 'Bồn rửa',           verb: () => 'Vệ sinh dụng cụ', hint: () => 'Bấm để rửa sạch dụng cụ', clicks: () => 3 },
  _default:     { key: '_default',    icon: '🧪', equipName: 'Dụng cụ',           verb: s => s.label?.slice(0, 24) || 'Thực hiện', hint: () => 'Bấm để thực hiện thao tác', clicks: () => 4 },
};

export function buildApparatus(key, T, step, recipe) {
  const M = mats(T);
  const fn = BUILDERS[key] || BUILDERS._default;
  return fn(T, M, step, recipe);
}

// ============================================================
// PHÒNG LAB — môi trường (sàn, bàn có tủ, kệ hoá chất, tủ tường, cửa sổ)
// ============================================================
export function buildLabRoom(T, scene) {
  const M = mats(T);
  const room = new T.Group(); scene.add(room);
  const add = (m) => { room.add(m); return m; };

  // Sàn gạch bóng nhẹ
  const floor = new T.Mesh(new T.PlaneGeometry(24, 24),
    new T.MeshStandardMaterial({ color: 0x223049, roughness: 0.35, metalness: 0.1 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; add(floor);
  // đường ron gạch
  const grid = new T.GridHelper(24, 40, 0x2c3d5a, 0x2c3d5a);
  grid.position.y = 0.002; grid.material.opacity = 0.35; grid.material.transparent = true; add(grid);

  // Tường sau + tường bên
  const wallMat = new T.MeshStandardMaterial({ color: 0x1a2740, roughness: 0.95 });
  const wallBack = new T.Mesh(new T.PlaneGeometry(24, 8), wallMat); wallBack.position.set(0, 4, -1.5); add(wallBack);
  const wallL = new T.Mesh(new T.PlaneGeometry(12, 8), wallMat); wallL.position.set(-4.2, 4, 3); wallL.rotation.y = Math.PI / 2; add(wallL);
  const wallR = wallL.clone(); wallR.position.x = 4.2; wallR.rotation.y = -Math.PI / 2; add(wallR);

  // Cửa sổ sáng (gradient) trên tường sau
  const win = new T.Mesh(new T.PlaneGeometry(2.6, 1.7),
    new T.MeshBasicMaterial({ color: 0x9fc7e8 }));
  win.position.set(-2.4, 2.4, -1.47); add(win);
  const winFrame = new T.Mesh(new T.PlaneGeometry(2.8, 1.9), new T.MeshStandardMaterial({ color: 0x0e1626, roughness: 1 }));
  winFrame.position.set(-2.4, 2.4, -1.48); add(winFrame);

  // Bàn thí nghiệm (mặt bàn + thân tủ + cánh)
  const topMat = new T.MeshStandardMaterial({ color: 0x33507a, roughness: 0.25, metalness: 0.25 });
  const bench = new T.Mesh(new T.BoxGeometry(4.6, 0.05, 1.6), topMat); bench.position.set(0, 0.72, 0.1); bench.receiveShadow = true; bench.castShadow = true; add(bench);
  const cab = new T.Mesh(new T.BoxGeometry(4.5, 0.66, 1.4), new T.MeshStandardMaterial({ color: 0x24344f, roughness: 0.7 }));
  cab.position.set(0, 0.37, 0.1); cab.receiveShadow = true; add(cab);
  for (let i = -2; i <= 2; i++) {
    const door = new T.Mesh(new T.BoxGeometry(0.78, 0.56, 0.02), new T.MeshStandardMaterial({ color: 0x2b3d5c, roughness: 0.55, metalness: 0.1 }));
    door.position.set(i * 0.85, 0.37, 0.81); add(door);
    const knob = new T.Mesh(new T.SphereGeometry(0.015, 10, 10), M.metal(0xcfd6df)); knob.position.set(i * 0.85 + 0.3, 0.37, 0.83); add(knob);
  }

  // Kệ hoá chất trên tường (2 tầng, nhiều chai màu)
  const shelfMat = new T.MeshStandardMaterial({ color: 0x2a3a58, roughness: 0.6, metalness: 0.15 });
  const bottleCols = [0x8ecae6, 0xffb703, 0xfb8500, 0x90be6d, 0xe07a5f, 0xcdb4db, 0xffd6a5, 0xa0c4ff, 0xbde0fe, 0xf28482];
  for (let sh = 0; sh < 2; sh++) {
    const y = 2.0 + sh * 0.95;
    const shelf = new T.Mesh(new T.BoxGeometry(7.2, 0.04, 0.28), shelfMat); shelf.position.set(0.6, y, -1.32); shelf.castShadow = true; add(shelf);
    for (let b = 0; b < 22; b++) {
      const x = -2.8 + b * 0.32;
      const h = 0.16 + (b % 3) * 0.05;
      const col = bottleCols[(b + sh * 3) % bottleCols.length];
      const bo = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, h, 14),
        new T.MeshStandardMaterial({ color: col, roughness: 0.25, metalness: 0.05, transparent: true, opacity: 0.9 }));
      bo.position.set(x, y + 0.02 + h / 2, -1.3); add(bo);
      const capb = new T.Mesh(new T.CylinderGeometry(0.03, 0.03, 0.03, 12), M.dark(0x11182a)); capb.position.set(x, y + 0.02 + h + 0.015, -1.3); add(capb);
    }
  }

  // Poster "bảng tuần hoàn" đơn giản (ô màu) trên tường phải
  const poster = new T.Group(); poster.position.set(4.15, 2.3, 0.4); poster.rotation.y = -Math.PI / 2;
  const pbg = new T.Mesh(new T.PlaneGeometry(2.2, 1.3), new T.MeshStandardMaterial({ color: 0xf4f6fb, roughness: 1 })); poster.add(pbg);
  for (let r = 0; r < 5; r++) for (let c = 0; c < 9; c++) {
    const cell = new T.Mesh(new T.PlaneGeometry(0.2, 0.2), new T.MeshBasicMaterial({ color: new T.Color().setHSL((r * 9 + c) / 45, 0.55, 0.6) }));
    cell.position.set(-0.9 + c * 0.22, 0.5 - r * 0.24, 0.001); poster.add(cell);
  }
  add(poster);

  return room;
}

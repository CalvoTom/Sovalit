import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const COLORS = {
  electrik: 0x0079e0,
  acier: 0x5a6078,
  givre: 0xf5f6fa,
  white: 0xffffff,
};

/** Le « C » de la marque Sovalit : un anneau épais ouvert à droite, extrudé et biseauté. */
function createCGeometry() {
  const R = 1.5;
  const r = 0.78;
  const gap = 0.62; // demi-ouverture (radians)
  const shape = new THREE.Shape();
  shape.absarc(0, 0, R, gap, Math.PI * 2 - gap, false);
  shape.lineTo(Math.cos(-gap) * r, Math.sin(-gap) * r);
  shape.absarc(0, 0, r, Math.PI * 2 - gap, gap, true);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.55,
    bevelEnabled: true,
    bevelThickness: 0.22,
    bevelSize: 0.2,
    bevelSegments: 10,
    curveSegments: 96,
  });
  geo.center();
  return geo;
}

export function initHero3D(canvas) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    return; // Pas de WebGL : le hero reste parfaitement lisible sans la 3D.
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.7;

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 14);

  // Lumières
  scene.add(new THREE.AmbientLight(0xffffff, 0.35));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(-4, 6, 8);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -10;
  key.shadow.camera.right = 10;
  key.shadow.camera.top = 10;
  key.shadow.camera.bottom = -10;
  key.shadow.radius = 8;
  key.shadow.bias = -0.0005;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x9fd0ff, 1.2);
  rim.position.set(6, -2, -4);
  scene.add(rim);

  // Capteur d'ombre derrière les objets : effet « flottant »
  const shadowCatcher = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    new THREE.ShadowMaterial({ opacity: 0.05 })
  );
  shadowCatcher.position.z = -3.2;
  shadowCatcher.receiveShadow = true;
  scene.add(shadowCatcher);

  // Matériaux
  const matBlue = new THREE.MeshPhysicalMaterial({
    color: COLORS.electrik, roughness: 0.22, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.12,
  });
  const matWhite = new THREE.MeshPhysicalMaterial({
    color: COLORS.white, roughness: 0.3, clearcoat: 0.8, clearcoatRoughness: 0.2,
  });
  const matAcier = new THREE.MeshPhysicalMaterial({
    color: COLORS.acier, roughness: 0.35, clearcoat: 0.6, clearcoatRoughness: 0.3,
  });
  const matGlass = new THREE.MeshPhysicalMaterial({
    color: 0xcfe6ff, roughness: 0.05, transmission: 1, thickness: 1.2, ior: 1.4,
  });

  // Objets
  const group = new THREE.Group();
  scene.add(group);

  const items = [];
  const add = (mesh, { pos, rot = [0, 0, 0], float = 0.25, speed = 1, spin = 0.2 }) => {
    mesh.position.set(...pos);
    mesh.rotation.set(...rot);
    mesh.castShadow = true;
    group.add(mesh);
    items.push({ mesh, base: mesh.position.clone(), baseRot: mesh.rotation.clone(), float, speed, spin, phase: Math.random() * Math.PI * 2 });
    return mesh;
  };

  const cMesh = add(new THREE.Mesh(createCGeometry(), matBlue), { pos: [0, 0, 0], rot: [0.2, -0.45, 0.15], float: 0.18, speed: 0.6, spin: 0.15 });
  cMesh.scale.setScalar(1.35);

  add(new THREE.Mesh(new THREE.SphereGeometry(0.62, 64, 64), matWhite), { pos: [2.2, 1.9, 0.8], float: 0.3, speed: 0.9 });
  add(new THREE.Mesh(new RoundedBoxGeometry(1, 1, 1, 6, 0.22), matAcier), { pos: [-2.3, -1.9, 0.6], rot: [0.5, 0.6, 0.2], float: 0.25, speed: 0.75, spin: 0.35 });
  add(new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.17, 32, 96), matBlue), { pos: [2.5, -1.7, 1.2], rot: [1, 0.3, 0], float: 0.35, speed: 1.1, spin: 0.5 });
  add(new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.7, 12, 32), matWhite), { pos: [-2.2, 1.9, -0.4], rot: [0, 0, 0.9], float: 0.28, speed: 0.95, spin: 0.3 });
  add(new THREE.Mesh(new THREE.SphereGeometry(0.42, 64, 64), matGlass), { pos: [0.6, -2.4, 1.6], float: 0.22, speed: 1.2 });
  add(new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), matBlue), { pos: [-0.6, 2.5, 1.2], float: 0.4, speed: 1.4 });

  // Mise en page responsive : à droite sur desktop, en bas sur mobile
  let layoutScale = 1;
  let baseY = 0;
  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    const visibleH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const visibleW = visibleH * camera.aspect;
    if (w > 860) {
      layoutScale = Math.min(0.92, visibleW / 17);
      group.position.set(visibleW * 0.26, 0, 0);
      baseY = 0.1;
    } else {
      layoutScale = Math.min(0.72, visibleW / 9);
      group.position.set(0, 0, 0);
      baseY = -visibleH * 0.33;
    }
    group.scale.setScalar(layoutScale);
  }
  resize();
  new ResizeObserver(resize).observe(canvas);

  // Interaction : souris + scroll
  const pointer = new THREE.Vector2();
  const target = new THREE.Vector2();
  window.addEventListener("pointermove", (e) => {
    target.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
  }, { passive: true });

  let scrollY = window.scrollY;
  window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });

  // Ne calcule que lorsque le hero est visible
  let visible = true;
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(canvas);

  const clock = new THREE.Clock();

  function frame() {
    requestAnimationFrame(frame);
    if (!visible) return;
    const t = reduceMotion ? 0 : clock.getElapsedTime();

    pointer.lerp(target, 0.05);
    const s = Math.min(scrollY / window.innerHeight, 1.2);

    for (const it of items) {
      it.mesh.position.y = it.base.y + Math.sin(t * it.speed + it.phase) * it.float;
      it.mesh.position.x = it.base.x + pointer.x * 0.25 * (1 + it.base.z * 0.3);
      it.mesh.rotation.x = it.baseRot.x + Math.sin(t * it.spin * 0.7 + it.phase) * 0.3 + pointer.y * 0.2;
      it.mesh.rotation.y = it.baseRot.y + t * it.spin * 0.5 + pointer.x * 0.35;
    }
    cMesh.rotation.y = -0.45 + Math.sin(t * 0.4) * 0.25 + pointer.x * 0.45 + s * 1.2;
    cMesh.rotation.x = 0.2 + pointer.y * 0.25;

    // Le groupe s'élève et tourne légèrement pendant le scroll
    group.position.y = baseY + s * 2.2 * layoutScale;
    group.rotation.z = s * 0.15;

    renderer.render(scene, camera);
  }
  frame();
  requestAnimationFrame(() => canvas.classList.add("is-ready"));
}

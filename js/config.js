export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

export const colors = [
  "#ff0000",
  "#0078ff",
  "rgb(151, 20, 163)",
  "#d059c5",
  "#dff241",
];

export const worldSettings = {
  friction: 0.99,
  gravity: 0.2,
  forceTimer: 1,
  forcePower: 0.02,
  alpha: 1,
  alphaDifference: 0.005,
  radiusDecreaser: 0.994,
  minRadius: 5,
  maxRadius: 10,
  numberOnSpawn: 200,
  minForce: 10,
  maxForce: 20,
  startAngleSpread: 0,
  endAngleSpread: 2 * Math.PI,
  hslColorStart: 0,
  hslColorEnd: 360,
  glowEffect: true,
  auto: false,
  frequency: 0.98,
  randomColors: false,
  message: "hsl works only if randomColors is turned on",
  message2: "frequency works only if auto is turned on",
};

const gui = new dat.GUI();
const settings = gui.addFolder("Settings");
settings.add(worldSettings, "friction", 0.9, 1.1);
settings.add(worldSettings, "gravity", 0.1, 1);
settings.add(worldSettings, "forcePower", 0.01, 2);
settings.add(worldSettings, "alpha", 0.1, 1);
settings.add(worldSettings, "alphaDifference", 0.001, 0.01);
settings.add(worldSettings, "radiusDecreaser", 0.951, 1.111);
settings.add(worldSettings, "minRadius", 1, 30);
settings.add(worldSettings, "maxRadius", 1, 30);
settings.add(worldSettings, "numberOnSpawn", 6, 1000);
settings.add(worldSettings, "minForce", 0.1, 20);
settings.add(worldSettings, "maxForce", 0.1, 20);
settings.add(worldSettings, "startAngleSpread", 0, Math.PI * 2).step(0.01);
settings.add(worldSettings, "endAngleSpread", 0, Math.PI * 2).step(0.01);
settings.add(worldSettings, "message");
settings
  .add(worldSettings, "randomColors")
  .listen()
  .onChange((state) => (worldSettings.randomColors = state));
settings.add(worldSettings, "hslColorStart", 0, 360);
settings.add(worldSettings, "hslColorEnd", 0, 360);
settings
  .add(worldSettings, "glowEffect")
  .listen()
  .onChange((state) => (worldSettings.glowEffect = state));
settings.add(worldSettings, "message2");
settings
  .add(worldSettings, "auto")
  .listen()
  .onChange((state) => (worldSettings.auto = state));
settings.add(worldSettings, "frequency", 0.9, 0.99).step(0.01);
settings.open();

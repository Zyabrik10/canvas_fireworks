import { canvas, ctx, worldSettings, colors } from "./config.js";
import { floor, pi, randInt, random } from "./math.js";

export default class Ball {
  constructor({
    coor = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    },
    vel = {
      x: 0,
      y: 0,
    },
    color = worldSettings.randomColors
      ? `hsl(${randInt(
          worldSettings.hslColorStart,
          worldSettings.hslColorEnd
        )}, 80%, 50%)`
      : [colors[floor(random() * colors.length)]],
    radius = randInt(worldSettings.minRadius, worldSettings.maxRadius),
  }) {
    this.radius = radius;
    this.coor = coor;
    this.vel = vel;
    this.color = color;
    this.alpha = worldSettings.alpha;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.coor.x, this.coor.y, this.radius, 0, pi * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  fall() {
    this.coor.y += this.vel.y;

    this.vel.y *= worldSettings.friction;
    this.vel.y += worldSettings.gravity;
  }

  move() {
    this.coor.x += this.vel.x * worldSettings.friction;
  }

  update() {
    this.move();
    this.fall();
    this.draw();

    this.alpha -= worldSettings.alphaDifference;
    this.radius *= worldSettings.radiusDecreaser;
  }
}

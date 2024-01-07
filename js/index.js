import { canvas, ctx, worldSettings } from "./config.js";
import { cos, randInt, random, sin } from "./math.js";
import Ball from "./Ball.js";

let mdown = false;

let balls = [];

function addBoom(x, y) {
  let num = worldSettings.numberOnSpawn;
  let angle = worldSettings.startAngleSpread;
  let angleStep =
    (worldSettings.endAngleSpread - worldSettings.startAngleSpread) / num;

  for (let i = 0; i < num; i++) {
    const force = randInt(worldSettings.minForce, worldSettings.maxForce);
    let rand = random();
    let vx = rand * cos(angle) * force * worldSettings.forceTimer;
    let vy = rand * sin(angle) * force * worldSettings.forceTimer;

    angle -= angleStep;

    balls.push(
      new Ball({
        vel: {
          x: vx,
          y: vy,
        },
        coor: {
          x,
          y,
        },
      })
    );
  }
}

function update() {
  if (worldSettings.glowEffect) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  if (mdown) {
    worldSettings.forceTimer += worldSettings.forcePower;
  } else {
    worldSettings.forceTimer = 1;
  }

  if (worldSettings.auto) {
    if (random() >= worldSettings.frequency) {
      let x = randInt(0, canvas.width);
      let y = randInt(0, canvas.height);

      addBoom(x, y);
    }
  }

  balls.forEach((e) => e.update());

  for (let i = balls.length - 1; i >= 0; i--) {
    if (
      balls[i].alpha <= 0 ||
      balls[i].coor.y + balls[i].radius >= canvas.height ||
      balls[i].coor.x >= canvas.width + balls[i].radius ||
      balls[i].coor.x <= -balls[i].radius
    ) {
      balls.splice(i, 1);
    }
  }

  requestAnimationFrame(update);
}

update();

canvas.addEventListener("mousedown", () => {
  mdown = true;
});
canvas.addEventListener("mouseup", ({ offsetX: x, offsetY: y }) => {
  mdown = false;
  addBoom(x, y);
});

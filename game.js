
const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint, Constraint, Body, Events } = Matter;

const engine = Engine.create();
const { world } = engine;

const canvas = document.getElementById('gameCanvas');
const _WIDTH = 1555.2;
const _HEIGHT = 874.8;
const render = Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    width: _WIDTH,  // 가로 크기를 1200으로 변경
    height: _HEIGHT,  // 세로 크기를 600으로 변경
    wireframes: false,
    background: '#87CEEB'
  }
});
Render.run(render);

const runner = Runner.create();
Runner.run(runner, engine);

const _HEIGHT_GROUND = 30;
const ground = Bodies.rectangle(_WIDTH*0.5, _HEIGHT-_HEIGHT_GROUND, _WIDTH, 30, { isStatic: true, render: { fillStyle: '#654321' } });
World.add(world, ground);

const birdImage = 'https://avatars.githubusercontent.com/u/76022353?v=4';

const _X_BIRD = 300;
const _Y_BIRD = _HEIGHT - 200;
const bird = Bodies.circle(_X_BIRD, _Y_BIRD, 30, {
  density: 0.004,
  restitution: 0.8,
  render: {
    sprite: {
      texture: birdImage,
      xScale: 0.15,
      yScale: 0.15
    }
  }
});
World.add(world, bird);

const slingshot = Constraint.create({
  pointA: { x: _X_BIRD, y: _Y_BIRD },
  bodyB: bird,
  stiffness: 0.05,
  render: {
    lineWidth: 5,
    strokeStyle: 'black'
  }
});
World.add(world, slingshot);

const pigImage = 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FUAasc%2FbtrQp6wHPVy%2FJWtua9IOvhkcsLMvK7IPW1%2Fimg.png';
const _X_TARGET = 1200;
const _Y_TARGET = _HEIGHT - 80;
const target = Bodies.circle(_X_TARGET, _Y_TARGET, 20, { 
  isStatic: true, 
  render: {
    sprite: {
      texture: pigImage,
      xScale: 0.05,
      yScale: 0.05
    }
  }
});
World.add(world, target);


// Simple wooden structure with two pillars and a roof
const woodColor = '#8B4513';
const leftPillar = Bodies.rectangle(_X_TARGET-50, _Y_TARGET, 20, 60, { render: { fillStyle: woodColor } });
const rightPillar = Bodies.rectangle(_X_TARGET+50, _Y_TARGET, 20, 60, { render: { fillStyle: woodColor } });
const roof = Bodies.rectangle(_X_TARGET, _Y_TARGET-30, 100, 20, { render: { fillStyle: woodColor } });

World.add(world, [leftPillar, rightPillar, roof]);

const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: { visible: false }
  }
});
World.add(world, mouseConstraint);

let isLaunched = false;

function calculateDistance(x1, y1, x2, y2) {
  const deltaX = Math.abs(x2 - x1);
  const deltaY = Math.abs(y2 - y1);
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

Events.on(mouseConstraint, 'enddrag', (event) => {
  if (event.body === bird) {
    const distance = calculateDistance(_X_BIRD, _Y_BIRD, bird.position.x, bird.position.y);
    if (distance > 60) {
      isLaunched = true;
      setTimeout(() => {
        World.remove(world, slingshot);
      }, 1);
    }
  }
});

Events.on(engine, 'afterUpdate', () => {
  if (isLaunched && (bird.position.x > 1600 || bird.position.y > 850 || bird.position.x < 0 || bird.position.y < 0)) {
    Body.setPosition(bird, { x: 150, y: 300 });
    Body.setVelocity(bird, { x: 0, y: 0 });
    World.add(world, slingshot);
    isLaunched = false;
  }
});

Events.on(engine, 'collisionStart', (event) => {
  event.pairs.forEach((pair) => {
    if ((pair.bodyA === bird && pair.bodyB === target) || (pair.bodyB === bird && pair.bodyA === target)) {
      setTimeout(() => {
        alert("CLEAR");
        history.go(0);
      }, 100);
    }
  });
});

render.mouse = mouse;

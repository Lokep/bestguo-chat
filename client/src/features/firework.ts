import $ from 'jquery';

export default function firework() {
  const a = $('#canvas')[0] as HTMLCanvasElement;
  a.width = $(window).width() as number;
  a.height = $(window).height() as number;


  const c = a.getContext('2d') as CanvasRenderingContext2D;

  $(window).on('resize', function () {
    a.width = $(window).width() as number;
    a.height = $(window).height() as number;

    c.fillStyle = '#eee';
    c.fillRect(0, 0, a.width, a.height);
  });

  c.fillStyle = '#000';
  c.fillRect(0, 0, a.width, a.height);

  interface IE {
    x: number;
    y: number;
    size: number;
    fill: string;
    ax: number;
    vx: number;
    vy: number;
    far: number;
    base?: {
      x: number;
      y: number;
      vx: number;
    }
  }

  const h: Array<IE> = [];
  const j: Array<IQ> = [];
  const f = 10;
  const b = {
    x: a.width / 2,
    y: a.height / 2,
  };

  var m = 100;

  for (let g = 0; g < f; g++) {
    const e: IE = {
      x: (Math.random() * m) / 2 - m / 4 + b.x,
      y: Math.random() * m * 2 + a.height,
      size: Math.random() + 0.5,
      fill: '#fd1',
      vx: Math.random() - 0.5,
      vy: -(Math.random() + 4),
      ax: Math.random() * 0.02 - 0.01,
      far: Math.random() * m + (b.y - m),
    };
    e.base = {
      x: e.x,
      y: e.y,
      vx: e.vx,
    };
    h.push(e);
  }
  function l() {
    var q = Math.floor(Math.random() * 256);
    var p = Math.floor(Math.random() * 256);
    var i = Math.floor(Math.random() * 256);
    var o = 'rgb($r, $g, $b)';
    o = o.replace('$r', q);
    o = o.replace('$g', p);
    o = o.replace('$b', i);
    return o;
  }
  (function k() {
    requestAnimationFrame(k);
    n();
    d();
  })();

  interface IQ {
    x: number;
    y: number;
    size: number;
    fill: string;
    vx: number;
    vy: number;
    ay: number;
    alpha: number;
    life: number;
    base?: {
      life: number;
      size: number;
    };
  }

  function n() {
    for (let r = 0; r < h.length; r++) {
      const p = h[r];

      if (p.y <= p.far) {
        const o = l();
        for (let r = 0; r < f * 5; r++) {
          const q: IQ = {
            x: p.x,
            y: p.y,
            size: Math.random() + 1.5,
            fill: o,
            vx: Math.random() * 5 - 2.5,
            vy: Math.random() * -5 + 1.5,
            ay: 0.05,
            alpha: 1,
            life: Math.round((Math.random() * m) / 2) + m / 2,
          };
          q.base = {
            life: q.life,
            size: q.size,
          };
          j.push(q);
        }
        p.y = p.base!.y;
        p.x = p.base!.x;
        p.vx = p.base!.vx;
        p.ax = Math.random() * 0.02 - 0.01;
      }
      p.x += p.vx;
      p.y += p.vy;
      p.vx += p.ax;
    }
    for (var r = j.length - 1; r >= 0; r--) {
      var q = j[r];
      if (q) {
        q.x += q.vx;
        q.y += q.vy;
        q.vy += q.ay;
        q.alpha = q.life / q.base.life;
        q.size = q.alpha * q.base.size;
        q.alpha = q.alpha > 0.6 ? 1 : q.alpha;
        q.life--;
        if (q.life <= 0) {
          j.splice(r, 1);
        }
      }
    }
  }
  function d() {
    c.globalCompositeOperation = 'source-over';
    c.globalAlpha = 0.18;

    c.fillStyle = '#415574';

    const image = new Image();
    image.src = new URL(
      '../assets/WeChatc305b8f032f07df4ebc0254836626b4c.jpg',
      import.meta.url,
    ).href;

    // const el = coverImg(a.width, a.height, image.width, image.height);

    // c.drawImage(image, el.sx, el.sy, el.sWidth, el.sHeight);

    c.fillRect(0, 0, a.width, a.height);
    c.globalCompositeOperation = 'screen';
    c.globalAlpha = 1;
    for (var q = 0; q < h.length; q++) {
      var o = h[q];
      c.beginPath();
      c.arc(o.x, o.y, o.size, 0, Math.PI * 2);
      c.closePath();
      c.fillStyle = o.fill;
      c.fill();
    }
    for (var q = 0; q < j.length; q++) {
      var p = j[q];
      c.globalAlpha = p.alpha;
      c.beginPath();
      c.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      c.closePath();
      c.fillStyle = p.fill;
      c.fill();
    }
  }
}

function coverImg(
  box_w: number, // 容器宽度
  box_h: number, // 容器高度
  source_w: number,
  source_h: number
) {
  var sx = 0,
    sy = 0,
    sWidth = source_w,
    sHeight = source_h;

  if (
    source_w > source_h ||
    (source_w == source_h && box_w < box_h)
  ) {
    sWidth = (box_w * sHeight) / box_h;
    sx = (source_w - sWidth) / 2;
  } else if (
    source_w < source_h ||
    (source_w == source_h && box_w > box_h)
  ) {
    sHeight = (box_h * sWidth) / box_w;
    sy = (source_h - sHeight) / 2;
  }

  return {
    sx,
    sy,
    sWidth,
    sHeight,
  };
}

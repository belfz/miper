class Idea {
  constructor (paper, parent = {x2: 500, y2: 50, subscribe: () => {}}, x2, y2, onUpdateCallback) {
    const radius = 20;
    this.x1 = parent.x2;
    this.y1 = parent.y2;

    if (!x2 && !y2) {
      x2 = parent.x2;
      y2 = parent.y2 + 50;
    }

    this.x2 = x2;
    this.y2 = y2;
    this.c2 = paper.circle(this.x2, this.y2, radius);
    this.line = paper.line(this.x1, this.y1, this.x2, this.y2);
    this.line.attr({
      stroke: "#000",
      strokeWidth: 5,
      strokeLinecap:"round"
    });

    this.c2.drag(this.move.bind(this), this.start.bind(this), this.stop.bind(this));

    this.onUpdateCallback = onUpdateCallback;

    parent.subscribe(this);
    this.children = [];
  }

  move (dx, dy) {
    this.c2.attr({
      cx: this.x2 + dx,
      cy: this.y2 + dy
    });
    this.line.attr({
      x2: this.x2 + dx,
      y2: this.y2 + dy
    });
    this.children.forEach(child => child.notify(dx, dy));
  }

  start () {
    console.log('drag started');
  }

  stop () {
    this.x2 = +this.line.attr('x2');
    this.y2 = +this.line.attr('y2');
    this.children.forEach(child => child.notifyEnd());
    this.onUpdateCallback();
  }

  subscribe (child) {
    this.children.push(child);
  }

  notify (dx, dy) {
    this.line.attr({
      x1: this.x1 + dx,
      y1: this.y1 + dy
    });
  }

  notifyEnd () {
    this.x1 = +this.line.attr('x1');
    this.y1 = +this.line.attr('y1');
  }
}

export default Idea;

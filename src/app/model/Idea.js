import uuid from 'uuid';

class Idea {
  constructor (paper, parent = {x2: 500, y2: 50, subscribe: () => {}}, x2, y2, onUpdateCallback) {
    const radius = 30;
    const distance = 150;

    //TODO refactor this - this cant be based on uuid (rahter on ObjectID from mongo); Its a proof of concept for now.
    this.uuid = uuid();

    this.x1 = parent.x2;
    this.y1 = parent.y2;

    if (!x2 && !y2) {
      x2 = parent.x2;
      y2 = parent.y2 + distance;
    }

    this.x2 = x2;
    this.y2 = y2;
    this.body = paper.circle(this.x2, this.y2, radius);
    this.line = paper.line(this.x1, this.y1, this.x2, this.y2);
    this.line.attr({
      stroke: "#000",
      strokeWidth: 5,
      strokeLinecap:"round"
    });

    this.plus = paper.circle(this.x2 + 25, this.y2-15, radius/4);
    this.plus.attr({
      fill: 'green',
      'class': 'plus'
    });

    this.minus = paper.circle(this.x2 - 25, this.y2-15, radius/4);
    this.minus.attr({
      fill: 'red',
      'class': 'minus'
    });

    onUpdateCallback();

    this.plus.click(() => {
      //add new child: [distance]px below the parent and [distance]px to the right of most right child.
      let x = this.children.length ? this.children.map(c => c.x2)
          .reduce((p, n) => Math.max(p, n), 0) + distance : this.x2 - distance;
      let y = this.y2 + distance;
      new Idea(paper, this, x, y, onUpdateCallback);
    });

    this.minus.click(() => {
      if (!this.children.length) {
        parent.removeChild(this.uuid);
        this.body.remove();
        this.line.remove();
        this.plus.remove();
        this.minus.remove();
      }
    });

    this.body.drag(this.move.bind(this), this.start.bind(this), this.stop.bind(this));

    this.onUpdateCallback = onUpdateCallback;

    parent.subscribe(this);
    this.children = [];
  }

  move (dx, dy) {
    this.body.attr({
      cx: this.x2 + dx,
      cy: this.y2 + dy
    });

    this.plus.attr({
      cx: this.x2 + 25 + dx,
      cy: this.y2 - 15 + dy
    });

    this.minus.attr({
      cx: this.x2 - 25 + dx,
      cy: this.y2 - 15 + dy
    });

    this.line.attr({
      x2: this.x2 + dx,
      y2: this.y2 + dy
    });
    this.children.forEach(child => child.notify(dx, dy));
  }

  //stopPropagation to prevent clash with pan action
  start (a, b, e) { e.stopPropagation();
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

  removeChild (uuid) {
    this.children = this.children.filter(c => c.uuid !== uuid);
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

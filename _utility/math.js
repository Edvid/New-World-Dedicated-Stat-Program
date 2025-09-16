export const min = (_min, _num) => Math.min(_min, _num);
export const max = (_max, _num) => Math.max(_max, _num);
export const clamp = (_clamper1, _clamper2, _num) =>
  _clamper1 < _clamper2
    ? min(max(_num, _clamper1), _clamper2)
    : min(max(_num, _clamper2), _clamper1);

export function lerp(a, b, t) {
  return a * (1 - t) + b * t;
}

export class MinMaxGradient {
  nodeList;
  constructor(nodeList) {
    this.nodeList = nodeList.sort((a, b) => a.position - b.position);
  }

  colorAtPos(index) {
    let nodeBefore, nodeAfter;

    for (let i = 0; i < this.nodeList.length; i++) {
      if (this.nodeList[i].position > index) {
        nodeAfter = this.nodeList[i];
        nodeBefore = this.nodeList[Math.max(i - 1, 0)];
        break;
      }
    }

    let t =
      nodeAfter.position == nodeBefore.position
        ? nodeBefore.position
        : (index - nodeBefore.position) /
          (nodeAfter.position - nodeBefore.position);

    let ret = [
      lerp(nodeBefore.color[0], nodeAfter.color[0], t),
      lerp(nodeBefore.color[1], nodeAfter.color[1], t),
      lerp(nodeBefore.color[2], nodeAfter.color[2], t),
      255,
    ];
    return ret;
  }
}

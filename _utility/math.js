export const min = (_min, _num) => Math.min(_min, _num);
export const max = (_max, _num) => Math.max(_max, _num);
export const clamp = (_clamper1, _clamper2, _num) =>
  _clamper1 < _clamper2
    ? min(max(_num, _clamper1), _clamper2)
    : min(max(_num, _clamper2), _clamper1);

export function lerp(a, b, t) {
  return a * (1 - t) + b * t;
}


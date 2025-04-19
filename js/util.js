export const getMousePos = (e, rect) => {
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
};

export const isNear = (p1, p2, threshold = 6) => {
  return Math.abs(p1.x - p2.x) < threshold && Math.abs(p1.y - p2.y) < threshold;
};

export const snap = (val, step = 10) => {
  return Math.round(val / step) * step;
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

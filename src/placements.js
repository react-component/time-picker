const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1,
};

const targetOffset = [0, 0];

const placements = {
  bottomLeft: {
    points: ['tl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset,
  },
  bottomRight: {
    points: ['tr', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset,
  },
  topRight: {
    points: ['br', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset,
  },
  topLeft: {
    points: ['bl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset,
  },
  customNormal: {
    points: ['bl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 26],
    targetOffset,
  },
  customShort: {
    points: ['bl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 40],
    targetOffset,
  }
};

export default placements;

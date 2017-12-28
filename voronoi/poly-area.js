// credit: https://github.com/math-utils/area-polygon

// calculates area of irregular 2d polygons using determinants
function polyArea (points,signed) {
  function normalize(point) {
    if (!Array.isArray(point)) return point
    return {
      x: point[0],
      y: point[1]
    }
  }

  var l = points.length
  var det = 0
  var isSigned = signed || false

  points = points.map(normalize)
  if (points[0] != points[points.length -1])
    points = points.concat(points[0])

  for (var i = 0; i < l; i++)
    det += points[i].x * points[i + 1].y
      - points[i].y * points[i + 1].x
  if (isSigned)
    return det / 2
  else
    return Math.abs(det) / 2
}

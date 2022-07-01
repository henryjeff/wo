precision mediump float;

uniform float uTime;
uniform vec3 uCamPos;
uniform float uPosScale;
out vec3 pos;
out float camDist; // camera to point distance

void main() {
  pos = position;
  float xOffset = pos.x * 0.5 * uPosScale;
  float yOffset = pos.y * 0.3 * uPosScale;

  camDist = distance(uCamPos, pos);
  pos.z += sin(uTime + xOffset) + cos(uTime + yOffset) * 1.2;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
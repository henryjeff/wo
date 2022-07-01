precision mediump float;

in vec3 pos;
in float camDist;

void main() {
  vec3 dist = 1.0 - vec3(camDist / 20.0);

  gl_FragColor = vec4(dist, 1.0);
}
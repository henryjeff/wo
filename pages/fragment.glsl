precision mediump float;

in vec3 pos;
in float camDist; // camera to point distance
in vec3 rayOri;   // camera position
in vec3 rayDir;

void main() {
  vec3 rayDist = 1.0 - vec3(camDist / 20.0);

  gl_FragColor = vec4(rayDist, 1.0);
  // gl_FragColor = vec4(1.0. );
}
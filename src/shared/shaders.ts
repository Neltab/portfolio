const vertexShader = `
  #include <common>
    uniform float time;
    uniform float pointSize;
    uniform float loadedTime;
    attribute float turbulence;
    attribute float directionChangeSpeed;
    attribute vec3 initialPosition;
    attribute float seed;
    attribute vec3 color;
    attribute float lifetime;

    varying vec3 vColor; // Receive color from vertex shader
    varying vec2 vUv; // Pass UV coordinates to the fragment shader
    varying float vDiscard;
    
    float fade(float t) {
        return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
    }
    
    float lerp(float a, float b, float t) {
        return a + t * (b - a);
    }
    
    float grad(int hash, float x) {
        return (hash & 1) == 0 ? x : -x;
    }
    
    float perlinNoise(float x) {
      
        int xi = int(floor(x)) & 255;
        float xf = fract(x);
        float u = fade(xf);
        
        float g0 = grad(xi, xf);
        float g1 = grad(xi + 1, xf - 1.0);
        
        return lerp(g0, g1, u) * 2.0;
    }
    
    void main() {
        float noiseX = perlinNoise(time * directionChangeSpeed + seed * 300.0 + 10.0);
        float noiseY = perlinNoise(time * directionChangeSpeed * 0.2 + seed*5.6 - 410.0);
        float noiseZ = perlinNoise(time * directionChangeSpeed * 0.7 + seed * 200.0 + 500.0);
        
        vec3 displacement = vec3(turbulence * noiseX, turbulence * noiseY, turbulence * noiseZ);
        vec3 displacedPosition = initialPosition + displacement * noiseX * noiseZ * seed * 1.2;

        float lifetimePercent = (1.0 + (seed - 0.5));
        if (seed > 0.95) {
            lifetimePercent = mod(time, lifetime) / lifetime;
            if (lifetimePercent > 0.5) {
                lifetimePercent = 1.0 - lifetimePercent;
            }
            lifetimePercent = 5.0 * lifetimePercent;
        }
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float distanceRatio = 300.0 / -mvPosition.z;
        vDiscard = 0.0;
        float timeSinceLoaded = time - loadedTime;
        float distanceFromCenter = distance(vec3(0.0), displacedPosition);
        float farthestDistance = 30.0;
        float fadeInDuration = 2.0;
        float fadeIn = min(1.0, (timeSinceLoaded / fadeInDuration));
        // if (distanceFromCenter < (farthestDistance * fadeIn)) {
        //     vDiscard = 0.0;
        // }

        // gl_PointSize = pointSize * (300.0 / -mvPosition.z) * (1.0 + (seed - 0.5));
        gl_PointSize = pointSize * distanceRatio * lifetimePercent;
        vUv = uv;
  }
`;

const fragmentShader = `
    uniform sampler2D map;
    varying vec2 vUv;
    varying float vDiscard;

    void main() {
        if (vDiscard > 0.0) discard;
        if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;
        vec4 textureColor = texture2D(map, vUv);
        gl_FragColor = textureColor;
    }
`;

export { vertexShader, fragmentShader };
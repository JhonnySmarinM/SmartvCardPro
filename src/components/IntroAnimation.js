import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const IntroAnimation = ({ onComplete, enableSkip = true }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const trianglesRef = useRef([]);
  const cubeGroupRef = useRef(null);
  const sGroupRef = useRef(null);
  const currentObjectRef = useRef(null);
  const animationRunningRef = useRef(false);
  const animationFrameRef = useRef(null);
  
  const [showButton, setShowButton] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(enableSkip);

  // Colores corporativos de SmartvCard Pro
  const CORP_COLORS = [
    0x5C4033, // Marrón Chocolate - Color principal (Front)
    0x36454F, // Gris Carbón - Color secundario (Back)
    0xE91E63, // Fucsia - Acento vibrante principal (Top)
    0x00BCD4, // Turquesa - Acento secundario (Bottom)
    0x4A3329, // Marrón Oscuro - Borde (Right)
    0xF5F1EF  // Beige Claro - Texto/Luz (Left)
  ];

  // Crear una pirámide (una cara del cubo)
  const createPyramid = (faceIndex, color) => {
    const half = 1;

    const cubeVertices = [
      // 0: Z+ (Front)
      [half, half, half, -half, half, half, -half, -half, half, half, -half, half],
      // 1: Z- (Back)
      [-half, half, -half, half, half, -half, half, -half, -half, -half, -half, -half],
      // 2: Y+ (Top)
      [half, half, half, half, half, -half, -half, half, -half, -half, half, half],
      // 3: Y- (Bottom)
      [-half, -half, half, -half, -half, -half, half, -half, -half, half, -half, half],
      // 4: X+ (Right)
      [half, half, half, half, half, -half, half, -half, -half, half, -half, half],
      // 5: X- (Left)
      [-half, -half, half, -half, half, half, -half, half, -half, -half, -half, -half]
    ];

    const faceVertices = cubeVertices[faceIndex];
    const positions = [0, 0, 0, ...faceVertices];

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const indices = [
      // Base
      1, 3, 2, 1, 4, 3,
      // Lados
      0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 1
    ];
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const material = new THREE.MeshPhongMaterial({
      color: color,
      side: THREE.DoubleSide,
      flatShading: true,
      specular: 0xcccccc,
      shininess: 50
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.userData.cubePosition = mesh.position.clone();
    mesh.userData.originalRotation = mesh.rotation.clone();
    return mesh;
  };

  // Crear el cubo
  const createCube = (scene, cubeGroup, sGroup) => {
    const cubeTriangles = [];

    for (let i = 0; i < 6; i++) {
      const mesh = createPyramid(i, CORP_COLORS[i]);
      cubeGroup.add(mesh);
      cubeTriangles.push(mesh);
    }
    scene.add(cubeGroup);
    scene.add(sGroup);
    sGroup.visible = false;

    return cubeTriangles;
  };

  // Crear la geometría de la 'S'
  const createS = (triangles) => {
    const sPositions = [
      new THREE.Vector3(-1.0, 1.2, 0.2),
      new THREE.Vector3(1.0, 0.7, 0.2),
      new THREE.Vector3(-1.2, -0.7, 0.2),
      new THREE.Vector3(1.2, -1.2, 0.2),
      new THREE.Vector3(-0.2, 0.3, 0.2),
      new THREE.Vector3(0.2, -0.3, 0.2),
    ];

    const sRotations = [
      new THREE.Euler(0, 0, Math.PI / 3),
      new THREE.Euler(0, 0, -Math.PI / 8),
      new THREE.Euler(0, 0, Math.PI / 1.8),
      new THREE.Euler(0, 0, -Math.PI / 3),
      new THREE.Euler(Math.PI / 4, Math.PI / 4, 0),
      new THREE.Euler(-Math.PI / 4, -Math.PI / 4, 0),
    ];

    triangles.forEach((mesh, index) => {
      mesh.userData.sPosition = sPositions[index];
      mesh.userData.sRotation = sRotations[index];
    });
  };

  // Animación principal
  const startTransition = () => {
    if (animationRunningRef.current) return;
    animationRunningRef.current = true;

    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const triangles = trianglesRef.current;
    const cubeGroup = cubeGroupRef.current;
    const sGroup = sGroupRef.current;

    setShowButton(false);

    const tl = gsap.timeline({
      onComplete: () => {
        animationRunningRef.current = false;
        setShowButton(true);
      }
    });

    // FASE 1: Cubo - Giro Lento (2.5s)
    tl.to(cubeGroup.rotation, {
      y: Math.PI * 2,
      duration: 2.5,
      ease: "power1.inOut"
    }, 0);

    // FASE 2: Transición - Explosión y Caos (1.5s)
    tl.to(cubeGroup.rotation, {
      y: "+=" + Math.PI * 4,
      x: "+=" + Math.PI * 2,
      duration: 0.3,
      ease: "power2.in"
    }, 2.5);

    // CÁMARA: Zoom out dramático
    tl.to(camera.position, {
      z: 6,
      duration: 1.0,
      ease: "power2.inOut"
    }, 2.7);

    // Separación
    tl.add(() => {
      triangles.forEach(mesh => {
        scene.attach(mesh);
      });
      cubeGroup.visible = false;
    }, 2.7);

    // Explosión de triángulos
    triangles.forEach((mesh) => {
      const distance = 4;
      const explosionDirection = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize().multiplyScalar(distance * (0.8 + Math.random() * 0.4));

      tl.to(mesh.position, {
        x: explosionDirection.x, y: explosionDirection.y, z: explosionDirection.z,
        duration: 1.0,
        ease: "power3.out"
      }, 2.8);

      tl.to(mesh.rotation, {
        x: Math.random() * Math.PI * 10,
        y: Math.random() * Math.PI * 10,
        z: Math.random() * Math.PI * 10,
        duration: 1.0,
        ease: "power3.out"
      }, 2.8);
    });

    // Destello
    tl.to(renderer.domElement.style, {
      opacity: 0,
      duration: 0.1,
      ease: "power1.inOut"
    }, 3.8);

    tl.to(renderer.domElement.style, {
      opacity: 1,
      duration: 0.1,
      ease: "power1.inOut",
      onComplete: () => {
        sGroup.visible = true;
        currentObjectRef.current = sGroup;

        triangles.forEach(mesh => {
          sGroup.attach(mesh);
        });

        sGroup.position.set(0, 0, -10);
        sGroup.rotation.set(0, Math.PI * 0.5, 0);
      }
    }, 3.9);

    // FASE 3: Formación de la 'S' (1.5s)
    tl.to(camera.position, {
      z: 3.5,
      duration: 0.5,
      ease: "power3.out"
    }, 4.0);

    tl.to(sGroup.position, {
      z: 0,
      duration: 0.5,
      ease: "power3.out"
    }, 4.0);

    triangles.forEach((mesh, index) => {
      const delay = 4.0 + (index * 0.05);

      tl.to(mesh.position, {
        x: mesh.userData.sPosition.x, y: mesh.userData.sPosition.y, z: mesh.userData.sPosition.z,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
      }, delay);

      tl.to(mesh.rotation, {
        x: mesh.userData.sRotation.x, y: mesh.userData.sRotation.y, z: mesh.userData.sRotation.z,
        duration: 1.5,
        ease: "power3.inOut"
      }, delay);
    });

    tl.to(sGroup.rotation, {
      y: 0,
      duration: 1.5,
      ease: "power3.inOut"
    }, 4.0);

    // FASE 4: Balanceo y Parada
    tl.to(sGroup.rotation, {
      z: Math.PI / 16,
      duration: 1.5,
      ease: "power1.inOut"
    }, 5.8);

    tl.to(sGroup.rotation, {
      x: 0, y: 0, z: 0,
      duration: 1.0,
      ease: "power2.out"
    }, 7.3);

    tl.add("EndPause", 8.3);
  };

  // Bucle de renderizado
  const animate = () => {
    animationFrameRef.current = requestAnimationFrame(animate);

    if (!animationRunningRef.current && currentObjectRef.current) {
      currentObjectRef.current.rotation.y += 0.001;
    }

    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  };

  useEffect(() => {
    // Inicializar Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x36454F, 0);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 3.5;

    // Luces
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight1.position.set(5, 5, 5).normalize();
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight2.position.set(-5, -5, -5).normalize();
    scene.add(directionalLight2);

    // Crear grupos
    const cubeGroup = new THREE.Group();
    const sGroup = new THREE.Group();

    // Guardar referencias
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    cubeGroupRef.current = cubeGroup;
    sGroupRef.current = sGroup;

    // Crear geometrías
    const triangles = createCube(scene, cubeGroup, sGroup);
    trianglesRef.current = triangles;
    createS(triangles);

    currentObjectRef.current = cubeGroup;

    // Iniciar animación
    animate();
    startTransition();

    // Manejo de resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleButtonClick = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const handleSkip = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(135deg, #5C4033 0%, #36454F 100%)',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      <div ref={containerRef} style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        cursor: 'pointer'
      }} />

      {/* Botón Skip Intro */}
      {showSkipButton && (
        <button
          onClick={handleSkip}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '12px 24px',
            background: 'rgba(92, 64, 51, 0.5)',
            border: '2px solid rgba(233, 30, 99, 0.6)',
            borderRadius: '25px',
            color: '#F5F1EF',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            zIndex: 21,
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(233, 30, 99, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(233, 30, 99, 0.6)';
            e.target.style.borderColor = '#00BCD4';
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 6px 20px rgba(233, 30, 99, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(92, 64, 51, 0.5)';
            e.target.style.borderColor = 'rgba(233, 30, 99, 0.6)';
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 15px rgba(233, 30, 99, 0.2)';
          }}
        >
          Saltar Intro →
        </button>
      )}

      {/* Botón que aparece al finalizar */}
      <button
        onClick={handleButtonClick}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(120px, 35vw, 280px)',
          height: 'clamp(120px, 35vw, 280px)',
          background: 'rgba(92, 64, 51, 0.3)',
          border: '3px solid rgba(233, 30, 99, 0.5)',
          borderRadius: '50%',
          padding: '20px',
          opacity: showButton ? 1 : 0,
          transition: 'all 0.5s ease-in-out',
          cursor: 'pointer',
          zIndex: 20,
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 40px rgba(233, 30, 99, 0.3)',
          pointerEvents: showButton ? 'auto' : 'none'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(233, 30, 99, 0.4)';
          e.target.style.borderColor = '#00BCD4';
          e.target.style.transform = 'translate(-50%, -50%) scale(1.08)';
          e.target.style.boxShadow = '0 15px 50px rgba(233, 30, 99, 0.5), 0 0 30px rgba(0, 188, 212, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(92, 64, 51, 0.3)';
          e.target.style.borderColor = 'rgba(233, 30, 99, 0.5)';
          e.target.style.transform = 'translate(-50%, -50%) scale(1)';
          e.target.style.boxShadow = '0 10px 40px rgba(233, 30, 99, 0.3)';
        }}
      >
        {/* Logo de SmartvCard Pro */}
        <img 
          src="/assets/LogoVcards.png" 
          alt="SmartvCard Pro Logo" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: '50%',
            filter: 'drop-shadow(0 0 15px rgba(233, 30, 99, 0.5))'
          }}
        />
      </button>
    </div>
  );
};

export default IntroAnimation;


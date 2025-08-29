import Head from 'next/head';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function MinecraftPortfolio() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const frameRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(true);
  const [interactionText, setInteractionText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Minecraft-style game state
  const gameStateRef = useRef({
    keys: {},
    mouse: { x: 0, y: 0 },
    velocity: new THREE.Vector3(),
    isOnGround: false,
    raycaster: new THREE.Raycaster(),
    intersectedObject: null,
    clock: new THREE.Clock(),
    yaw: 0,
    pitch: 0
  });

  // Minecraft physics settings
  const PLAYER_HEIGHT = 1.8;
  const PLAYER_WIDTH = 0.6;
  const MOVE_SPEED = 4.317; // Minecraft walking speed
  const SPRINT_SPEED = 5.612; // Minecraft sprinting speed
  const JUMP_FORCE = 7.5; // Minecraft jump height
  const GRAVITY = -23; // Minecraft gravity
  const MOUSE_SENSITIVITY = 0.0022; // Minecraft-like sensitivity
  const REACH_DISTANCE = 5; // Block reach distance

  // Create Minecraft-style terrain
  const createTerrain = (scene) => {
    const terrain = [];
    const CHUNK_SIZE = 32;
    const BLOCK_SIZE = 1;
    
    // Store terrain data for collision detection
    const terrainMap = new Map();
    
    // Create block geometry (reuse for performance)
    const blockGeometry = new THREE.BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    
    // Different block materials
    const materials = {
      grass: new THREE.MeshLambertMaterial({ color: 0x7cb342 }),
      dirt: new THREE.MeshLambertMaterial({ color: 0x8d6e63 }),
      stone: new THREE.MeshLambertMaterial({ color: 0x616161 }),
      water: new THREE.MeshLambertMaterial({ color: 0x2196f3, transparent: true, opacity: 0.7 }),
      sand: new THREE.MeshLambertMaterial({ color: 0xffc107 })
    };

    // Generate terrain with noise-like pattern
    for (let x = -CHUNK_SIZE/2; x < CHUNK_SIZE/2; x++) {
      for (let z = -CHUNK_SIZE/2; z < CHUNK_SIZE/2; z++) {
        // Simple height generation (you could use noise libraries for better terrain)
        const height = Math.floor(Math.sin(x * 0.1) * Math.cos(z * 0.1) * 3 + 5);
        
        // Store the height for this x,z coordinate
        terrainMap.set(`${x},${z}`, height + 1); // +1 because blocks go from 0 to height, so surface is at height+1
        
        for (let y = 0; y <= height; y++) {
          let material;
          if (y === height && height > 3) {
            material = materials.grass;
          } else if (y > height - 3 && height > 3) {
            material = materials.dirt;
          } else {
            material = materials.stone;
          }
          
          const block = new THREE.Mesh(blockGeometry, material);
          block.position.set(x, y, z);
          block.castShadow = true;
          block.receiveShadow = true;
          block.userData = { type: 'block', blockType: 'terrain' };
          scene.add(block);
          terrain.push(block);
        }
      }
    }

    // Add some water blocks
    for (let x = -5; x < 5; x++) {
      for (let z = 10; z < 20; z++) {
        for (let y = 0; y <= 2; y++) {
          const waterBlock = new THREE.Mesh(blockGeometry, materials.water);
          waterBlock.position.set(x, y, z);
          waterBlock.userData = { type: 'block', blockType: 'water' };
          scene.add(waterBlock);
          terrain.push(waterBlock);
        }
        // Update terrain map for water areas
        terrainMap.set(`${x},${z}`, 3); // Water surface at y=3
      }
    }

    return { terrain, terrainMap };
  };

  // Create skill structures (Minecraft buildings)
  const createSkillBuildings = (scene) => {
    const blockGeometry = new THREE.BoxGeometry(1, 1, 1);
    const skills = [
      { name: 'React', color: 0x61dafb, position: [-15, 6, -15], description: 'Building dynamic user interfaces with modern React patterns and hooks.' },
      { name: 'Next.js', color: 0x000000, position: [15, 6, -15], description: 'Full-stack development with server-side rendering and API routes.' },
      { name: 'Three.js', color: 0x049ef4, position: [-15, 6, 15], description: 'Creating immersive 3D experiences and interactive graphics.' },
      { name: 'JavaScript', color: 0xf7df1e, position: [15, 6, 15], description: 'Modern ES6+ development with async/await and advanced patterns.' },
      { name: 'Python', color: 0x3776ab, position: [0, 8, -20], description: 'Data analysis, machine learning, and backend development.' },
      { name: 'AI/ML', color: 0xff6b6b, position: [0, 8, 20], description: 'Artificial intelligence and machine learning applications.' }
    ];

    const buildings = [];

    skills.forEach((skill, index) => {
      const building = [];
      const basePos = skill.position;
      
      // Create skill material
      const skillMaterial = new THREE.MeshLambertMaterial({ 
        color: skill.color,
        emissive: skill.color,
        emissiveIntensity: 0.1
      });

      // Build a tower for each skill
      for (let y = 0; y < 8; y++) {
        for (let x = -1; x <= 1; x++) {
          for (let z = -1; z <= 1; z++) {
            // Hollow out the middle on upper floors
            if (y > 2 && x === 0 && z === 0) continue;
            
            const block = new THREE.Mesh(blockGeometry, skillMaterial.clone());
            block.position.set(basePos[0] + x, basePos[1] + y, basePos[2] + z);
            block.castShadow = true;
            block.receiveShadow = true;
            block.userData = { 
              type: 'skill', 
              skill: skill.name,
              description: skill.description
            };
            scene.add(block);
            building.push(block);
          }
        }
      }

      // Add a glowing beacon on top
      const beaconMaterial = new THREE.MeshBasicMaterial({ 
        color: skill.color,
        emissive: skill.color,
        emissiveIntensity: 0.5
      });
      const beacon = new THREE.Mesh(blockGeometry, beaconMaterial);
      beacon.position.set(basePos[0], basePos[1] + 8, basePos[2]);
      beacon.userData = { 
        type: 'skill', 
        skill: skill.name,
        description: skill.description
      };
      scene.add(beacon);
      building.push(beacon);

      // Create floating text
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 256;
      canvas.height = 64;
      context.fillStyle = '#ffffff';
      context.font = 'bold 24px Arial';
      context.textAlign = 'center';
      context.fillText(skill.name, 128, 40);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(basePos[0], basePos[1] + 10, basePos[2]);
      sprite.scale.set(4, 1, 1);
      scene.add(sprite);

      buildings.push(building);
    });

    return buildings;
  };

  // Create project portals (Nether portal style)
  const createProjectPortals = (scene) => {
    const blockGeometry = new THREE.BoxGeometry(1, 1, 1);
    const projects = [
      { 
        name: 'AI Portfolio', 
        color: 0x6366f1, 
        position: [-8, 6, 0],
        description: 'This interactive portfolio featuring AI chat widget and modern animations.',
        link: '/'
      },
      { 
        name: 'ML Project', 
        color: 0x8b5cf6, 
        position: [8, 6, 0],
        description: 'Machine learning project with data visualization and model training.',
        link: '#'
      },
      { 
        name: '3D Experience', 
        color: 0xec4899, 
        position: [0, 6, -10],
        description: 'This immersive 3D Minecraft-style portfolio built with Three.js.',
        link: '/3d-portfolio'
      }
    ];

    const portals = [];

    projects.forEach((project, index) => {
      const portal = [];
      const basePos = project.position;
      
      // Create obsidian-like frame material
      const frameMaterial = new THREE.MeshLambertMaterial({ color: 0x2c1810 });
      
      // Create portal frame (4x5 blocks)
      for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 4; x++) {
          // Only create frame blocks (hollow center)
          if ((x === 0 || x === 3) || (y === 0 || y === 4)) {
            const frameBlock = new THREE.Mesh(blockGeometry, frameMaterial);
            frameBlock.position.set(basePos[0] + x - 1.5, basePos[1] + y, basePos[2]);
            frameBlock.castShadow = true;
            frameBlock.receiveShadow = true;
            scene.add(frameBlock);
            portal.push(frameBlock);
          }
        }
      }

      // Create portal interior with particles
      const portalMaterial = new THREE.MeshBasicMaterial({ 
        color: project.color,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
      });
      
      for (let y = 1; y < 4; y++) {
        for (let x = 1; x < 3; x++) {
          const portalBlock = new THREE.Mesh(blockGeometry, portalMaterial.clone());
          portalBlock.position.set(basePos[0] + x - 1.5, basePos[1] + y, basePos[2]);
          portalBlock.userData = { 
            type: 'project', 
            project: project.name,
            description: project.description,
            link: project.link
          };
          scene.add(portalBlock);
          portal.push(portalBlock);
        }
      }

      portals.push(portal);
    });

    return portals;
  };

  // Minecraft-style controls (no pointer lock needed)
  const setupMinecraftControls = () => {
    const canvas = rendererRef.current.domElement;

    // Keyboard controls
    const onKeyDown = (event) => {
      gameStateRef.current.keys[event.code] = true;
      event.preventDefault();
    };

    const onKeyUp = (event) => {
      gameStateRef.current.keys[event.code] = false;
      event.preventDefault();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // Mouse movement (standard mouse control)
    const onMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      
      // Convert to normalized coordinates and apply sensitivity
      gameStateRef.current.yaw = (x - 0.5) * Math.PI * 2;
      gameStateRef.current.pitch = (y - 0.5) * Math.PI;
      
      // Clamp pitch to prevent over-rotation
      gameStateRef.current.pitch = Math.max(-Math.PI/2, Math.min(Math.PI/2, gameStateRef.current.pitch));
      
      // Apply rotation to camera
      const camera = cameraRef.current;
      camera.rotation.order = 'YXZ';
      camera.rotation.y = gameStateRef.current.yaw;
      camera.rotation.x = gameStateRef.current.pitch;
    };

    document.addEventListener('mousemove', onMouseMove);

    // Click interactions
    const onMouseDown = (event) => {
      if (event.button === 0) { // Left click
        const intersected = gameStateRef.current.intersectedObject;
        if (intersected && intersected.userData.type !== 'block') {
          handleObjectClick(intersected);
        }
      }
    };

    canvas.addEventListener('mousedown', onMouseDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mousedown', onMouseDown);
    };
  };

  // Handle object interactions
  const handleObjectClick = (object) => {
    const userData = object.userData;
    
    if (userData.type === 'skill') {
      setModalContent({
        title: userData.skill,
        description: userData.description,
        type: 'skill'
      });
      setShowModal(true);
    } else if (userData.type === 'project') {
      if (userData.link === '#') {
        setModalContent({
          title: userData.project,
          description: userData.description,
          type: 'project'
        });
        setShowModal(true);
      } else {
        window.open(userData.link, '_self');
      }
    }
  };

  // Minecraft-style physics and movement with proper collision
  const updateMinecraftMovement = (delta, terrainMap) => {
    const camera = cameraRef.current;
    const velocity = gameStateRef.current.velocity;
    const keys = gameStateRef.current.keys;

    // Movement input
    const direction = new THREE.Vector3();
    if (keys['KeyW']) direction.z -= 1;
    if (keys['KeyS']) direction.z += 1;
    if (keys['KeyA']) direction.x -= 1;
    if (keys['KeyD']) direction.x += 1;

    // Sprinting
    const isRunning = keys['ControlLeft'] || keys['ControlRight'];
    const currentSpeed = isRunning ? SPRINT_SPEED : MOVE_SPEED;

    if (direction.length() > 0) {
      direction.normalize();
      
      // Apply camera rotation to movement direction
      const yaw = gameStateRef.current.yaw;
      const moveX = direction.x * Math.cos(yaw) - direction.z * Math.sin(yaw);
      const moveZ = direction.x * Math.sin(yaw) + direction.z * Math.cos(yaw);
      
      velocity.x = moveX * currentSpeed;
      velocity.z = moveZ * currentSpeed;
    } else {
      // Apply friction when not moving
      velocity.x *= 0.8;
      velocity.z *= 0.8;
    }

    // Jumping
    if (keys['Space'] && gameStateRef.current.isOnGround) {
      velocity.y = JUMP_FORCE;
      gameStateRef.current.isOnGround = false;
    }

    // Apply gravity
    velocity.y += GRAVITY * delta;

    // Calculate new position
    const deltaPosition = velocity.clone().multiplyScalar(delta);
    const newPosition = camera.position.clone().add(deltaPosition);

    // Get terrain height at current position
    const x = Math.floor(newPosition.x);
    const z = Math.floor(newPosition.z);
    const terrainHeight = terrainMap.get(`${x},${z}`) || 1; // Default height if no terrain data
    const groundLevel = terrainHeight + PLAYER_HEIGHT;

    // Horizontal movement (check for walls/boundaries)
    const testX = Math.floor(newPosition.x);
    const testZ = Math.floor(newPosition.z);
    
    // Only move if within bounds and terrain exists
    if (terrainMap.has(`${testX},${testZ}`)) {
      camera.position.x = newPosition.x;
      camera.position.z = newPosition.z;
    } else {
      // Stop horizontal velocity if hitting boundary
      velocity.x = 0;
      velocity.z = 0;
    }

    // Vertical movement with ground collision
    if (newPosition.y <= groundLevel) {
      camera.position.y = groundLevel;
      velocity.y = 0;
      gameStateRef.current.isOnGround = true;
    } else {
      camera.position.y = newPosition.y;
      gameStateRef.current.isOnGround = false;
    }

    // Prevent falling through world (safety net)
    if (camera.position.y < -10) {
      camera.position.set(0, PLAYER_HEIGHT + 10, 5);
      velocity.set(0, 0, 0);
      gameStateRef.current.isOnGround = false;
    }
  };

  // Update crosshair targeting
  const updateCrosshairTarget = () => {
    const camera = cameraRef.current;
    const raycaster = gameStateRef.current.raycaster;
    
    // Cast ray from camera center
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
    
    const interactableObjects = sceneRef.current.children.filter(child => 
      child.userData.type === 'skill' || child.userData.type === 'project'
    );
    
    const intersects = raycaster.intersectObjects(interactableObjects);
    
    // Reset previous intersection
    if (gameStateRef.current.intersectedObject) {
      const prevMaterial = gameStateRef.current.intersectedObject.material;
      if (prevMaterial && prevMaterial.emissiveIntensity !== undefined) {
        prevMaterial.emissiveIntensity = Math.max(0, prevMaterial.emissiveIntensity - 0.2);
      }
    }
    
    if (intersects.length > 0) {
      const intersected = intersects[0];
      if (intersected.distance < REACH_DISTANCE) {
        gameStateRef.current.intersectedObject = intersected.object;
        
        // Highlight object
        const material = intersected.object.material;
        if (material && material.emissiveIntensity !== undefined) {
          material.emissiveIntensity = Math.min(material.emissiveIntensity + 0.2, 0.5);
        }
        
        const userData = intersected.object.userData;
        if (userData.type === 'skill') {
          setInteractionText(`${userData.skill} - Click to learn more`);
        } else if (userData.type === 'project') {
          setInteractionText(`${userData.project} - Click to ${userData.link === '#' ? 'view' : 'open'}`);
        }
      } else {
        gameStateRef.current.intersectedObject = null;
        setInteractionText('');
      }
    } else {
      gameStateRef.current.intersectedObject = null;
      setInteractionText('');
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Sky blue like Minecraft
    scene.fog = new THREE.Fog(0x87ceeb, 30, 80);
    sceneRef.current = scene;

    // Camera setup (first-person)
    const camera = new THREE.PerspectiveCamera(
      70, // Minecraft FOV
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, PLAYER_HEIGHT + 10, 5); // Start elevated
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false // Minecraft-style pixelated look
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Minecraft-style lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 0.8);
    sunLight.position.set(50, 100, 50);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 200;
    sunLight.shadow.camera.left = -50;
    sunLight.shadow.camera.right = 50;
    sunLight.shadow.camera.top = 50;
    sunLight.shadow.camera.bottom = -50;
    scene.add(sunLight);

    // Create world
    const { terrain, terrainMap } = createTerrain(scene);
    const skillBuildings = createSkillBuildings(scene);
    const projectPortals = createProjectPortals(scene);

    // Setup controls
    const cleanupControls = setupMinecraftControls();

    // Game loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const delta = gameStateRef.current.clock.getDelta();
      const time = gameStateRef.current.clock.getElapsedTime();

      if (gameStarted) {
        updateMinecraftMovement(delta, terrainMap);
        updateCrosshairTarget();
      }

      // Animate beacon blocks
      skillBuildings.forEach((building, buildingIndex) => {
        building.forEach((block, blockIndex) => {
          if (block.userData.type === 'skill' && block.material.emissiveIntensity !== undefined) {
            // Make beacons pulse
            if (blockIndex === building.length - 1) { // Last block is the beacon
              block.material.emissiveIntensity = 0.3 + Math.sin(time * 3 + buildingIndex) * 0.2;
            }
          }
        });
      });

      // Animate portal blocks
      projectPortals.forEach((portal, portalIndex) => {
        portal.forEach(block => {
          if (block.userData.type === 'project') {
            block.material.opacity = 0.6 + Math.sin(time * 2 + portalIndex) * 0.2;
          }
        });
      });

      renderer.render(scene, camera);
    };

    animate();
    setIsLoading(false);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cleanupControls();
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Minecraft Portfolio - My My Nguyen</title>
        <meta name="description" content="A Minecraft-style 3D portfolio world! Use WASD to move, mouse to look around, and explore my skills and projects!" />
        <link rel="icon" href="/favicon.webp" />
      </Head>

      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#87ceeb' }}>
        {/* Loading screen */}
        {isLoading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2c1810',
            zIndex: 50,
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            fontFamily: 'monospace'
          }}>
            <div style={{ marginBottom: '1rem', fontSize: '2rem' }}>⛏️ Loading Minecraft Portfolio...</div>
            <div style={{ fontSize: '1rem', opacity: 0.8 }}>Building blocks... 🧱</div>
          </div>
        )}

        {/* Game start screen */}
        {!gameStarted && !isLoading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(44, 24, 16, 0.9)',
            zIndex: 40,
            color: 'white',
            textAlign: 'center',
            fontFamily: 'monospace'
          }}>
            <h1 style={{ 
              fontSize: '3rem', 
              marginBottom: '1rem', 
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              color: '#ffff00'
            }}>
              ⛏️ MINECRAFT PORTFOLIO
            </h1>
            <div style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '600px', lineHeight: '1.6' }}>
              <p>🏗️ Welcome to my blocky world of skills and projects!</p>
              <p>Explore skill towers, discover project portals, and see what I've built!</p>
            </div>
            <div style={{ 
              fontSize: '1rem', 
              marginBottom: '2rem', 
              opacity: 0.9,
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: '1rem',
              borderRadius: '8px',
              border: '2px solid #666'
            }}>
              <p><strong>🎮 CONTROLS:</strong></p>
              <p>⌨️ <strong>WASD</strong> - Move around</p>
              <p>🖱️ <strong>MOUSE</strong> - Look around</p>
              <p>⌨️ <strong>SPACE</strong> - Jump</p>
              <p>⌨️ <strong>CTRL</strong> - Sprint</p>
              <p>🖱️ <strong>LEFT CLICK</strong> - Interact with blocks</p>
            </div>
            <div style={{ 
              fontSize: '1.5rem', 
              animation: 'pulse 2s infinite',
              backgroundColor: '#4CAF50',
              padding: '1rem 2rem',
              borderRadius: '8px',
              border: '3px solid #2E7D32',
              cursor: 'pointer'
            }}>
              🎯 LOADING WORLD...
            </div>
          </div>
        )}

        {/* Three.js mount point */}
        <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

        {/* Minecraft-style UI */}
        {gameStarted && (
          <>
            {/* Crosshair */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '20px',
              height: '20px',
              pointerEvents: 'none',
              zIndex: 10
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '45%',
                width: '10px',
                height: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                transform: 'translateY(-50%)'
              }} />
              <div style={{
                position: 'absolute',
                top: '45%',
                left: '50%',
                width: '2px',
                height: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                transform: 'translateX(-50%)'
              }} />
            </div>

            {/* Interaction text (Minecraft style) */}
            {interactionText && (
              <div style={{
                position: 'absolute',
                bottom: '25%',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '0.8rem 1.5rem',
                borderRadius: '4px',
                fontSize: '1.1rem',
                textAlign: 'center',
                zIndex: 20,
                fontFamily: 'monospace',
                border: '2px solid #666'
              }}>
                {interactionText}
              </div>
            )}

            {/* Minecraft-style HUD */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '1rem',
              borderRadius: '4px',
              fontSize: '0.9rem',
              zIndex: 20,
              fontFamily: 'monospace',
              border: '2px solid #666'
            }}>
              <div><strong>🎮 MINECRAFT CONTROLS:</strong></div>
              <div>WASD - Move</div>
              <div>SPACE - Jump</div>
              <div>CTRL - Sprint</div>
              <div>MOUSE - Look around</div>
              <div>CLICK - Interact</div>
            </div>

            {/* Back button (Minecraft style) */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 20
            }}>
              <a
                href="/"
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(76, 175, 80, 0.9)',
                  color: 'white',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  border: '3px solid #2E7D32',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(56, 142, 60, 0.9)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(76, 175, 80, 0.9)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                🏠 EXIT WORLD
              </a>
            </div>

            {/* Minecraft-style coordinate display */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: '#00ff00',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              fontSize: '0.8rem',
              zIndex: 20,
              fontFamily: 'monospace',
              border: '1px solid #333'
            }}>
              <div>X: {Math.round(cameraRef.current?.position.x || 0)}</div>
              <div>Y: {Math.round(cameraRef.current?.position.y || 0)}</div>
              <div>Z: {Math.round(cameraRef.current?.position.z || 0)}</div>
            </div>

            {/* Minecraft-style inventory bar (decorative) */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '2px',
              zIndex: 20
            }}>
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: i === 0 ? '2px solid white' : '2px solid #666',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}
                >
                  {i === 0 ? '⛏️' : ''}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modal (Minecraft book style) */}
        {showModal && modalContent && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
          }}>
            <div style={{
              backgroundColor: '#8B4513',
              padding: '2rem',
              borderRadius: '8px',
              maxWidth: '500px',
              width: '90%',
              textAlign: 'center',
              border: '4px solid #654321',
              fontFamily: 'serif',
              color: '#2F1B14',
              backgroundImage: 'linear-gradient(45deg, #8B4513 25%, #A0522D 25%, #A0522D 50%, #8B4513 50%, #8B4513 75%, #A0522D 75%, #A0522D 100%)',
              backgroundSize: '20px 20px'
            }}>
              <div style={{
                backgroundColor: '#F5E6D3',
                padding: '2rem',
                borderRadius: '4px',
                border: '2px solid #8B4513'
              }}>
                <h2 style={{ 
                  marginBottom: '1rem', 
                  color: '#2F1B14',
                  fontSize: '1.8rem',
                  fontFamily: 'serif',
                  textDecoration: 'underline'
                }}>
                  📖 {modalContent.title}
                </h2>
                <p style={{ 
                  color: '#2F1B14', 
                  lineHeight: '1.6', 
                  marginBottom: '1.5rem',
                  fontSize: '1.1rem',
                  fontFamily: 'serif'
                }}>
                  {modalContent.description}
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: '3px solid #2E7D32',
                    padding: '0.8rem 2rem',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    fontFamily: 'monospace',
                    fontWeight: 'bold'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
                >
                  📚 CLOSE BOOK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          font-family: monospace;
        }
        
        canvas {
          display: block;
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }
      `}</style>
    </>
  );
}
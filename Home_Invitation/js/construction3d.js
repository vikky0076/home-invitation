/**
 * 3D CINEMATIC CONSTRUCTION SEQUENCE ENGINE
 * Powered by Three.js & WebGL
 * 
 * Accurately models Scene A through Scene E:
 * - Scene A: Empty plot, natural soil, atmospheric lighting, blueprint overlay
 * - Scene B: Ground excavation, dust clouds, concrete foundation footings
 * - Scene C: Sequential staggered brick-by-brick wall assembly with mortar & rising RCC pillars
 * - Scene D: Roof slab, exterior luxury finishes, glass windows, balcony & landscaping
 * - Scene E: Golden-hour lighting reveal, interior warm glow, front door opening & transition
 */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { soundEngine } from './soundEngine.js';

export class Construction3D {
  constructor(canvasContainer, onSceneChange, onComplete) {
    this.container = canvasContainer;
    this.onSceneChange = onSceneChange;
    this.onComplete = onComplete;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clock = new THREE.Clock();

    // Scene groups
    this.groundGroup = new THREE.Group();
    this.blueprintGroup = new THREE.Group();
    this.foundationGroup = new THREE.Group();
    this.pillarGroup = new THREE.Group();
    this.brickGroup = new THREE.Group();
    this.roofGroup = new THREE.Group();
    this.finishedHouseGroup = new THREE.Group();
    this.landscapingGroup = new THREE.Group();
    this.particleGroup = new THREE.Group();

    // Lighting
    this.sunLight = null;
    this.hemiLight = null;
    this.interiorLights = [];

    // Bricks data
    this.brickMeshes = [];
    this.doorMeshLeft = null;
    this.doorMeshRight = null;

    // Timeline state
    this.currentScene = 'A';
    this.progress = 0; // 0 to 1
    this.duration = 24; // 24 seconds cinematic sequence
    this.isPlaying = false;
    this.isCompleted = false;

    // Dust particles
    this.dustParticles = null;
    this.dustCount = 300;

    this.init();
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // Scene setup with atmospheric fog
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xa8c0d8);
    this.scene.fog = new THREE.FogExp2(0xa8c0d8, 0.012);

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(0, 18, 36);
    this.camera.lookAt(0, 2, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.container.appendChild(this.renderer.domElement);

    // Add groups
    this.scene.add(this.groundGroup);
    this.scene.add(this.blueprintGroup);
    this.scene.add(this.foundationGroup);
    this.scene.add(this.pillarGroup);
    this.scene.add(this.brickGroup);
    this.scene.add(this.roofGroup);
    this.scene.add(this.finishedHouseGroup);
    this.scene.add(this.landscapingGroup);
    this.scene.add(this.particleGroup);

    this.setupLighting();
    this.buildTerrainAndPlot();
    this.buildBlueprintGrid();
    this.buildFoundation();
    this.buildPillarsAndStructure();
    this.buildBrickWalls();
    this.buildRoofAndFinishes();
    this.buildEntranceAndLandscaping();
    this.setupDustParticles();

    // Event listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  setupLighting() {
    // Soft skylight
    this.hemiLight = new THREE.HemisphereLight(0xddeeff, 0x554433, 0.6);
    this.scene.add(this.hemiLight);

    // Sunlight
    this.sunLight = new THREE.DirectionalLight(0xfff3e0, 1.2);
    this.sunLight.position.set(25, 35, 20);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 100;
    const d = 22;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;
    this.sunLight.shadow.bias = -0.0005;
    this.scene.add(this.sunLight);

    // Warm interior lights (activated in Scene E)
    const interiorPositions = [
      [-3, 2.5, 0],
      [3, 2.5, 0],
      [0, 6.5, 0],
      [0, 2.8, 5.2] // Entrance porch lantern
    ];

    interiorPositions.forEach(([x, y, z]) => {
      const pLight = new THREE.PointLight(0xffaa44, 0, 12, 1.8);
      pLight.position.set(x, y, z);
      this.scene.add(pLight);
      this.interiorLights.push(pLight);
    });
  }

  // Scene A: Realistic soil ground and empty plot
  buildTerrainAndPlot() {
    // Soil terrain
    const groundGeo = new THREE.PlaneGeometry(120, 120, 64, 64);
    // Add procedural vertex displacement for natural earth mound
    const pos = groundGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const dist = Math.sqrt(vx * vx + vy * vy);
      const elevation = (Math.sin(vx * 0.15) * Math.cos(vy * 0.15) * 0.3) +
                        (Math.sin(vx * 0.4) * 0.1);
      pos.setZ(i, elevation);
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x6e5238, // Rich earthen soil
      roughness: 0.95,
      metalness: 0.05
    });

    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.groundGroup.add(ground);

    // Grassy boundary perimeter
    const plotBoundaryGeo = new THREE.RingGeometry(11, 58, 32);
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x475f28, // Natural meadow grass
      roughness: 0.85,
      metalness: 0.02
    });
    const grass = new THREE.Mesh(plotBoundaryGeo, grassMat);
    grass.rotation.x = -Math.PI / 2;
    grass.position.y = 0.08;
    grass.receiveShadow = true;
    this.groundGroup.add(grass);
  }

  // Scene A: Construction Blueprint grid
  buildBlueprintGrid() {
    const gridHelper = new THREE.GridHelper(16, 16, 0x00d4ff, 0x0088cc);
    gridHelper.position.y = 0.15;
    this.blueprintGroup.add(gridHelper);

    // Glowing blueprint perimeter lines
    const blueprintMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 });
    const points = [
      new THREE.Vector3(-6, 0.18, -5),
      new THREE.Vector3(6, 0.18, -5),
      new THREE.Vector3(6, 0.18, 5),
      new THREE.Vector3(-6, 0.18, 5),
      new THREE.Vector3(-6, 0.18, -5)
    ];
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeo, blueprintMat);
    this.blueprintGroup.add(line);

    // Initial opacity 0
    this.blueprintGroup.traverse(child => {
      if (child.material) {
        child.material.transparent = true;
        child.material.opacity = 0;
      }
    });
  }

  // Scene B: Foundation trench & reinforced concrete footings
  buildFoundation() {
    const footingMat = new THREE.MeshStandardMaterial({
      color: 0x8a8e8f, // Concrete aggregate
      roughness: 0.9,
      metalness: 0.1
    });

    // Outer plinth beam foundation
    const foundationGeo = new THREE.BoxGeometry(12.4, 0.8, 10.4);
    const plinth = new THREE.Mesh(foundationGeo, footingMat);
    plinth.position.y = -0.4;
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    this.foundationGroup.add(plinth);

    // Individual column footing pads (6 footings)
    const padGeo = new THREE.BoxGeometry(1.6, 0.6, 1.6);
    const padPositions = [
      [-5.5, -0.6, -4.5], [0, -0.6, -4.5], [5.5, -0.6, -4.5],
      [-5.5, -0.6, 4.5],  [0, -0.6, 4.5],  [5.5, -0.6, 4.5]
    ];
    padPositions.forEach(([x, y, z]) => {
      const pad = new THREE.Mesh(padGeo, footingMat);
      pad.position.set(x, y, z);
      pad.castShadow = true;
      pad.receiveShadow = true;
      this.foundationGroup.add(pad);
    });

    this.foundationGroup.position.y = -2; // Start underground
  }

  // Scene C: RCC Pillars and Structural Beams
  buildPillarsAndStructure() {
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x9fa4a6,
      roughness: 0.85
    });

    // 6 Main pillars
    const pillarGeo = new THREE.BoxGeometry(0.7, 4.5, 0.7);
    const pillarCoords = [
      [-5.5, -4.5], [0, -4.5], [5.5, -4.5],
      [-5.5, 4.5],  [0, 4.5],  [5.5, 4.5]
    ];

    pillarCoords.forEach(([x, z]) => {
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(x, 2.25, z);
      pillar.castShadow = true;
      pillar.scale.y = 0.001; // Animated up in Scene C
      this.pillarGroup.add(pillar);
    });

    // Lintel tie beams across top
    const beamMat = new THREE.MeshStandardMaterial({ color: 0x909597, roughness: 0.85 });
    const beamGeoX = new THREE.BoxGeometry(12, 0.5, 0.6);
    const beamFront = new THREE.Mesh(beamGeoX, beamMat);
    beamFront.position.set(0, 4.5, 4.5);
    beamFront.castShadow = true;
    beamFront.scale.x = 0.001;
    this.pillarGroup.add(beamFront);

    const beamBack = new THREE.Mesh(beamGeoX, beamMat);
    beamBack.position.set(0, 4.5, -4.5);
    beamBack.castShadow = true;
    beamBack.scale.x = 0.001;
    this.pillarGroup.add(beamBack);
  }

  // Scene C: Progressive Brick-by-Brick wall assembly with mortar
  buildBrickWalls() {
    const brickGeo = new THREE.BoxGeometry(0.68, 0.28, 0.35);
    const brickMat = new THREE.MeshStandardMaterial({
      color: 0xa8482a, // Terracotta burnt red clay brick
      roughness: 0.92,
      metalness: 0.05
    });

    const mortarMat = new THREE.MeshStandardMaterial({
      color: 0xc8c3ba, // Grey cement mortar joint
      roughness: 0.95
    });

    // Lay staggered rows of bricks for Left, Right, Back and Front walls (leaving door & window gaps)
    const addBrickRow = (startX, endX, z, y, isZAxis = false) => {
      const length = Math.abs(endX - startX);
      const count = Math.floor(length / 0.72);
      for (let i = 0; i < count; i++) {
        const brick = new THREE.Mesh(brickGeo, brickMat);
        const mortar = new THREE.Mesh(
          new THREE.BoxGeometry(0.72, 0.06, 0.36),
          mortarMat
        );

        if (!isZAxis) {
          const x = startX + (i * 0.72) + 0.36;
          brick.position.set(x, y, z);
          mortar.position.set(x, y - 0.16, z);
        } else {
          const curZ = startX + (i * 0.72) + 0.36;
          brick.rotation.y = Math.PI / 2;
          mortar.rotation.y = Math.PI / 2;
          brick.position.set(z, y, curZ);
          mortar.position.set(z, y - 0.16, curZ);
        }

        brick.castShadow = true;
        brick.receiveShadow = true;
        brick.visible = false;
        brick.userData = { targetY: y, initialDropY: y + 2.5 + Math.random() * 2 };

        mortar.visible = false;
        this.brickGroup.add(mortar);
        this.brickGroup.add(brick);
        this.brickMeshes.push({ brick, mortar, layer: Math.floor(y / 0.32) });
      }
    };

    // 12 Rows of bricks vertically
    for (let row = 0; row < 12; row++) {
      const y = 0.3 + (row * 0.32);
      // Back wall (continuous)
      addBrickRow(-5.4, 5.4, -4.5, y, false);
      // Left wall (with window gap between rows 4 and 9)
      if (row < 4 || row > 9) {
        addBrickRow(-4.2, 4.2, -5.5, y, true);
      } else {
        addBrickRow(-4.2, -1.5, -5.5, y, true);
        addBrickRow(1.5, 4.2, -5.5, y, true);
      }
      // Right wall
      if (row < 4 || row > 9) {
        addBrickRow(-4.2, 4.2, 5.5, y, true);
      } else {
        addBrickRow(-4.2, -1.5, 5.5, y, true);
        addBrickRow(1.5, 4.2, 5.5, y, true);
      }
      // Front wall (with grand entrance doorway in center: -1.6 to 1.6)
      addBrickRow(-5.4, -1.6, 4.5, y, false);
      addBrickRow(1.6, 5.4, 4.5, y, false);
      // Lintel over entrance door (rows 9+)
      if (row >= 8) {
        addBrickRow(-1.6, 1.6, 4.5, y, false);
      }
    }

    // Sort brickMeshes by layer for realistic upward construction
    this.brickMeshes.sort((a, b) => a.layer - b.layer || Math.random() - 0.5);
  }

  // Scene D: Roof Slab, Balcony, Luxury Exterior Finishes & Glass
  buildRoofAndFinishes() {
    // Ground floor ceiling / First floor slab
    const slabGeo = new THREE.BoxGeometry(13.2, 0.45, 11.2);
    const slabMat = new THREE.MeshStandardMaterial({ color: 0xdedede, roughness: 0.6 });
    const roofSlab = new THREE.Mesh(slabGeo, slabMat);
    roofSlab.position.set(0, 4.8, 0);
    roofSlab.castShadow = true;
    roofSlab.receiveShadow = true;
    this.roofGroup.add(roofSlab);

    // Modern First Floor / Terrace Structure
    const upperWallGeo = new THREE.BoxGeometry(9.6, 3.4, 7.8);
    const upperWallMat = new THREE.MeshStandardMaterial({
      color: 0xf5f3ee, // Luxury warm ivory exterior paint
      roughness: 0.45
    });
    const upperFloor = new THREE.Mesh(upperWallGeo, upperWallMat);
    upperFloor.position.set(-1.0, 6.7, -0.6);
    upperFloor.castShadow = true;
    upperFloor.receiveShadow = true;
    this.roofGroup.add(upperFloor);

    // Terrace Canopy Roof
    const topRoofGeo = new THREE.BoxGeometry(10.6, 0.35, 8.8);
    const topRoof = new THREE.Mesh(topRoofGeo, slabMat);
    topRoof.position.set(-1.0, 8.5, -0.6);
    topRoof.castShadow = true;
    this.roofGroup.add(topRoof);

    // Architectural Wood Louvers / Pergola Accent
    const pergolaMat = new THREE.MeshStandardMaterial({ color: 0x5a3418, roughness: 0.4 });
    for (let p = 0; p < 7; p++) {
      const battenGeo = new THREE.BoxGeometry(0.12, 0.25, 4.2);
      const batten = new THREE.Mesh(battenGeo, pergolaMat);
      batten.position.set(2.2 + (p * 0.45), 7.2, 2.2);
      batten.castShadow = true;
      this.roofGroup.add(batten);
    }

    // Balcony Glass Railing
    const glassGeo = new THREE.BoxGeometry(4.8, 1.1, 0.08);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4ecff,
      transmission: 0.85,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.5,
      reflectivity: 0.9
    });
    const glassRailing = new THREE.Mesh(glassGeo, glassMat);
    glassRailing.position.set(2.2, 5.5, 4.8);
    this.roofGroup.add(glassRailing);

    // Finished exterior plaster coat (covers raw brick in Scene D)
    const smoothWallMat = new THREE.MeshStandardMaterial({
      color: 0xfbf8f2, // Premium warm ivory plaster
      roughness: 0.5
    });
    const leftFinishedWall = new THREE.Mesh(new THREE.BoxGeometry(0.38, 4.2, 9.4), smoothWallMat);
    leftFinishedWall.position.set(-5.5, 2.4, 0);
    const rightFinishedWall = new THREE.Mesh(new THREE.BoxGeometry(0.38, 4.2, 9.4), smoothWallMat);
    rightFinishedWall.position.set(5.5, 2.4, 0);
    const frontFinishedLeft = new THREE.Mesh(new THREE.BoxGeometry(3.6, 4.2, 0.38), smoothWallMat);
    frontFinishedLeft.position.set(-3.5, 2.4, 4.5);
    const frontFinishedRight = new THREE.Mesh(new THREE.BoxGeometry(3.6, 4.2, 0.38), smoothWallMat);
    frontFinishedRight.position.set(3.5, 2.4, 4.5);

    this.finishedHouseGroup.add(leftFinishedWall, rightFinishedWall, frontFinishedLeft, frontFinishedRight);

    // Architectural Windows with reflective glass
    const winGeo = new THREE.BoxGeometry(2.4, 1.8, 0.1);
    const winLeft = new THREE.Mesh(winGeo, glassMat);
    winLeft.rotation.y = Math.PI / 2;
    winLeft.position.set(-5.52, 2.6, 0);

    const winUpper = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.6, 0.1), glassMat);
    winUpper.position.set(-1.0, 7.0, 3.32);
    this.finishedHouseGroup.add(winLeft, winUpper);

    // Initially hide finished elements
    this.roofGroup.position.y = 8;
    this.roofGroup.visible = false;
    this.finishedHouseGroup.visible = false;
  }

  // Scene D & E: Teak Entrance Doors, Porch & Landscaping
  buildEntranceAndLandscaping() {
    // Grand Teak Wood Double Doors
    const doorGeo = new THREE.BoxGeometry(1.3, 3.2, 0.12);
    const teakMat = new THREE.MeshStandardMaterial({
      color: 0x4a2511, // Rich aged teak wood
      roughness: 0.35,
      metalness: 0.1
    });

    // Brass handles
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0xe5b842, // Polished brass
      roughness: 0.2,
      metalness: 0.85
    });

    // Left door pivot
    const leftPivot = new THREE.Group();
    leftPivot.position.set(-1.4, 1.9, 4.5);
    const leftDoor = new THREE.Mesh(doorGeo, teakMat);
    leftDoor.position.set(0.65, 0, 0);
    leftDoor.castShadow = true;
    const leftHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5), handleMat);
    leftHandle.position.set(1.15, 0, 0.1);
    leftPivot.add(leftDoor, leftHandle);
    this.doorMeshLeft = leftPivot;

    // Right door pivot
    const rightPivot = new THREE.Group();
    rightPivot.position.set(1.4, 1.9, 4.5);
    const rightDoor = new THREE.Mesh(doorGeo, teakMat);
    rightDoor.position.set(-0.65, 0, 0);
    rightDoor.castShadow = true;
    const rightHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5), handleMat);
    rightHandle.position.set(-1.15, 0, 0.1);
    rightPivot.add(rightDoor, rightHandle);
    this.doorMeshRight = rightPivot;

    this.finishedHouseGroup.add(leftPivot, rightPivot);

    // Entrance Steps
    const stepMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.8 }); // Black granite steps
    for (let s = 0; s < 3; s++) {
      const step = new THREE.Mesh(
        new THREE.BoxGeometry(4.2 - (s * 0.4), 0.18, 1.2 + (s * 0.3)),
        stepMat
      );
      step.position.set(0, 0.09 + (s * 0.18), 5.2 + (s * 0.3));
      step.receiveShadow = true;
      this.finishedHouseGroup.add(step);
    }

    // Landscaping: Paved walkway
    const paverMat = new THREE.MeshStandardMaterial({ color: 0xb5afa6, roughness: 0.85 });
    for (let p = 0; p < 8; p++) {
      const paver = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.05, 1.2), paverMat);
      paver.position.set(0, 0.04, 6.8 + (p * 1.4));
      paver.receiveShadow = true;
      this.landscapingGroup.add(paver);
    }

    // Lush ornamental planters & tropical palms near entrance
    const potGeo = new THREE.CylinderGeometry(0.4, 0.3, 0.8, 16);
    const potMat = new THREE.MeshStandardMaterial({ color: 0x9e5238, roughness: 0.7 });
    [-2.6, 2.6].forEach(x => {
      const pot = new THREE.Mesh(potGeo, potMat);
      pot.position.set(x, 0.4, 5.2);
      pot.castShadow = true;

      // Foliage sphere
      const bushGeo = new THREE.DodecahedronGeometry(0.65, 1);
      const bushMat = new THREE.MeshStandardMaterial({ color: 0x2e6930, roughness: 0.6 });
      const bush = new THREE.Mesh(bushGeo, bushMat);
      bush.position.set(x, 1.0, 5.2);
      bush.castShadow = true;

      this.landscapingGroup.add(pot, bush);
    });

    this.landscapingGroup.visible = false;
  }

  // Dust & Construction particle physics
  setupDustParticles() {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(this.dustCount * 3);
    const velocities = [];

    for (let i = 0; i < this.dustCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = Math.random() * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: Math.random() * 0.03 + 0.01,
        z: (Math.random() - 0.5) * 0.02
      });
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xd4b896,
      size: 0.22,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });

    this.dustParticles = new THREE.Points(geo, mat);
    this.dustParticles.userData = { velocities };
    this.particleGroup.add(this.dustParticles);
  }

  emitDustBurst(intensity = 0.6) {
    if (!this.dustParticles) return;
    this.dustParticles.material.opacity = intensity;
  }

  // Master timeline driver: maps normalized progress (0.0 to 1.0) to Scenes A -> E
  updateTimeline(p) {
    this.progress = Math.min(Math.max(p, 0), 1);

    // ==========================================
    // SCENE A: The Empty Plot (0.00 -> 0.18)
    // ==========================================
    if (this.progress < 0.18) {
      if (this.currentScene !== 'A') {
        this.currentScene = 'A';
        this.onSceneChange('A');
        soundEngine.startAmbientWind();
      }

      const sceneProg = this.progress / 0.18; // 0 to 1

      // Blueprint fade in
      this.blueprintGroup.traverse(child => {
        if (child.material) child.material.opacity = Math.min(sceneProg * 1.5, 0.85);
      });

      // Camera: High diagonal tilt down
      this.camera.position.x = Math.sin(sceneProg * 0.4) * 8;
      this.camera.position.y = THREE.MathUtils.lerp(22, 14, sceneProg);
      this.camera.position.z = THREE.MathUtils.lerp(38, 28, sceneProg);
      this.camera.lookAt(0, 1, 0);
    }

    // ==========================================
    // SCENE B: Foundation & Excavation (0.18 -> 0.38)
    // ==========================================
    else if (this.progress >= 0.18 && this.progress < 0.38) {
      if (this.currentScene !== 'B') {
        this.currentScene = 'B';
        this.onSceneChange('B');
        soundEngine.playDiggingSound();
        this.emitDustBurst(0.7);
      }

      const sceneProg = (this.progress - 0.18) / 0.20;

      // Excavation rumble sound trigger periodically
      if (Math.random() < 0.08) soundEngine.playDiggingSound();

      // Concrete plinth rising from earth
      this.foundationGroup.position.y = THREE.MathUtils.lerp(-2.0, 0, sceneProg);

      // Camera: Low-angle tracking shot
      this.camera.position.x = THREE.MathUtils.lerp(8, -12, sceneProg);
      this.camera.position.y = THREE.MathUtils.lerp(14, 5, sceneProg);
      this.camera.position.z = THREE.MathUtils.lerp(28, 22, sceneProg);
      this.camera.lookAt(0, 1.5, 0);

      // Dust physics
      this.dustParticles.material.opacity = Math.sin(sceneProg * Math.PI) * 0.7;
    }

    // ==========================================
    // SCENE C: Bricks & Pillars Assembly (0.38 -> 0.65)
    // ==========================================
    else if (this.progress >= 0.38 && this.progress < 0.65) {
      if (this.currentScene !== 'C') {
        this.currentScene = 'C';
        this.onSceneChange('C');
        soundEngine.playPillarImpact();
        soundEngine.startCelebrationMusic('build');
      }

      const sceneProg = (this.progress - 0.38) / 0.27;

      // Rising RCC Pillars (0 to 0.4 of Scene C)
      const pillarProg = Math.min(sceneProg / 0.4, 1.0);
      this.pillarGroup.children.forEach(child => {
        if (child.scale.y !== undefined) {
          child.scale.y = Math.max(pillarProg, 0.001);
        }
        if (child.scale.x !== undefined && pillarProg > 0.8) {
          child.scale.x = (pillarProg - 0.8) * 5;
        }
      });

      // Brick-by-brick wall laying (0.2 to 1.0 of Scene C)
      const brickProg = Math.max(0, (sceneProg - 0.2) / 0.8);
      const totalBricks = this.brickMeshes.length;
      const visibleCount = Math.floor(brickProg * totalBricks);

      for (let i = 0; i < totalBricks; i++) {
        const item = this.brickMeshes[i];
        if (i < visibleCount) {
          if (!item.brick.visible) {
            item.brick.visible = true;
            item.mortar.visible = true;
            // Play physical tap sound
            if (i % 6 === 0) {
              soundEngine.playBrickPlacement(480 + (item.layer * 22));
            }
          }
          item.brick.position.y = item.brick.userData.targetY;
        } else if (i === visibleCount) {
          // Current dropping brick
          item.brick.visible = true;
          const dropFrac = (brickProg * totalBricks) - i;
          item.brick.position.y = THREE.MathUtils.lerp(item.brick.userData.initialDropY, item.brick.userData.targetY, dropFrac);
        } else {
          item.brick.visible = false;
          item.mortar.visible = false;
        }
      }

      // Camera: Cinematic rising orbit
      const angle = 0.8 + (sceneProg * 1.2);
      const radius = 24;
      this.camera.position.x = Math.sin(angle) * radius;
      this.camera.position.z = Math.cos(angle) * radius;
      this.camera.position.y = THREE.MathUtils.lerp(6, 12, sceneProg);
      this.camera.lookAt(0, 3, 0);
    }

    // ==========================================
    // SCENE D: Architectural Form & Luxury Finishes (0.65 -> 0.84)
    // ==========================================
    else if (this.progress >= 0.65 && this.progress < 0.84) {
      if (this.currentScene !== 'D') {
        this.currentScene = 'D';
        this.onSceneChange('D');
        soundEngine.playWhoosh();
        soundEngine.playPillarImpact();
      }

      const sceneProg = (this.progress - 0.65) / 0.19;

      // Reveal roof structure lowering into place
      this.roofGroup.visible = true;
      this.roofGroup.position.y = THREE.MathUtils.lerp(8, 0, Math.min(sceneProg * 1.4, 1.0));

      // Reveal luxury smooth plaster finishes & glass
      if (sceneProg > 0.4) {
        this.finishedHouseGroup.visible = true;
        this.brickGroup.visible = false; // Encapsulated by finished plaster
        this.landscapingGroup.visible = true;
      }

      // Camera: Dramatic wide architectural hero track
      const angle = 2.0 - (sceneProg * 0.9);
      this.camera.position.x = Math.sin(angle) * 26;
      this.camera.position.z = Math.cos(angle) * 26;
      this.camera.position.y = THREE.MathUtils.lerp(12, 6, sceneProg);
      this.camera.lookAt(0, 3.5, 0);
    }

    // ==========================================
    // SCENE E: Golden Hour Reveal & Door Opening (0.84 -> 1.00)
    // ==========================================
    else if (this.progress >= 0.84) {
      if (this.currentScene !== 'E') {
        this.currentScene = 'E';
        this.onSceneChange('E');
        soundEngine.playGrandReveal();
      }

      const sceneProg = (this.progress - 0.84) / 0.16;

      // Golden hour sunset sky lighting
      const sunsetSky = new THREE.Color(0xf2a65a);
      const daySky = new THREE.Color(0xa8c0d8);
      this.scene.background.lerpColors(daySky, sunsetSky, sceneProg);
      this.scene.fog.color.lerpColors(daySky, sunsetSky, sceneProg);

      // Warm sun color shift
      this.sunLight.color.setHex(0xffaa44);
      this.sunLight.intensity = THREE.MathUtils.lerp(1.2, 1.8, sceneProg);
      this.sunLight.position.set(12, 14, 25);

      // Switch on warm interior & porch lights
      this.interiorLights.forEach(p => {
        p.intensity = THREE.MathUtils.lerp(0, 2.8, Math.min(sceneProg * 2, 1.0));
      });

      // Camera approaches the grand entrance doors
      // Moves straight down the entryway pathway
      this.camera.position.x = THREE.MathUtils.lerp(0, 0, sceneProg);
      this.camera.position.y = THREE.MathUtils.lerp(4.5, 2.2, sceneProg);
      this.camera.position.z = THREE.MathUtils.lerp(18, 5.8, sceneProg);
      this.camera.lookAt(0, 2.1, 4.2);

      // Teak Double Doors swing open smoothly near the end (0.7 -> 1.0 of Scene E)
      if (sceneProg > 0.6) {
        const doorOpenProg = (sceneProg - 0.6) / 0.4;
        if (this.doorMeshLeft && this.doorMeshRight) {
          if (doorOpenProg > 0.05 && !this.doorSoundPlayed) {
            soundEngine.playDoorOpen();
            this.doorSoundPlayed = true;
          }
          this.doorMeshLeft.rotation.y = -doorOpenProg * (Math.PI * 0.55);
          this.doorMeshRight.rotation.y = doorOpenProg * (Math.PI * 0.55);
        }
      }

      // Complete transition trigger
      if (this.progress >= 0.995 && !this.isCompleted) {
        this.isCompleted = true;
        soundEngine.playHarmonicChime(1046.50, 3.0, 0); // High celestial bell
        if (this.onComplete) this.onComplete();
      }
    }
  }

  // Animation loop
  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();

    if (this.isPlaying && !this.isCompleted) {
      const step = delta / this.duration;
      this.updateTimeline(this.progress + step);
    }

    // Update dust particle velocities
    if (this.dustParticles && this.dustParticles.material.opacity > 0.01) {
      const pos = this.dustParticles.geometry.attributes.position;
      const vels = this.dustParticles.userData.velocities;
      for (let i = 0; i < this.dustCount; i++) {
        let y = pos.getY(i) + vels[i].y;
        if (y > 6) y = 0.2;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }

  play() {
    this.isPlaying = true;
    this.animate();
  }

  pause() {
    this.isPlaying = false;
  }

  seek(progress) {
    this.updateTimeline(progress);
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  destroy() {
    this.pause();
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    if (this.renderer && this.renderer.domElement) {
      this.renderer.dispose();
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

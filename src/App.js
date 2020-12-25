import { useRef, useState } from "react";

import { Canvas, useFrame } from "react-three-fiber";

import { softShadows, OrbitControls } from "drei";

import "./App.scss";

import { useSpring, a } from "react-spring/three";

softShadows();

const Box = ({ position, sizes, color }) => {
  const mesh = useRef(null); // the reference for the mesh
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01)); // to rotate the shape defined in our mesh

  const [expand, setExpand] = useState(false);

  const props = useSpring({
    scale: expand ? [2, 2, 2] : [1, 1, 1], // change the scale dynamically
  });

  return (
    <a.mesh
      onClick={() => {
        setExpand(!expand); // to expand the box on click
      }}
      position={position}
      ref={mesh}
      castShadow
      {...props}
    >
      {/* position is an array in the x y z format  */}
      <boxBufferGeometry attach="geometry" args={sizes} />
      {/* since our shape is a box, the sizes is going to be an array like so : width, height, depth */}
      <meshStandardMaterial attach="material" color={color} />
    </a.mesh>
  );
};

function App() {
  return (
    <>
      <Canvas colorManagement shadowMap camera={{ fov: 100 }}>
        {/* Lightning, PS : FOV means Field Of View, its just how much zoomed in we are in the view */}

        <ambientLight intensity={0.3} />
        {/* Ambient light */}

        <directionalLight
          castShadow // this light cast a shadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {/* Main Source of Light */}

        <pointLight position={[-10, 0, -10]} intensity={0.5} />
        {/* left light */}

        <pointLight position={[0, -10, 0]} intensity={1.5} />
        {/* bottom light */}

        {/* Lightning */}

        {/* Plane */}
        <group>
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
            receiveShadow // this plane receives shadows
          >
            {/* The floor 'or' scene for the app */}
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
          {/* Plane */}

          {/* shapes */}
          <Box position={[0, 0, 1]} sizes={[1, 1, 1]} color="purple" />
          <Box position={[2, 0, -1]} color="pink" />
          <Box position={[-2, 0, -1]} color="pink" />
          {/*you have to extract the mesh component and its ref and frame in order for it to work */}
          {/* shapes */}
        </group>

        {/* Allows us to move the canvas around for different prespectives */}
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;

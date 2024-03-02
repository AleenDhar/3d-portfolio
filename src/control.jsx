import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointerLockControls, Box } from '@react-three/drei';

function FPVControls() {
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const controls = useRef();

  const handleMount = () => {
    if (!controlsEnabled) {
      controls.current.lock();
      setControlsEnabled(true);
    }
  };

  useFrame(({ movementX, movementY }) => {
    if (controlsEnabled && controls.current) {
      const sensitivity = 0.002;
      const deltaX = movementX * sensitivity;
      const deltaY = movementY * sensitivity;
      controls.current.getObject().rotation.x -= deltaY;
      controls.current.getObject().rotation.y -= deltaX;
      controls.current.getObject().rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, controls.current.getObject().rotation.x));
    }
  });

  return (
    <>
      <PointerLockControls ref={controls} />
      <Box position={[0, 0, 0]} />
      <Box position={[2, 2, 2]} />
      <mesh position={[0, 0, 0]}>
        <planeBufferGeometry args={[100, 100]} />
        <meshBasicMaterial color="gray" />
      </mesh>
      <button onClick={handleMount}>Click to enable FPV</button>
    </>
  );
}

function App() {
  return (
    <Canvas>
      <FPVControls />
    </Canvas>
  );
}

export default App;

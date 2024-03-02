import React,{ useEffect, useRef, useState } from 'react'
import './App.css'
import { Box,Environment, OrbitControls,Resize } from '@react-three/drei'
import { useFrame,Canvas,useThree  } from '@react-three/fiber'
import Laptop from './Laptop'
import FakeGlowMaterial from './FakeGlowMaterial'


function App() {
  // Return the view, these are regular Threejs elements expressed in JSX

  return (
  <Canvas>
    {/* <FakeGlowMaterial/> */}
    <Laptop />
    <OrbitControls 
        target={[0, 0, 0]}
        maxPolarAngle={1.45}
      />
      <spotLight
        color={[1, 0.25, 7]}
        intensity={105}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
        
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={200}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 1]}
        castShadow
        shadow-bias={-0.0001}
      />
  </Canvas>
    
  )
}

export default App


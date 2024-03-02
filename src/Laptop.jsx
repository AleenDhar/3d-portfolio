import { Html,Environment, PresentationControls, useGLTF,OrbitControls,useTexture,MeshPortalMaterial,RoundedBox, Text,
    useCursor,Resize} from "@react-three/drei";
import './App.css'
import React,{ useEffect, useRef, useState, } from 'react'
import { useFrame,Canvas,useThree , } from '@react-three/fiber'
import gsap from 'gsap';
import * as THREE  from 'three'
import { Vector3, } from 'three'


export default function Laptop(){
    const map=useTexture(
        "textures/download.jpg"
    )
    const map1=useTexture(
        "textures/Cyberpunk_equirectangular-jpg_city_view_319294498_10159865.jpg"
    )
    const map2=useTexture(
        "textures/background.jpg"
    )
    const laptop= useGLTF(
        "Room.glb"
    )
    const target = useRef();
    const { camera } = useThree();

    // Use useFrame to constantly update the lookAt position
    useFrame(() => {
      camera.lookAt(0,0 ,0);
    });

    // camera.position.set(0, 3.8, -1.3);
    camera.position.set(.5, .1, 4);
    camera.fov = 5
    camera.aspect = window.innerWidth / window.innerHeight;
    // camera.updateProjectionMatrix()
    // target.current.position.set(0, -4, 4)
    gsap.from(camera.position, {
        duration: 2, // Animation duration in seconds
        x: 10,       // Target x position
        y: 10,       // Target y position
        z: 20,      // Target z position
        delay:0,
        
      });

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        // renderer.setSize( window.innerWidth, window.innerHeight );
    }
    
    return(
        <>
        <ambientLight intensity={.5}/>
        <pointLight position={[0,5,5]} intensity={70} color={'#6495ED'}/>
        <pointLight position={[0,0,-.63]} intensity={40} color={'#B22222'}/>
        <Environment  map={map} preset="warehouse"/>
        <pointLight position={[0,10,3.7]} intensity={40} color={'#6495ED'}/>
    <group >
    <Text
        font="fonts/Caprasimo-Regular.ttf"
        fontSize={0.3}
        position-z={0.1}
        anchorY={"bottom"}
    >
        {""}
        <meshBasicMaterial color={'#FFFAF0'} toneMapped={false} />
    </Text>
        <RoundedBox args={[4.8,2.7,.1]} position={[0,-.1,0.01]}>
        <MeshPortalMaterial position={[0,0,3]}>
        <ambientLight intensity={10}/>
            <mesh>
            <sphereGeometry  args={[1,64,64]} />
            {/* <OrbitControls autoRotate={true}/> */}
            <meshStandardMaterial map={map}   side={THREE.BackSide}/>
            </mesh>
        </MeshPortalMaterial>
        </RoundedBox>
    </group>
    
        <primitive object={laptop.scene} ref={target} position={[0,-3.7,3.7]}/>
        </>
    )
}
const MonsterStage = ({
children,
texture,
name,
color,
active,
setActive,
hovered,
setHovered,
...props
}) => {
const map = useTexture(texture);
const portalMaterial = useRef();

useFrame((_state, delta) => {
    const worldOpen = active === name;
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta);
});

return (
    <group {...props}>
    <Text
        font="fonts/Caprasimo-Regular.ttf"
        fontSize={0.3}
        position={[0, -1.3, 0.051]}
        anchorY={"bottom"}
    >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
    </Text>
    <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
    >
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
        <ambientLight intensity={1} />
        <Environment preset="warehouse" />
        {children}
        <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
        </mesh>
        </MeshPortalMaterial>
    </RoundedBox>
    </group>
);
};
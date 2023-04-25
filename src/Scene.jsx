import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, Float, Text3D, Box, Text, Center } from "@react-three/drei";

import { useGLTF } from "@react-three/drei";

const Trees = ({ position = [0,0,0] }) => {
  const object = useGLTF("/trees/scene.gltf");

  return (
    <Suspense>
      <primitive object={object.scene} position={position} />
    </Suspense>
  )
}

const Title = ({ position = [0, 0, 0], rotation=[0, 0, 0] }) => {
  return (
    <Text3D 
      font='/fonts/Montserrat/Black/Montserrat Black_Regular.json'
      size={1.5}
      height={0.2}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.1}
      bevelSize={0.02}
      bevelOffset={ 0 }
      bevelSegments={ 5 }
      position={position}
      rotation={rotation}
    >
      O'FARRIL
      <meshBasicMaterial color="#f3f3f3" />
    </Text3D>
  )
}

const Button = ({ position = [0, 0, 0], rotation=[0, 0, 0] }) => {
  
  const handleClick = () => {
    window.open("https://ricardoofarrill.com/", "_blank");
  };

  return (
    <Box 
      position={position} 
      rotation={rotation} 
      args={[4.5, 1.4, 0.5]}
      onClick={handleClick}
    >
      <meshBasicMaterial color="#f3f3f3" />
      <Text
        color={'#EC2D2D'}
        fontSize={1}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign={'left'}
        font="/fonts/Montserrat/Black/Montserrat-Black.woff"
        anchorX="center"
        anchorY="middle"
        position-z={0.3}
      >
        Visitar
      </Text>
    </Box>
  )
}

const Scene = () => {
  return(
    <Canvas 
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 100,
        position: [0, 0, 15]
      }}
    >
      <color attach="background" args={["#f7a531"]} />

      <ambientLight intensity={ 0 } />
      <spotLight position={[5, 0, 10]} />

      <PresentationControls
          enabled={true} // the controls can be disabled by setting this to false
          global={true} // Spin globally or by dragging the model
          cursor={true} // Whether to toggle cursor style on drag
          snap={true} // Snap-back to center (can also be a spring config)
          speed={1} // Speed factor
          zoom={1} // Zoom factor when half the polar-max is reached
          rotation={[0, 0, 0]} // Default rotation
          polar={[0, Math.PI / 4]} // Vertical limits
          azimuth={[0, Math.PI / 3]} // Horizontal limits
          config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
      >
        <Trees position={[-5.5, -2, 0]}/>
        
        <Float rotationIntensity={0.2} floatIntensity={2} speed={4}>  
          <Center position={[4, 1, 2]} rotation={[0, -0.25, 0]}>
            <Title  />
            <Button position={[5, -1.5, 0]} />
          </Center>
        </Float>
      </PresentationControls>
    </Canvas>
  )
}

export default Scene;
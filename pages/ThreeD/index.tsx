import { useRef } from 'react';
import { Canvas, useFrame, MeshProps } from '@react-three/fiber';
const Box = () => {
  const ref = useRef<MeshProps>({});
  useFrame(state => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref}>
      <boxBufferGeometry />
      <meshBasicMaterial color="blue" />
    </mesh>
  );
};
export default function () {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        style={{ width: '100%', height: '100%', background: 'black' }}
        camera={{ position: [3, 3, 3] }}
      >
        {/* <Box /> */}
        <axesHelper args={[5]} />
      </Canvas>
    </div>
  );
}

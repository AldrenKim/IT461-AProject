import { Environment, OrbitControls, Stage, Torus } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import React, { Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

type Props = {
  obj?: Blob;
};

const materials = new THREE.MeshLambertMaterial();
materials.color.setColorName('green');

function ObjToPrimitive({ url }: { url: string }) {
  const obj = useLoader(OBJLoader, url);

  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = materials;
    }
  });

  return obj ? <primitive object={obj} /> : null;
}

export default function ThreeDViewer(props: Props) {
  const { obj } = props;
  const url = obj ? URL.createObjectURL(obj) : '';

  const display = useMemo(
    () =>
      obj ? (
        <Stage>
          <ObjToPrimitive url={url} />
        </Stage>
      ) : (
        <>
          <Torus>
            <meshBasicMaterial color="green" />
          </Torus>
        </>
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [obj],
  );

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Canvas>
        <Suspense fallback={null}>
          {display}
          <OrbitControls makeDefault />
          <Environment background preset="park" />
        </Suspense>
      </Canvas>
    </div>
  );
}

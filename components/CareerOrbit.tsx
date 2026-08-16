"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CareerOrbit() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8.7);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      host.dataset.webgl = "unavailable";
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.33, 2),
      new THREE.MeshBasicMaterial({ color: 0x3158e8, wireframe: true, transparent: true, opacity: 0.72 }),
    );
    group.add(core);
    const halo = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.75, 1),
      new THREE.MeshBasicMaterial({ color: 0xc9ff63, wireframe: true, transparent: true, opacity: 0.15 }),
    );
    group.add(halo);

    const count = window.innerWidth < 700 ? 46 : 82;
    const positions = new Float32Array(count * 3);
    const points: THREE.Vector3[] = [];
    for (let index = 0; index < count; index += 1) {
      const radius = 2.15 + Math.random() * 2.25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const point = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta) * 0.72,
        radius * Math.cos(phi) * 0.64,
      );
      point.toArray(positions, index * 3);
      points.push(point);
    }
    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    group.add(new THREE.Points(pointGeometry, new THREE.PointsMaterial({ color: 0xe8edff, size: 0.055, transparent: true, opacity: 0.75 })));

    const linePositions: number[] = [];
    points.forEach((point, index) => {
      const nearest = points
        .map((candidate, candidateIndex) => ({ candidate, candidateIndex, distance: point.distanceTo(candidate) }))
        .filter((item) => item.candidateIndex !== index)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 2);
      nearest.forEach(({ candidate, distance }) => {
        if (distance < 1.75) linePositions.push(point.x, point.y, point.z, candidate.x, candidate.y, candidate.z);
      });
    });
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    group.add(new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({ color: 0x6f8cff, transparent: true, opacity: 0.18 })));

    const rings = [2.5, 3.25, 4].map((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.007, 6, 150),
        new THREE.MeshBasicMaterial({ color: index === 1 ? 0xc9ff63 : 0x5878ef, transparent: true, opacity: index === 1 ? 0.24 : 0.18 }),
      );
      ring.rotation.set(Math.PI / (2.3 + index * 0.25), index * 0.34, index * 0.7);
      group.add(ring);
      return ring;
    });

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let visible = true;
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const pointer = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.28;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.2;
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.05 });
    observer.observe(host);
    const render = () => {
      if (visible) {
        if (!reduced) {
          group.rotation.y += 0.0017;
          group.rotation.x += 0.00045;
          group.rotation.y += (pointerX - group.rotation.y * 0.04) * 0.002;
          group.rotation.x += (-pointerY - group.rotation.x * 0.04) * 0.002;
          core.rotation.y -= 0.0026;
          halo.rotation.x += 0.0018;
          rings.forEach((ring, index) => { ring.rotation.z += 0.0007 * (index + 1); });
        }
        renderer.render(scene, camera);
      }
      frame = requestAnimationFrame(render);
    };
    resize();
    render();
    window.addEventListener("resize", resize);
    host.addEventListener("pointermove", pointer);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", pointer);
      pointGeometry.dispose();
      lineGeometry.dispose();
      core.geometry.dispose();
      halo.geometry.dispose();
      rings.forEach((ring) => ring.geometry.dispose());
      scene.traverse((object) => { if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.LineSegments) { const material = object.material; if (Array.isArray(material)) material.forEach((item) => item.dispose()); else material.dispose(); } });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="careerOrbit" aria-hidden="true" />;
}

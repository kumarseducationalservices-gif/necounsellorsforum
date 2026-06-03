'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return
    const W = el.clientWidth, H = el.clientHeight

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // Scene + camera
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
    camera.position.z = 80

    // ── Nodes ──────────────────────────────────────────────────────────────
    const NODE_COUNT = 80
    const positions: THREE.Vector3[] = []
    const velocities: THREE.Vector3[] = []
    const nodeGeo = new THREE.SphereGeometry(0.45, 8, 8)

    const nodeMats = [
      new THREE.MeshBasicMaterial({ color: 0x4F46E5, transparent: true, opacity: 0.9 }),
      new THREE.MeshBasicMaterial({ color: 0x818CF8, transparent: true, opacity: 0.7 }),
      new THREE.MeshBasicMaterial({ color: 0x00875A, transparent: true, opacity: 0.8 }),
    ]

    for (let i = 0; i < NODE_COUNT; i++) {
      const mat = nodeMats[i % nodeMats.length]
      const mesh = new THREE.Mesh(nodeGeo, mat)
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 160,
        (Math.random() - 0.5) * 90,
        (Math.random() - 0.5) * 40
      )
      mesh.position.copy(pos)
      positions.push(pos)
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.04,
        0
      ))
      scene.add(mesh)
    }

    // ── Edge lines ─────────────────────────────────────────────────────────
    const MAX_DIST = 28
    const lineGeo  = new THREE.BufferGeometry()
    const MAX_LINES = NODE_COUNT * 4
    const linePosArr = new Float32Array(MAX_LINES * 6)
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePosArr, 3))
    const lineMat = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ color: 0x4F46E5, transparent: true, opacity: 0.18 })
    )
    scene.add(lineMat)

    // Mouse reactive
    const mouse = new THREE.Vector2(9999, 9999)
    const onMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouse.x =  ((e.clientX - rect.left) / W - 0.5) * 160
      mouse.y = -((e.clientY - rect.top)  / H - 0.5) * 90
    }
    el.addEventListener('mousemove', onMouse)

    // Resize
    const onResize = () => {
      const nW = el.clientWidth, nH = el.clientHeight
      camera.aspect = nW / nH
      camera.updateProjectionMatrix()
      renderer.setSize(nW, nH)
    }
    window.addEventListener('resize', onResize)

    // ── Animate ────────────────────────────────────────────────────────────
    let frameId: number
    const HALF_W = 80, HALF_H = 45

    const tick = () => {
      frameId = requestAnimationFrame(tick)

      // Move nodes + mouse repulsion
      for (let i = 0; i < NODE_COUNT; i++) {
        const p = positions[i], v = velocities[i]
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 400 && d2 > 0.01) {
          const force = 12 / d2
          v.x += dx * force; v.y += dy * force
        }
        v.multiplyScalar(0.97)
        p.add(v)
        if (p.x >  HALF_W) { p.x =  HALF_W; v.x *= -1 }
        if (p.x < -HALF_W) { p.x = -HALF_W; v.x *= -1 }
        if (p.y >  HALF_H) { p.y =  HALF_H; v.y *= -1 }
        if (p.y < -HALF_H) { p.y = -HALF_H; v.y *= -1 }
      }

      // Rebuild edges
      let lineIdx = 0
      for (let i = 0; i < NODE_COUNT && lineIdx < MAX_LINES; i++) {
        for (let j = i + 1; j < NODE_COUNT && lineIdx < MAX_LINES; j++) {
          if (positions[i].distanceTo(positions[j]) < MAX_DIST) {
            const base = lineIdx * 6
            linePosArr[base]   = positions[i].x; linePosArr[base+1] = positions[i].y; linePosArr[base+2] = positions[i].z
            linePosArr[base+3] = positions[j].x; linePosArr[base+4] = positions[j].y; linePosArr[base+5] = positions[j].z
            lineIdx++
          }
        }
      }
      // blank remaining
      for (let k = lineIdx; k < MAX_LINES; k++) {
        linePosArr[k * 6] = linePosArr[k * 6 + 1] = linePosArr[k * 6 + 2] =
        linePosArr[k * 6 + 3] = linePosArr[k * 6 + 4] = linePosArr[k * 6 + 5] = 0
      }
      lineGeo.attributes.position.needsUpdate = true

      // Gentle camera drift
      camera.position.x = Math.sin(Date.now() * 0.00015) * 3
      camera.position.y = Math.cos(Date.now() * 0.0001)  * 2
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(frameId)
      el.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none' }} />
}

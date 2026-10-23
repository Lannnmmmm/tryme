import { Component, useEffect, useRef, useState } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness, Code2, FlaskConical, Menu, X } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, OrbitControls, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

type Project = {
  number: string
  category: string
  title: string
  description: string
  status: string
  tags: string[]
  accent: string
}

const projects: Project[] = [
  {
    number: '01',
    category: 'OPERATIONAL IMPROVEMENT',
    title: 'Serial Number Validation',
    description: 'Inisiatif otomasi untuk membantu pemeriksaan ketidaksesuaian dan duplikasi serial number pada proses digitalisasi SPBU.',
    status: 'Completed · Detail menyusul',
    tags: ['SPBU', 'Validation', 'Improvement'],
    accent: 'gold',
  },
  {
    number: '02',
    category: 'INTERNAL AUTOMATION',
    title: 'SiteCare Bot',
    description: 'Proyek bot internal untuk mendukung alur kerja maintenance dan inventaris. Rincian fitur akan ditampilkan setelah diverifikasi.',
    status: 'Completed · Detail menyusul',
    tags: ['Telegram', 'Operations', 'Automation'],
    accent: 'blue',
  },
  {
    number: '03',
    category: 'PERSONAL FINANCE',
    title: 'Pockito',
    description: 'Eksperimen produk digital untuk pencatatan dan pengelolaan keuangan pribadi.',
    status: 'Published · Case study menyusul',
    tags: ['Digital Product', 'Finance'],
    accent: 'rose',
  },
  {
    number: '04',
    category: 'INTERACTIVE STORY',
    title: 'Titip Doa',
    description: 'Pengalaman mini-game berbasis browser dengan pixel art, perjalanan singkat, dan penutup emosional.',
    status: 'Published',
    tags: ['Pixel Art', 'Web Game', 'Story'],
    accent: 'violet',
  },
]

function Prism() {
  const group = useRef<THREE.Group>(null)
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.08
    }
  })
  return (
    <group ref={group} rotation={[0.12, 0.2, 0.1]}>
      <mesh>
        <icosahedronGeometry args={[1.35, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.35}
          roughness={0.12}
          transmission={0.96}
          ior={1.2}
          chromaticAberration={0.035}
          anisotropy={0.2}
          color="#d7c7a4"
          attenuationColor="#8a9bb8"
          attenuationDistance={2}
        />
      </mesh>
      <mesh scale={1.39}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#d5b16d" wireframe transparent opacity={0.72} />
      </mesh>
      <mesh rotation={[0.5, 0.1, 0.25]} scale={0.48}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#d5b16d" metalness={0.9} roughness={0.2} wireframe />
      </mesh>
    </group>
  )
}

function OrbitalScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6.8], fov: 38 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.2} />
      <pointLight position={[3, 3, 4]} intensity={30} color="#f5d9a0" />
      <pointLight position={[-4, -2, 1]} intensity={18} color="#6d8dc9" />
      <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.35}>
        <Prism />
      </Float>
      <mesh rotation={[Math.PI / 2.6, 0.2, -0.25]} position={[0, 0, -0.55]}>
        <torusGeometry args={[1.82, 0.006, 8, 180]} />
        <meshBasicMaterial color="#d5b16d" transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[0.7, -0.3, 0.45]} position={[0, 0, -0.7]}>
        <torusGeometry args={[2.08, 0.004, 8, 180]} />
        <meshBasicMaterial color="#8091b2" transparent opacity={0.5} />
      </mesh>
      <Sparkles count={50} scale={5.8} size={1.4} speed={0.18} color="#d5b16d" />
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.55} />
    </Canvas>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [introVisible, setIntroVisible] = useState(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [webglAvailable, setWebglAvailable] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 2600)
    try {
      const canvas = document.createElement('canvas')
      setWebglAvailable(Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))))
    } catch {
      setWebglAvailable(false)
    }
    return () => window.clearTimeout(timer)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {introVisible && (
        <div className="intro" aria-label="Portfolio introduction">
          <div className="intro-mark"><span /><span /><span /></div>
          <p>IDEAS INTO SYSTEMS</p>
          <strong>AAN MAULANA</strong>
        </div>
      )}
      <header className="site-header">
        <a className="wordmark" href="#home" onClick={closeMenu} aria-label="Aan Maulana home">
          <span className="wordmark-icon">A<span>.</span></span>
          <span>AAN MAULANA<small>RESEARCH · SYSTEMS · IMPROVEMENT</small></span>
        </a>
        <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Navigasi utama">
          <a href="#work" onClick={closeMenu}>Selected Work</a>
          <a href="#approach" onClick={closeMenu}>Approach</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a className="nav-contact" href="https://github.com/Lannnmmmm" target="_blank" rel="noreferrer" onClick={closeMenu}>GitHub <ArrowUpRight size={14} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-shell" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> PORTFOLIO / 2026</p>
            <h1>Turning complex<br />work into <em>clearer</em><br />systems.</h1>
            <p className="hero-description">Saya mengeksplorasi masalah operasional, merancang perbaikan proses, dan membangun eksperimen digital yang membuat pekerjaan lebih terstruktur.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Jelajahi karya <ArrowDown size={16} /></a>
              <a className="text-link" href="#about">Kenali saya <ArrowRight size={15} /></a>
            </div>
            <div className="hero-meta">
              <span><i>01</i> Operational research</span>
              <span><i>02</i> Digital automation</span>
              <span><i>03</i> Product experiments</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Geometric glass prism, interactive 3D illustration">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            {webglAvailable ? (
              <CanvasErrorBoundary fallback={<div className="prism-fallback" aria-hidden="true"><div /></div>}>
                <OrbitalScene />
              </CanvasErrorBoundary>
            ) : <div className="prism-fallback" aria-hidden="true"><div /></div>}
            <div className="art-label label-top"><span>FIG. 001</span> SYSTEMS IN MOTION</div>
            <div className="art-label label-bottom"><span>01 — 04</span> SELECTED EXPLORATIONS</div>
          </div>
          <div className="hero-bottomline"><span>INDEPENDENT THINKING / PRACTICAL EXECUTION</span><a href="#work">SCROLL TO EXPLORE ↓</a></div>
        </section>

        <section className="intro-strip">
          <p>THE WORK IS NEVER JUST THE OUTPUT.</p>
          <p>IT'S THE <span>THINKING</span> THAT MAKES IT USEFUL.</p>
        </section>

        <section className="work-section section-shell" id="work">
          <div className="section-heading">
            <div><p className="eyebrow">01 / SELECTED WORK</p><h2>Ideas, tested<br /><em>in the real world.</em></h2></div>
            <p className="section-aside">Pilihan proyek dari improvement operasional hingga eksperimen produk digital. Detail akan terus dilengkapi berdasarkan data dan bukti yang terverifikasi.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card project-${project.accent}`} key={project.number}>
                <div className="project-card-top"><span>{project.number} / {project.category}</span><span className="project-arrow"><ArrowUpRight size={17} /></span></div>
                <div className="project-graphic" aria-hidden="true">
                  {project.number === '01' && <div className="graphic-serial"><span>SN</span><i /><i /><i /><b>✓</b></div>}
                  {project.number === '02' && <div className="graphic-node"><span /><span /><span /><span /><i /></div>}
                  {project.number === '03' && <div className="graphic-pockito"><span>Rp</span><i>↗</i><b>•••</b></div>}
                  {project.number === '04' && <div className="graphic-pixel"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>}
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  <div className="project-status">{project.status}</div>
                </div>
              </article>
            ))}
          </div>
          <div className="work-note"><span className="note-mark">i</span><p>Beberapa proyek masih dalam tahap dokumentasi. Informasi yang belum terverifikasi tidak ditampilkan sebagai hasil atau klaim final.</p></div>
        </section>

        <section className="approach-section" id="approach">
          <div className="section-shell approach-inner">
            <div className="approach-heading"><p className="eyebrow">02 / HOW I THINK</p><h2>Structure gives<br />ideas <em>direction.</em></h2><p>Saya tertarik pada titik temu antara kebutuhan nyata, proses yang lebih baik, dan teknologi yang tepat guna.</p></div>
            <div className="approach-list">
              <div className="approach-item"><span>01</span><div><h3>Observe the system</h3><p>Memahami konteks, menemukan hambatan, dan membedakan gejala dari akar masalah.</p></div><BriefcaseBusiness /></div>
              <div className="approach-item"><span>02</span><div><h3>Design the improvement</h3><p>Menyusun alur kerja, aturan, dan pendekatan yang bisa dijalankan dalam kondisi nyata.</p></div><FlaskConical /></div>
              <div className="approach-item"><span>03</span><div><h3>Build, test, refine</h3><p>Mengubah gagasan menjadi alat atau eksperimen, lalu memperbaikinya berdasarkan pengujian.</p></div><Code2 /></div>
            </div>
          </div>
        </section>

        <section className="about-section section-shell" id="about">
          <div className="about-index"><p className="eyebrow">03 / ABOUT</p><div className="about-monogram">A<span>.</span>M</div></div>
          <div className="about-copy"><h2>Curious by nature.<br /><em>Practical by design.</em></h2><p className="about-lead">Aan Maulana adalah profesional di bidang manage service digitalisasi SPBU, dengan minat pada improvement operasional, otomasi, dan pengembangan solusi digital.</p><div className="about-facts"><div><span>FOCUS</span><p>Operations · Systems · Digital Products</p></div><div><span>EDUCATION</span><p>S1 Manajemen · STIE Mahardhika</p></div><div><span>BASED IN</span><p>Indonesia</p></div></div><a className="text-link" href="https://github.com/Lannnmmmm" target="_blank" rel="noreferrer">Lihat GitHub saya <ArrowUpRight size={15} /></a></div>
        </section>

        <section className="contact-section">
          <div className="section-shell contact-inner"><p className="eyebrow">OPEN TO IDEAS & COLLABORATION</p><h2>Good work starts<br />with <em>a better question.</em></h2><a className="button button-light" href="https://github.com/Lannnmmmm" target="_blank" rel="noreferrer">Connect on GitHub <ArrowUpRight size={16} /></a></div>
          <div className="contact-orbit" aria-hidden="true" />
        </section>
      </main>

      <footer className="site-footer"><a className="footer-mark" href="#home">A<span>.</span>M</a><p>Built with curiosity, refined with intention.</p><span>© 2026 AAN MAULANA</span></footer>
    </>
  )
}

type CanvasErrorBoundaryProps = { children: ReactNode; fallback: ReactNode }
type CanvasErrorBoundaryState = { failed: boolean }

class CanvasErrorBoundary extends Component<CanvasErrorBoundaryProps, CanvasErrorBoundaryState> {
  state: CanvasErrorBoundaryState = { failed: false }

  static getDerivedStateFromError(): CanvasErrorBoundaryState {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('3D canvas failed; using the visual fallback.', error, info)
  }

  render() {
    if (this.state.failed) return <>{this.props.fallback}</>
    return <div className="canvas-wrap">{this.props.children}</div>
  }
}

export default App
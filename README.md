# 🦷 BITDENT — Landing Page de Estética Dental Avanzada

Landing page moderna y de alto impacto visual para **BITDENT**, clínica dental de alta especialidad ubicada en Colombia, enfocada en tratamientos de **coronas de zirconia**. La página destaca los beneficios de comodidad, naturalidad y durabilidad para pacientes que buscan recuperar su sonrisa.

---

## ✨ Características Principales

- **Escenas 3D interactivas** con Three.js (nudo toroidal wireframe y efecto de niebla animada)
- **Animaciones avanzadas de scroll** con GSAP ScrollTrigger y parallax
- **Carrusel de testimonios** con antes/después de casos reales (6 casos)
- **Modal de video** con animación de expansión suave y video embebido
- **Diseño responsivo** mobile-first con Tailwind CSS
- **SEO optimizado** con Open Graph, Twitter Cards y Schema.org (Dentist)
- **Botón flotante de WhatsApp** para contacto directo
- **Barra de progreso de scroll** en tiempo real
- **Efecto glassmorphism** en la barra de navegación

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| **React** | 19.2.4 | Framework de UI |
| **TypeScript** | 5.9.3 | Tipado estático |
| **Vite** | 8.0.1 | Bundler y servidor de desarrollo |
| **Tailwind CSS** | 4.2.2 | Framework de estilos utilitario |
| **Three.js** | 0.183.2 | Renderizado de escenas 3D |
| **GSAP** | 3.14.2 | Animaciones y ScrollTrigger |
| **clsx** | 2.1.1 | Manejo de clases condicionales |
| **ESLint** | 9.39.4 | Linting y calidad de código |

---

## 📁 Arquitectura del Proyecto

```
src/
├── main.tsx                          # Punto de entrada
├── app/
│   ├── App.tsx                       # Componente raíz
│   └── styles/
│       └── global.css                # Estilos globales y tema personalizado
├── features/
│   └── landing/
│       ├── components/               # Componentes de la landing page
│       │   ├── LandingPage.tsx       # Contenedor principal y orquestador
│       │   ├── NavBar.tsx            # Navegación con efecto glassmorphic
│       │   ├── HeroSection.tsx       # Hero con escena 3D y modal de video
│       │   ├── BenefitsSection.tsx   # Tarjetas de beneficios del tratamiento
│       │   ├── FocusSection.tsx      # Perfil del paciente con escena de niebla
│       │   ├── TestimonialsSection.tsx # Carrusel de antes/después
│       │   ├── CtaSection.tsx        # Llamada a la acción
│       │   ├── FooterSection.tsx     # Pie de página con redes sociales
│       │   └── VideoModal.tsx        # Modal de reproducción de video
│       ├── hooks/                    # Hooks personalizados
│       │   ├── useAutoSlider.ts      # Control de carrusel automático
│       │   ├── useFogScene.ts        # Escena 3D de niebla animada
│       │   ├── useHeroKnotScene.ts   # Escena 3D del nudo toroidal
│       │   ├── useLandingAnimations.ts # Animaciones GSAP globales
│       │   └── useScrollProgress.ts  # Barra de progreso de scroll
│       ├── data/
│       │   └── content.ts            # Datos de contenido centralizados
│       └── types/
│           └── content.ts            # Interfaces y tipos TypeScript
├── shared/
│   └── ui/
│       ├── icons.tsx                 # Iconos SVG personalizados (11+)
│       ├── LuxuryButton.tsx          # Botón con variantes solid/outline
│       └── SectionHeading.tsx        # Encabezado reutilizable de secciones
└── assets/                           # Recursos estáticos
```

---

## 🧩 Componentes

| Componente | Descripción |
|---|---|
| **LandingPage** | Orquesta todos los componentes, barra de progreso y botón flotante de WhatsApp |
| **NavBar** | Navegación fija con logo, enlaces de scroll suave, CTA y efecto glassmorphic |
| **HeroSection** | Sección principal con escena 3D animada, imagen del doctor y modal de video |
| **BenefitsSection** | 3 tarjetas de beneficios: comodidad, naturalidad y durabilidad |
| **FocusSection** | Escena de niebla 3D con 4 preguntas frecuentes sobre el tratamiento |
| **TestimonialsSection** | Carrusel automático (6s) de antes/después con 6 casos reales |
| **CtaSection** | Sección de llamada a la acción para agendar cita |
| **FooterSection** | Logo, enlaces a redes sociales y disclaimer legal |
| **VideoModal** | Modal con animación de expansión y video Wistia embebido |

---

## 🪝 Custom Hooks

| Hook | Descripción |
|---|---|
| **useAutoSlider** | Controla carruseles con navegación automática cada 6s y métodos `next()`, `previous()`, `goTo()` |
| **useFogScene** | Renderiza mallas de niebla animadas con Three.js, sensible a visibilidad de página |
| **useHeroKnotScene** | Renderiza nudo toroidal wireframe rotativo, optimizado con IntersectionObserver |
| **useLandingAnimations** | Registra ScrollTrigger de GSAP, anima elementos con reveal y parallax |
| **useScrollProgress** | Calcula porcentaje de scroll y actualiza barra de progreso en tiempo real |

---

## 🎨 Sistema de Diseño

### Paleta de Colores

| Color | Código | Uso |
|---|---|---|
| Midnight | `#1a1f2c` / `#0d1117` | Fondos oscuros principales |
| Verde | `#74c69d` → `#1b4332` | Acento verde clínico (4 tonos) |
| Pearl | `#fcfbf9` | Blanco cálido para textos |
| Stone | `#d6d3d1` → `#78716c` | Gris neutro para subtextos |

### Tipografías

| Fuente | Uso |
|---|---|
| **Playfair Display** | Títulos elegantes (serif) |
| **Montserrat** | Encabezados y badges (display) |
| **Open Sans** | Texto de cuerpo (body) |

### Efectos Especiales

- **Glassmorphism:** blur 24px + saturate 150%
- **Text Gradient:** Degradado verde a 135°
- **Sombras:** elevated (30px) y subtle (10px)
- **Scrollbar personalizada**

---

## ⚡ Optimizaciones de Performance

- **Lazy loading** de imágenes en testimonios
- **IntersectionObserver** para evitar renderizado 3D innecesario fuera de vista
- **Disposición correcta** de recursos Three.js (geometrías, materiales, renderers)
- **Importación dinámica** de librerías pesadas (GSAP, Three.js)
- **Alias de importación** `@/` → `src/` para imports limpios

---

## 🚀 Instalación y Uso

### Requisitos Previos

- **Node.js** >= 18
- **npm** >= 9

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/CiaphasC/BITDENT.git

# Entrar al directorio
cd BITDENT

# Instalar dependencias
npm install
```

### Scripts Disponibles

```bash
# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

---

## 📋 Configuración

| Archivo | Propósito |
|---|---|
| `vite.config.ts` | Configuración de Vite con alias `@/` y plugin React |
| `tsconfig.json` | Configuración base de TypeScript |
| `tsconfig.app.json` | TypeScript para la app (ES2023, strict) |
| `tsconfig.node.json` | TypeScript para Node/Vite |
| `eslint.config.js` | ESLint + React Hooks + React Refresh |

---

## 📄 Licencia

Todos los derechos reservados © BITDENT


var translations = {
  en: {
    nav: {
      skills:     'Skills',
      experience: 'Experience',
      projects:   'Projects',
      contact:    'Contact',
    },
    hero: {
      tag:  'Full Stack Developer · 5+ years',
      desc: 'Building high-performance web applications, real-time systems, and AI-powered tools. Deep experience in rendering pipelines, 3D visualization, and scalable architectures.',
      cta: { projects: 'View Projects', github: 'GitHub', linkedin: 'LinkedIn', resume: 'Resume' },
    },
    scroll: 'scroll',
    metrics: [
      { value: '+230%',      desc: 'Rendering\nspeed gain' },
      { value: 'WebGL',      desc: '3D visualization\n& real-time rendering' },
      { value: 'Docker/K8s', desc: 'Container\norchestration' },
      { value: '5+',         desc: 'Years of\nexperience' },
    ],
    sections: {
      skills:     'Technical Skills',
      experience: 'Experience',
      projects:   'Projects',
    },
    skills: {
      languages:  { title: 'Languages',            items: ['JavaScript / TypeScript', 'Node.js', 'PHP', 'Python', 'Ruby', 'C++ (native bindings)'] },
      frontend:   { title: 'Frontend & Rendering',  items: ['React · Vue · Angular', 'WebGL · Three.js', 'Fabric.js · Canvas API', 'React Native', 'Tailwind CSS'] },
      backend:    { title: 'Backend & Real-time',   items: ['REST APIs', 'WebSockets', 'MySQL · PostgreSQL', 'MongoDB', 'Laravel'] },
      ai:         { title: 'AI & Integrations',     items: ['OpenAI · Gemini', 'LLM orchestration', 'Image generation pipelines', 'Photoshop UXP plugins', 'AI-native dev workflows'] },
      infra:      { title: 'Infrastructure',        items: ['AWS · GCP · DigitalOcean', 'Docker · Kubernetes', 'CI/CD pipelines', 'Git · Scrum'] },
      background: { title: 'Background',            items: ['Telecom Engineering', 'Rendering & performance', '3D transformations', 'Scalable architecture'] },
    },
    experience: [
      {
        role: 'Full Stack Developer', company: 'Freepik Company', date: 'May 2022 — Present',
        items: [
          'Built a web mockup editor from scratch with TypeScript & Vue — full front-end and back-end ownership with MySQL storage',
          'Implemented WebGL and C++ native bindings for layer composition, achieving <span class="num">+230% rendering speed</span> and <span class="num">−130% processing time</span>',
          'Led an AI-powered Photoshop plugin (NodeJS, WebSockets, React/UXP, GCP) — cut response times by <span class="num">20%</span>',
          'Built an AI Design Assistant using LLMs (OpenAI, Gemini) for end-to-end text & image generation',
          'Developed an AI mockup generator integrating depth mapping, Fabric.js real-time editing, and WebSocket-coordinated AI — <span class="num">+20% image processing performance</span>',
          'Contributed to a node-based AI content generation platform supporting multi-model pipelines for image, video, audio, and text — users compose workflows visually through connected nodes with real-time processing and streaming output',
        ],
      },
      {
        role: 'Full Stack Developer', company: 'Avances Software', date: 'Feb 2022 — Apr 2022',
        items: [
          'Overhauled contract signing, payment, and medical scheduling flows — <span class="num">−50% transaction errors</span>, <span class="num">−40% memory usage</span>',
          'Built a real-time government billing system achieving <span class="num">99% accuracy</span> and <span class="num">−30% processing time</span>',
        ],
      },
      {
        role: 'Full Stack Developer', company: 'Alpes Solutions', date: 'Mar 2020 — Jan 2022',
        items: [
          'Automated <span class="num">20% of internal processes</span> and led a time-tracking application end-to-end',
          'Built event management modules with React Native & PostgreSQL — <span class="num">+25% operational efficiency</span>',
        ],
      },
    ],
    projects: [
      {
        title: '3D Product Catalog',
        desc:  'Interactive 3D viewer for product visualization — real-time rendering, model navigation, and configurable product exploration built on WebGL.',
        tags:  ['WebGL', 'Three.js', 'Real-time', '3D'],
        href:  'https://fibiaanm.github.io/3d-viewer/catalog',
        url:   'fibiaanm.github.io/3d-viewer/catalog',
        type:  'cube',
      },
      {
        title: 'Snake',
        desc:  'A classic Snake game rebuilt with modern web tech — game loop architecture, frame-rate control, and smooth canvas rendering demonstrating real-time state management.',
        tags:  ['Canvas', 'Game Loop', 'JavaScript', 'Animation'],
        href:  'https://fibiaanm.github.io/snake',
        url:   'fibiaanm.github.io/snake',
        type:  'snake',
      },
    ],
    contact: { heading: "Let's work\ntogether.", location: 'Bucaramanga, Colombia (GMT-5)' },
    footer:  { name: 'Fabián Alexis Mejía Díaz', role: 'Telecom Engineer · Full Stack Developer' },
  },

  es: {
    nav: {
      skills:     'Habilidades',
      experience: 'Experiencia',
      projects:   'Proyectos',
      contact:    'Contacto',
    },
    hero: {
      tag:  'Desarrollador Full Stack · 5+ años',
      desc: 'Construyendo aplicaciones web de alto rendimiento, sistemas en tiempo real y herramientas con IA. Amplia experiencia en pipelines de renderizado, visualización 3D y arquitecturas escalables.',
      cta: { projects: 'Ver Proyectos', github: 'GitHub', linkedin: 'LinkedIn', resume: 'Currículum' },
    },
    scroll: 'scroll',
    metrics: [
      { value: '+230%',      desc: 'Mejora en\nvelocidad de render' },
      { value: 'WebGL',      desc: 'Visualización 3D\ny renderizado en tiempo real' },
      { value: 'Docker/K8s', desc: 'Orquestación\nde contenedores' },
      { value: '5+',         desc: 'Años de\nexperiencia' },
    ],
    sections: {
      skills:     'Habilidades Técnicas',
      experience: 'Experiencia',
      projects:   'Proyectos',
    },
    skills: {
      languages:  { title: 'Lenguajes',              items: ['JavaScript / TypeScript', 'Node.js', 'PHP', 'Python', 'Ruby', 'C++ (bindings nativos)'] },
      frontend:   { title: 'Frontend & Renderizado',  items: ['React · Vue · Angular', 'WebGL · Three.js', 'Fabric.js · Canvas API', 'React Native', 'Tailwind CSS'] },
      backend:    { title: 'Backend & Tiempo Real',   items: ['REST APIs', 'WebSockets', 'MySQL · PostgreSQL', 'MongoDB', 'Laravel'] },
      ai:         { title: 'IA e Integraciones',      items: ['OpenAI · Gemini', 'Orquestación de LLMs', 'Pipelines de generación de imágenes', 'Plugins Photoshop UXP', 'Flujos de trabajo con IA'] },
      infra:      { title: 'Infraestructura',         items: ['AWS · GCP · DigitalOcean', 'Docker · Kubernetes', 'Pipelines CI/CD', 'Git · Scrum'] },
      background: { title: 'Formación',               items: ['Ingeniería en Telecomunicaciones', 'Renderizado & rendimiento', 'Transformaciones 3D', 'Diseño de arquitecturas escalables'] },
    },
    experience: [
      {
        role: 'Desarrollador Full Stack', company: 'Freepik Company', date: 'Mayo 2022 — Presente',
        items: [
          'Creé un editor de maquetas web desde cero con TypeScript y Vue — responsable del front-end y back-end con almacenamiento en MySQL',
          'Implementé WebGL y bindings nativos en C++ para composición de capas, logrando <span class="num">+230% velocidad de render</span> y <span class="num">−130% tiempo de procesamiento</span>',
          'Lideré un plugin para Photoshop con IA (NodeJS, WebSockets, React/UXP, GCP) — reducción del <span class="num">20%</span> en tiempos de respuesta',
          'Construí un Asistente de Diseño con IA usando LLMs (OpenAI, Gemini) para generación de texto e imágenes',
          'Desarrollé un generador de maquetas con IA integrando mapas de profundidad, Fabric.js en tiempo real y procesamiento coordinado por WebSockets — <span class="num">+20% rendimiento</span>',
          'Participé en el desarrollo de una plataforma de generación de contenido con IA basada en nodos, soportando múltiples modelos para imagen, video, audio y texto — los usuarios componen flujos de trabajo visualmente mediante nodos conectados con procesamiento en tiempo real y salida en streaming',
        ],
      },
      {
        role: 'Desarrollador Full Stack', company: 'Avances Software', date: 'Feb 2022 — Abr 2022',
        items: [
          'Optimicé flujos de firma de contratos, pagos y agendamiento médico — <span class="num">−50% errores en transacciones</span>, <span class="num">−40% uso de memoria</span>',
          'Construí un sistema de facturación gubernamental en tiempo real con <span class="num">99% de precisión</span> y <span class="num">−30% tiempo de procesamiento</span>',
        ],
      },
      {
        role: 'Desarrollador Full Stack', company: 'Alpes Solutions', date: 'Mar 2020 — Ene 2022',
        items: [
          'Automaticé el <span class="num">20% de los procesos internos</span> y lideré el desarrollo de una aplicación de seguimiento de tiempo',
          'Construí módulos de gestión de eventos con React Native y PostgreSQL — <span class="num">+25% eficiencia operativa</span>',
        ],
      },
    ],
    projects: [
      {
        title: 'Catálogo 3D',
        desc:  'Visor 3D interactivo para visualización de productos — renderizado en tiempo real, navegación de modelos y exploración configurable construido sobre WebGL.',
        tags:  ['WebGL', 'Three.js', 'Tiempo Real', '3D'],
        href:  'https://fibiaanm.github.io/3d-viewer/catalog',
        url:   'fibiaanm.github.io/3d-viewer/catalog',
        type:  'cube',
      },
      {
        title: 'Snake',
        desc:  'El clásico juego Snake reconstruido con tecnologías web modernas — arquitectura de game loop, control de frame rate y renderizado fluido en canvas.',
        tags:  ['Canvas', 'Game Loop', 'JavaScript', 'Animación'],
        href:  'https://fibiaanm.github.io/snake',
        url:   'fibiaanm.github.io/snake',
        type:  'snake',
      },
    ],
    contact: { heading: 'Trabajemos\njuntos.', location: 'Bucaramanga, Colombia (GMT-5)' },
    footer:  { name: 'Fabián Alexis Mejía Díaz', role: 'Ingeniero en Telecomunicaciones · Desarrollador Full Stack' },
  },
};

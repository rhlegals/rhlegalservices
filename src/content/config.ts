import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    language: z.enum(['es', 'en']),
    author: z.string(),
    category: z.string(),
    image: z.string(),
    imageAlt: z.string().optional(),
  }),
});

const pilarSchema = z.object({
  icono: z.string(),
  titulo_es: z.string(),
  titulo_en: z.string(),
  texto_es: z.string(),
  texto_en: z.string(),
});

const paginas = defineCollection({
  type: 'data',
  schema: z.object({
    zona_hero: z.object({
      titulo_es: z.string(),
      titulo_en: z.string(),
      subtitulo_es: z.string().optional(),
      subtitulo_en: z.string().optional(),
      descripcion_es: z.string().optional(),
      descripcion_en: z.string().optional(),
      aclaracion_es: z.string().optional(),
      aclaracion_en: z.string().optional(),
      imagen_fondo: z.string(),
    }),
    seccion_porque_rh: z.object({
      titulo_es: z.string(),
      titulo_en: z.string(),
      descripcion_es: z.string(),
      descripcion_en: z.string(),
      pilares: z.array(pilarSchema),
    }).optional(),
    seccion_cta: z.object({
      titulo_es: z.string(),
      titulo_en: z.string(),
      subtitulo_es: z.string(),
      subtitulo_en: z.string(),
      texto_boton_es: z.string(),
      texto_boton_en: z.string(),
    }).optional(),
    seccion_historia: z.object({
      titulo_es: z.string(),
      titulo_en: z.string(),
      parrafos_es: z.array(z.string()),
      parrafos_en: z.array(z.string()),
      imagen_lateral: z.string(),
    }).optional(),
    seccion_mision_valores: z.object({
      titulo_es: z.string(),
      titulo_en: z.string(),
      items: z.array(z.object({
        icono: z.string(),
        titulo_es: z.string(),
        titulo_en: z.string(),
        texto_es: z.string(),
        texto_en: z.string(),
      })),
    }).optional(),
    seccion_equipo: z.object({
      titulo_es: z.string(),
      titulo_en: z.string(),
      subtitulo_es: z.string(),
      subtitulo_en: z.string(),
      nombre: z.string(),
      cargo_es: z.string(),
      cargo_en: z.string(),
      bio_es: z.array(z.string()),
      bio_en: z.array(z.string()),
      imagen_perfil: z.string(),
      datos_contacto: z.object({
        email: z.string(),
        linkedin: z.string(),
        ubicacion: z.string(),
      }),
      etiquetas_practica: z.array(z.string()),
    }).optional(),
    seccion_porque_elegirnos: z.object({
      frase_ganadora_es: z.string(),
      frase_ganadora_en: z.string(),
      contadores: z.array(z.object({
        numero: z.string(),
        etiqueta_es: z.string(),
        etiqueta_en: z.string(),
        descripcion_es: z.string(),
        descripcion_en: z.string(),
      })),
    }).optional(),
    seccion_contacto_formulario: z.object({
      titulo_es: z.string(),
      titulo_en: z.string(),
      descripcion_es: z.string(),
      descripcion_en: z.string(),
      puntos_clave: z.array(z.object({
        texto_es: z.string(),
        texto_en: z.string(),
      })),
    }).optional(),
  }),
});

const servicios = defineCollection({
  type: 'data',
  schema: z.object({
    meta: z.object({
      id: z.string(),
      slug: z.string(),
      orden: z.number(),
    }),
    tarjeta_inicio: z.object({
      titulo_es: z.string(),
      titulo_en: z.string(),
      mini_descripcion_es: z.string(),
      mini_descripcion_en: z.string(),
      imagen_fondo_tarjeta: z.string(),
      alt_es: z.string().optional(),
      alt_en: z.string().optional(),
    }),
    pagina_interna: z.object({
      hero_titulo_es: z.string(),
      hero_titulo_en: z.string(),
      hero_imagen_fondo: z.string(),
      introduccion_es: z.string(),
      introduccion_en: z.string(),
      bloques_contenido: z.array(z.object({
        titulo_es: z.string(),
        titulo_en: z.string(),
        texto_es: z.string(),
        texto_en: z.string(),
      })).optional(),
      seccion_faq: z.array(z.object({
        pregunta_es: z.string(),
        pregunta_en: z.string(),
        respuesta_es: z.string(),
        respuesta_en: z.string(),
      })).optional(),
    }),
  }),
});

const navLinkSchema = z.object({ href: z.string(), label: z.string() });

const configuracion = defineCollection({
  type: 'data',
  schema: z.object({
    siteLogo: z.object({
      image: z.string(),
      alt: z.string(),
    }),
    contact: z.object({
      email: z.string(),
      phoneOffice: z.string(),
      address: z.string(),
      addressEn: z.string(),
    }),
    theme: z.object({
      headerBgLight: z.string(),
      headerBgDarkActive: z.string(),
      mobileMenuBg: z.string(),
      footerBg: z.string(),
    }),
    whatsapp: z.object({
      phone: z.string(),
      prefilledMessages: z.object({
        home: z.object({ es: z.string(), en: z.string() }),
        immigration: z.object({ es: z.string(), en: z.string() }),
        trademark: z.object({ es: z.string(), en: z.string() }),
        other: z.object({ es: z.string(), en: z.string() }),
      }),
    }),
    navigation: z.object({
      es: z.array(navLinkSchema),
      en: z.array(navLinkSchema),
    }),
  }),
});

export const collections = { blog, paginas, servicios, configuracion };

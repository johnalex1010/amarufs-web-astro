import { defineField, defineType } from "sanity";

const editorialStatuses = [
  { title: "Borrador", value: "borrador" },
  { title: "En validación", value: "en-validacion" },
  { title: "Publicado", value: "publicado" },
  { title: "Reservado", value: "reservado" },
  { title: "Vendido", value: "vendido" },
  { title: "Arrendado", value: "arrendado" },
  { title: "Inactivo", value: "inactivo" }
];

const operations = [
  { title: "Arriendo", value: "arriendo" },
  { title: "Venta", value: "venta" }
];

export const property = defineType({
  name: "property",
  title: "Inmueble",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required().min(8).max(120)
    }),
    defineField({
      name: "seoTitle",
      title: "Título SEO",
      type: "string",
      description: "Base del slug público: /inmuebles/titulo-seo-generado/",
      validation: (rule) => rule.required().min(8).max(80)
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "seoTitle",
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "editorialStatus",
      title: "Estado editorial",
      type: "string",
      initialValue: "borrador",
      options: {
        list: editorialStatuses,
        layout: "radio"
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "operation",
      title: "Tipo de operación",
      type: "string",
      options: {
        list: operations,
        layout: "radio"
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "propertyType",
      title: "Tipo de inmueble",
      type: "string",
      validation: (rule) => rule.required().min(3).max(60)
    }),
    defineField({
      name: "saleValue",
      title: "Valor en venta",
      type: "number",
      hidden: ({ parent }) => parent?.operation !== "venta",
      validation: (rule) =>
        rule.custom((value, context) => {
          const operation = (context.parent as { operation?: string })?.operation;
          if (operation === "venta" && !value) {
            return "El valor en venta es obligatorio para inmuebles en venta.";
          }
          return true;
        })
    }),
    defineField({
      name: "rentValue",
      title: "Valor en arriendo",
      type: "number",
      hidden: ({ parent }) => parent?.operation !== "arriendo",
      validation: (rule) =>
        rule.custom((value, context) => {
          const operation = (context.parent as { operation?: string })?.operation;
          if (operation === "arriendo" && !value) {
            return "El valor en arriendo es obligatorio para inmuebles en arriendo.";
          }
          return true;
        })
    }),
    defineField({
      name: "locationLabel",
      title: "Ubicación visible",
      type: "string",
      description: "Ciudad, sector o referencia pública segura.",
      validation: (rule) => rule.required().min(3).max(100)
    }),
    defineField({
      name: "googleMapsEmbed",
      title: "Google Maps iframe o URL embed",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required().min(80).max(1200)
    }),
    defineField({
      name: "summary",
      title: "Resumen corto",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(240)
    }),
    defineField({
      name: "gallery",
      title: "Fotos",
      type: "array",
      of: [{ type: "cloudinary.asset" }],
      validation: (rule) => rule.required().min(1).max(10)
    }),
    defineField({
      name: "features",
      title: "Características",
      type: "array",
      of: [
        defineField({
          name: "feature",
          title: "Característica",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Etiqueta",
              type: "string",
              validation: (rule) => rule.required().min(2).max(50)
            }),
            defineField({
              name: "icon",
              title: "Icono Font Awesome",
              type: "string",
              description: "Ejemplo: fa-solid fa-bed",
              validation: (rule) => rule.required().min(8).max(80)
            }),
            defineField({
              name: "filterValue",
              title: "Valor para filtros",
              type: "string"
            })
          ]
        })
      ],
      validation: (rule) => rule.required().min(1).max(24)
    }),
    defineField({
      name: "nearbyZones",
      title: "Zonas aledañas",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1).max(12)
    }),
    defineField({
      name: "youtubeShortUrl",
      title: "Video de YouTube Short",
      type: "url"
    }),
    defineField({
      name: "internalCode",
      title: "Código interno",
      type: "string",
      description: "No debe contener datos personales.",
      validation: (rule) => rule.max(40)
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(80).max(160)
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "locationLabel",
      status: "editorialStatus"
    },
    prepare({ title, subtitle, status }) {
      return {
        title,
        subtitle: `${subtitle ?? "Sin ubicación"} · ${status ?? "sin estado"}`
      };
    }
  }
});

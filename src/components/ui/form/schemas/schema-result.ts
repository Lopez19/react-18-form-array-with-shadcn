import { z } from "zod";

export const schemaResultObj = z.object({
  reward_concept_id: z
    .string()
    .min(1, "Debe seleccionar un concepto de premio"),
  resultNumber: z
    .string()
    .min(1, "Debe agregar un número")
    .regex(/^\d+$/, "Debe ser un número"),
  resultSerie: z
    .string()
    .min(1, "Debe agregar una serie")
    .regex(/^\d+$/, "Debe ser un número"),
});

export const schemaResultForm = z.object({
  raffle_id: z.string().min(1, "Debe agregar un ID de sorteo"),
  product_id: z.string().min(1, "Debe agregar un ID de producto"),
  results: z
    .array(schemaResultObj)
    .min(1, "Debe agregar al menos un resultado"),
});

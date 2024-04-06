import { z } from "zod";

export const schemaResultObj = z.object({
  raffle_id: z.coerce.number(),
  reward_concept_id: z.coerce.number(),
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
  results: z
    .array(schemaResultObj)
    .min(1, "Debe agregar al menos un resultado"),
});

import { z } from "zod";
import { needs } from "./site";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom.").max(100),
  company: z.string().trim().max(120).optional().default(""),
  email: z.email("Indiquez un email valide.").max(200),
  needs: z.array(z.enum(needs)).default([]),
  message: z.string().trim().min(10, "Décrivez votre projet en quelques mots.").max(5000),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
};

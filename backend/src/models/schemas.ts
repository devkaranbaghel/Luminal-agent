import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const scrapedJobSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string().optional(),
  matchScore: z.number().min(0).max(100).optional(),
  source: z.string().optional(),
  externalUrl: z.string().url().optional(),
});

import { defineCollection, z } from 'astro:content';

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    phase: z.enum(['PLAN', 'BUILD', 'DEPLOY', 'SUPPORT']).optional(),
    category: z.string().optional(),
    order: z.number().optional(),
  })
});

const examples = defineCollection({
  type: 'content', 
  schema: z.object({
    title: z.string(),
    description: z.string(),
    threadLink: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().optional(),
  })
});

export const collections = { guides, examples };

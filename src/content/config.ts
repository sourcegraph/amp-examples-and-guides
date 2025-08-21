import { defineCollection, z } from 'astro:content';

const guides = defineCollection({
  type: 'content',
  schema: ({ data }) => {
    // Allow README files to have optional schema
    const baseSchema = z.object({
      title: z.string(),
      description: z.string(),
      phase: z.enum(['PLAN', 'BUILD', 'DEPLOY', 'SUPPORT']).optional(),
      category: z.string().optional(),
      order: z.number().optional(),
    });
    
    return baseSchema.partial();
  }
});

const examples = defineCollection({
  type: 'content', 
  schema: ({ data }) => {
    const baseSchema = z.object({
      title: z.string(),
      description: z.string(),
      threadLink: z.string().url().optional(),
      tags: z.array(z.string()).default([]),
      order: z.number().optional(),
    });
    
    return baseSchema.partial();
  }
});

export const collections = { guides, examples };

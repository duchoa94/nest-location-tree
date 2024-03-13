import { z } from 'zod';

export const createLocationSchema = z.object({
  name: z.string({ required_error: 'The name of the location is required' }),
  number: z.string().optional(),
  area: z.number({ invalid_type_error: 'The area must be number' }).optional(),
  areaUnit: z.string().optional(),
  parentId: z.number().optional(),
});

export const updateLocationSchema = z.object({
  name: z.string({ required_error: 'The name of the location is required' }),
  number: z.string().optional(),
  area: z.number({ invalid_type_error: 'The area must be number' }).optional(),
  areaUnit: z.string().optional(),
  parentId: z.number().optional(),
});

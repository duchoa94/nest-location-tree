import { z } from 'zod';

export const createLocationSchema = z
  .object({
    name: z.string({ required_error: 'The name of the location is required' }),
    number: z.string({ required_error: 'The number of the location is required' }),
    area: z.number({ required_error: 'The area of the location is required' }),
    areaUnit: z.string({
      required_error: 'The area unit of the location is required',
    }),
  });

export const updateLocationSchema = z
  .object({
    name: z.string({ required_error: 'The name of the location is required' }),
    number: z.string({ required_error: 'The number of the location is required' }),
    area: z.number({ required_error: 'The area of the location is required' }),
    areaUnit: z.string({
      required_error: 'The area unit of the location is required',
    }),
  })
  .required();

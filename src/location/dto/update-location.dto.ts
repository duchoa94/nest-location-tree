import { updateLocationSchema } from '../schema/location.schema';
import { z } from 'zod';

export type UpdateLocationDto = z.infer<typeof updateLocationSchema>;

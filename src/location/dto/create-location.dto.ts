import { z } from "zod";
import { createLocationSchema } from "../schema/location.schema";

export type CreateLocationDto = z.infer<typeof createLocationSchema>;
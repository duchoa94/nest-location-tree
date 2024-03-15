import { z } from "zod";
import { createLocationSchema } from "../schema/location.schema";

export type CreateLocationDto = Required<z.infer<typeof createLocationSchema>>;
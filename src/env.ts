import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    TOKEN: z.string(),

    DELETE_TIME: z
      .string()
      .default('7500')
      .transform((v) => parseInt(v, 10)),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

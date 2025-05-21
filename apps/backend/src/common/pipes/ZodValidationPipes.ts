import { PipeTransform, BadRequestException } from '@nestjs/common';
import { z, ZodTypeAny } from 'zod';

export class ZodValidationPipe<T extends ZodTypeAny> implements PipeTransform {
  constructor(private schema: T) {}

  transform(value: unknown): z.infer<T> {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException(
        result.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      );
    }

    return result.data as T;
  }
}

import {
  assignMetadata,
  createParamDecorator,
  type ExecutionContext,
  type RouteParamMetadata,
} from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { RouteParamtypes } from '@nestjs/common/enums/route-paramtypes.enum';
import type { Request } from 'express';

export const ValidateHeaders = createParamDecorator(
  (property: unknown, ctx: ExecutionContext) =>
    ctx.switchToHttp().getRequest<Request>().headers,
  [
    (
      target: object,
      propertyKey: string | symbol | undefined,
      parameterIndex: number,
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const args =
        Reflect.getMetadata(
          ROUTE_ARGS_METADATA,
          target.constructor,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          propertyKey!,
        ) ?? {};
      Reflect.defineMetadata(
        ROUTE_ARGS_METADATA,
        assignMetadata<RouteParamtypes, Record<number, RouteParamMetadata>>(
          args as Record<number, RouteParamMetadata>,
          RouteParamtypes.HEADERS,
          parameterIndex,
        ),
        target.constructor,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        propertyKey!,
      );
    },
  ],
);

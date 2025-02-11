# @ValidateHeaders()

By default, NestJS's `Headers` decorator skips validation. This package exports a custom `ValidateHeaders` decorator which behaves the same as NestJS's `Headers` but also performs validation.

## Installation

```bash
$ npm install nestjs-validate-headers`
```

## Setup

To enable validation in this decorator, you must add a global pipe to your NestJS app with validateCustomDecorators set to true. Typically this is inside your main.ts's bootstrap function. Add this to enable validation globally.

```typescript
// main.ts -> bootstrap
app.useGlobalPipes(new ValidationPipe({ validateCustomDecorators: true }));
```

Alternatively, you can enable validation per-use by passing a validation pipe to the decorator wherever you're using it. Again, be sure to enable validateCustomDecorators.

```typescript
// controller.ts
@ValidateHeaders(new ValidationPipe({ validateCustomDecorators: true }))
```

# Example

#### `main.ts`

```typescript
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // ...
  app.useGlobalPipes(new ValidationPipe({ validateCustomDecorators: true })); // <- Add this if you want to enable global validation
  // ...
}
bootstrap();
```

#### `app.controller.ts`

```typescript
import { Controller, Get, ValidationPipe } from '@nestjs/common';
import { ValidateHeaders } from 'nestjs-validate-headers';
import { AppDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(
    @ValidateHeaders() headers: AppDto,
    // @ValidateHeaders(new ValidationPipe({ validateCustomDecorators: true })) headers: AppDto, // <- Use this if you have not added global validation pipes.
  ) {
    console.log({ headers });
    // ...
  }
}
```

#### `app.dto.ts`

```typescript
import { IsNumberString, IsEmail } from 'class-validator';

export class AppDto {
  @IsNumberString()
  'custom-header-1': `${number}`;

  @IsEmail()
  email: string;
}
```

[Credit to rluvaton](https://github.com/nestjs/nest/issues/4798#issuecomment-1016687080)

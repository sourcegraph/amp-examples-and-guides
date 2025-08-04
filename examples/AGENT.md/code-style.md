# Code Quality Guidelines

## No Comments in Code
Code should be self-documenting through clear naming and structure. Comments indicate that the code itself is not clear enough.
Class-level/method-level comments should be used to ensure that documentation generators produce quality output.

## Prefer Options Objects
Use options objects for function parameters as the default pattern. Only use positional parameters when there's a clear, compelling reason.

```typescript
// Good: Options object with clear property names
type CreatePaymentOptions = {
  amount: number;
  currency: string;
  cardId: string;
  customerId: string;
  description?: string;
};

const createPayment = (options: CreatePaymentOptions): Payment => {
  // implementation
};
```


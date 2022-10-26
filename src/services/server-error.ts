export class ServerError extends Error {
    constructor(
      message: string,
      public readonly type: unknown,
      public readonly code = 3,
      public readonly details: unknown,
      public readonly subcode = 0,
    ) {
      super(message);
    }
  }
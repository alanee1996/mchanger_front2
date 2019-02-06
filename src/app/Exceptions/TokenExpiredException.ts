export class TokenExpiredException extends Error {
  constructor(m: string) {
    super(m);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, TokenExpiredException.prototype);
  }
}

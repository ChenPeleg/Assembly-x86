export class AssemblyException extends Error {
  constructor(
    public override message: string = "",
    public line: number = 0,
    public data: any = {}
  ) {
    super(message);
    Object.setPrototypeOf(this, AssemblyException.prototype);
  }
}

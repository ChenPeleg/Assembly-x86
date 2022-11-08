export class RuntimeException extends Error
{
    constructor(public override message: string = "")
    {
        super(message);
        Object.setPrototypeOf(this, RuntimeException.prototype);
    }
}

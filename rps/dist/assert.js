export class AssertionError extends Error {
    name = "AssertionError";
}
export function assert(expr, msg) {
    if (!expr)
        throw new AssertionError(msg);
}

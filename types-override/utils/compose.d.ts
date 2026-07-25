/**
 * Hand-written type declarations for compose.
 *
 * TypeScript 7 declaration emit for property assignments on a const function
 * produces duplicate conflicting `var withOptions` entries (TS2403) under
 * `skipLibCheck: false`. This override preserves the coherent TS 6-era
 * namespace shape: `compose.withOptions` with typed `breakWhen`, and
 * `compose.all.withOptions`.
 *
 * Copied over the auto-generated file by `npm run types`
 * (`tsc && cp -r types-override/. types/`).
 */

declare function compose(...fns: Function[]): (...args: any[]) => Promise<any>;
declare namespace compose {
  function all(...fns: any[]): (...args: any[]) => Promise<any>;
  namespace all {
    /**
     * Creates a concurrent pipeline with configuration options.
     *
     * @param options - Pipeline options
     * @param fns - Middleware functions to compose
     */
    function withOptions(
      options: object,
      ...fns: Function[]
    ): (...args: any[]) => Promise<any>;
  }
  /**
   * Creates a sequential pipeline with configuration options.
   *
   * @param options - Pipeline options
   * @param options.breakWhen - Predicate `(acc) => boolean`; when truthy,
   *   serial iteration stops after the current step's result is merged
   * @param fns - Middleware functions to compose
   */
  function withOptions(
    options: {breakWhen?: Function | undefined},
    ...fns: Function[]
  ): (...args: any[]) => Promise<any>;
}
export default compose;
/**
 * Creates a null-prototype accumulator object.
 *
 * @param defaults - Initial properties to copy into the accumulator
 * @returns Null-prototype accumulator with `isAccumulator: true` and `size` getter
 */
export function accumulator(defaults?: object): object;

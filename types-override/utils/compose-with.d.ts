/**
 * Hand-written type declarations for compose-with.
 *
 * Auto-generated declarations cannot express the variadic generic
 * relationship between [fn, setPath] tuples and the accumulated result
 * type. This file provides overloaded signatures for 1–12 tuples that
 * infer the accumulator shape from the tuple arguments.
 *
 * Maintenance: when adding a new middleware to ergo, add a corresponding
 * result type to types/ergo.d.ts. These overloads do not need updating
 * unless the compose-with runtime API changes.
 */

import type { ResponseAccumulator } from '../ergo.js';

// ---------------------------------------------------------------------------
// Utility types
// ---------------------------------------------------------------------------

/**
 * Extracts the success-path value type from a middleware function's return,
 * matching runtime `extractReturn()` semantics:
 *
 * 1. Unwrap Promise (via Awaited)
 * 2. If the resolved type has an explicit `value` property (not via index
 *    signature), extract `value` — this mirrors runtime extracting
 *    `{value, response}` envelopes
 * 3. Otherwise use the resolved type as-is — this mirrors runtime wrapping
 *    bare returns as `{value: ret}`
 *
 * The index-signature guard (`string extends keyof T`) prevents unwrapping
 * types like CookieJar (`{[k: string]: string}`) whose index signature
 * incidentally satisfies `{value: any}`.
 */
type ExtractValue<F> =
  F extends (...args: any[]) => infer R
    ? Awaited<R> extends infer Resolved
      ? Resolved extends { value: infer V; response?: any }
        ? string extends keyof Resolved ? Resolved : V
        : Resolved
      : never
    : unknown;

// ---------------------------------------------------------------------------
// Composed pipeline return type
// ---------------------------------------------------------------------------

type ComposedPipeline<Acc extends object> = (...args: any[]) => Promise<Acc>;

// ---------------------------------------------------------------------------
// createResponseAcc / mergeResponse (preserved from auto-generated)
// ---------------------------------------------------------------------------

export function createResponseAcc(): ResponseAccumulator;
export function mergeResponse(responseAcc: ResponseAccumulator, patch: Partial<ResponseAccumulator>): void;

// ---------------------------------------------------------------------------
// composeWith overloads (1–12 tuples + optional trailing plain functions)
// ---------------------------------------------------------------------------

declare function composeWith<K1 extends string, F1 extends (...args: any[]) => any>(
  op1: readonly [F1, K1] | [F1, K1],
  ...rest: ((...args: any[]) => any)[]
): ComposedPipeline<{ [P in K1]: ExtractValue<F1> }>;

declare function composeWith<
  K1 extends string, F1 extends (...args: any[]) => any,
  K2 extends string, F2 extends (...args: any[]) => any,
>(
  op1: readonly [F1, K1] | [F1, K1],
  op2: readonly [F2, K2] | [F2, K2],
  ...rest: ((...args: any[]) => any)[]
): ComposedPipeline<{ [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> }>;

declare function composeWith<
  K1 extends string, F1 extends (...args: any[]) => any,
  K2 extends string, F2 extends (...args: any[]) => any,
  K3 extends string, F3 extends (...args: any[]) => any,
>(
  op1: readonly [F1, K1] | [F1, K1],
  op2: readonly [F2, K2] | [F2, K2],
  op3: readonly [F3, K3] | [F3, K3],
  ...rest: ((...args: any[]) => any)[]
): ComposedPipeline<{ [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } & { [P in K3]: ExtractValue<F3> }>;

declare function composeWith<
  K1 extends string, F1 extends (...args: any[]) => any,
  K2 extends string, F2 extends (...args: any[]) => any,
  K3 extends string, F3 extends (...args: any[]) => any,
  K4 extends string, F4 extends (...args: any[]) => any,
>(
  op1: readonly [F1, K1] | [F1, K1],
  op2: readonly [F2, K2] | [F2, K2],
  op3: readonly [F3, K3] | [F3, K3],
  op4: readonly [F4, K4] | [F4, K4],
  ...rest: ((...args: any[]) => any)[]
): ComposedPipeline<
  { [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } &
  { [P in K3]: ExtractValue<F3> } & { [P in K4]: ExtractValue<F4> }
>;

declare function composeWith<
  K1 extends string, F1 extends (...args: any[]) => any,
  K2 extends string, F2 extends (...args: any[]) => any,
  K3 extends string, F3 extends (...args: any[]) => any,
  K4 extends string, F4 extends (...args: any[]) => any,
  K5 extends string, F5 extends (...args: any[]) => any,
>(
  op1: readonly [F1, K1] | [F1, K1],
  op2: readonly [F2, K2] | [F2, K2],
  op3: readonly [F3, K3] | [F3, K3],
  op4: readonly [F4, K4] | [F4, K4],
  op5: readonly [F5, K5] | [F5, K5],
  ...rest: ((...args: any[]) => any)[]
): ComposedPipeline<
  { [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } &
  { [P in K3]: ExtractValue<F3> } & { [P in K4]: ExtractValue<F4> } &
  { [P in K5]: ExtractValue<F5> }
>;

declare function composeWith<
  K1 extends string, F1 extends (...args: any[]) => any,
  K2 extends string, F2 extends (...args: any[]) => any,
  K3 extends string, F3 extends (...args: any[]) => any,
  K4 extends string, F4 extends (...args: any[]) => any,
  K5 extends string, F5 extends (...args: any[]) => any,
  K6 extends string, F6 extends (...args: any[]) => any,
>(
  op1: readonly [F1, K1] | [F1, K1],
  op2: readonly [F2, K2] | [F2, K2],
  op3: readonly [F3, K3] | [F3, K3],
  op4: readonly [F4, K4] | [F4, K4],
  op5: readonly [F5, K5] | [F5, K5],
  op6: readonly [F6, K6] | [F6, K6],
  ...rest: ((...args: any[]) => any)[]
): ComposedPipeline<
  { [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } &
  { [P in K3]: ExtractValue<F3> } & { [P in K4]: ExtractValue<F4> } &
  { [P in K5]: ExtractValue<F5> } & { [P in K6]: ExtractValue<F6> }
>;

declare function composeWith<
  K1 extends string, F1 extends (...args: any[]) => any,
  K2 extends string, F2 extends (...args: any[]) => any,
  K3 extends string, F3 extends (...args: any[]) => any,
  K4 extends string, F4 extends (...args: any[]) => any,
  K5 extends string, F5 extends (...args: any[]) => any,
  K6 extends string, F6 extends (...args: any[]) => any,
  K7 extends string, F7 extends (...args: any[]) => any,
>(
  op1: readonly [F1, K1] | [F1, K1],
  op2: readonly [F2, K2] | [F2, K2],
  op3: readonly [F3, K3] | [F3, K3],
  op4: readonly [F4, K4] | [F4, K4],
  op5: readonly [F5, K5] | [F5, K5],
  op6: readonly [F6, K6] | [F6, K6],
  op7: readonly [F7, K7] | [F7, K7],
  ...rest: ((...args: any[]) => any)[]
): ComposedPipeline<
  { [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } &
  { [P in K3]: ExtractValue<F3> } & { [P in K4]: ExtractValue<F4> } &
  { [P in K5]: ExtractValue<F5> } & { [P in K6]: ExtractValue<F6> } &
  { [P in K7]: ExtractValue<F7> }
>;

declare function composeWith<
  K1 extends string, F1 extends (...args: any[]) => any,
  K2 extends string, F2 extends (...args: any[]) => any,
  K3 extends string, F3 extends (...args: any[]) => any,
  K4 extends string, F4 extends (...args: any[]) => any,
  K5 extends string, F5 extends (...args: any[]) => any,
  K6 extends string, F6 extends (...args: any[]) => any,
  K7 extends string, F7 extends (...args: any[]) => any,
  K8 extends string, F8 extends (...args: any[]) => any,
>(
  op1: readonly [F1, K1] | [F1, K1],
  op2: readonly [F2, K2] | [F2, K2],
  op3: readonly [F3, K3] | [F3, K3],
  op4: readonly [F4, K4] | [F4, K4],
  op5: readonly [F5, K5] | [F5, K5],
  op6: readonly [F6, K6] | [F6, K6],
  op7: readonly [F7, K7] | [F7, K7],
  op8: readonly [F8, K8] | [F8, K8],
  ...rest: ((...args: any[]) => any)[]
): ComposedPipeline<
  { [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } &
  { [P in K3]: ExtractValue<F3> } & { [P in K4]: ExtractValue<F4> } &
  { [P in K5]: ExtractValue<F5> } & { [P in K6]: ExtractValue<F6> } &
  { [P in K7]: ExtractValue<F7> } & { [P in K8]: ExtractValue<F8> }
>;

declare function composeWith<
  K1 extends string, F1 extends (...args: any[]) => any,
  K2 extends string, F2 extends (...args: any[]) => any,
  K3 extends string, F3 extends (...args: any[]) => any,
  K4 extends string, F4 extends (...args: any[]) => any,
  K5 extends string, F5 extends (...args: any[]) => any,
  K6 extends string, F6 extends (...args: any[]) => any,
  K7 extends string, F7 extends (...args: any[]) => any,
  K8 extends string, F8 extends (...args: any[]) => any,
  K9 extends string, F9 extends (...args: any[]) => any,
>(
  op1: readonly [F1, K1] | [F1, K1],
  op2: readonly [F2, K2] | [F2, K2],
  op3: readonly [F3, K3] | [F3, K3],
  op4: readonly [F4, K4] | [F4, K4],
  op5: readonly [F5, K5] | [F5, K5],
  op6: readonly [F6, K6] | [F6, K6],
  op7: readonly [F7, K7] | [F7, K7],
  op8: readonly [F8, K8] | [F8, K8],
  op9: readonly [F9, K9] | [F9, K9],
  ...rest: ((...args: any[]) => any)[]
): ComposedPipeline<
  { [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } &
  { [P in K3]: ExtractValue<F3> } & { [P in K4]: ExtractValue<F4> } &
  { [P in K5]: ExtractValue<F5> } & { [P in K6]: ExtractValue<F6> } &
  { [P in K7]: ExtractValue<F7> } & { [P in K8]: ExtractValue<F8> } &
  { [P in K9]: ExtractValue<F9> }
>;

declare function composeWith<
  K1 extends string, F1 extends (...args: any[]) => any,
  K2 extends string, F2 extends (...args: any[]) => any,
  K3 extends string, F3 extends (...args: any[]) => any,
  K4 extends string, F4 extends (...args: any[]) => any,
  K5 extends string, F5 extends (...args: any[]) => any,
  K6 extends string, F6 extends (...args: any[]) => any,
  K7 extends string, F7 extends (...args: any[]) => any,
  K8 extends string, F8 extends (...args: any[]) => any,
  K9 extends string, F9 extends (...args: any[]) => any,
  K10 extends string, F10 extends (...args: any[]) => any,
>(
  op1: readonly [F1, K1] | [F1, K1],
  op2: readonly [F2, K2] | [F2, K2],
  op3: readonly [F3, K3] | [F3, K3],
  op4: readonly [F4, K4] | [F4, K4],
  op5: readonly [F5, K5] | [F5, K5],
  op6: readonly [F6, K6] | [F6, K6],
  op7: readonly [F7, K7] | [F7, K7],
  op8: readonly [F8, K8] | [F8, K8],
  op9: readonly [F9, K9] | [F9, K9],
  op10: readonly [F10, K10] | [F10, K10],
  ...rest: ((...args: any[]) => any)[]
): ComposedPipeline<
  { [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } &
  { [P in K3]: ExtractValue<F3> } & { [P in K4]: ExtractValue<F4> } &
  { [P in K5]: ExtractValue<F5> } & { [P in K6]: ExtractValue<F6> } &
  { [P in K7]: ExtractValue<F7> } & { [P in K8]: ExtractValue<F8> } &
  { [P in K9]: ExtractValue<F9> } & { [P in K10]: ExtractValue<F10> }
>;

declare function composeWith<
  K1 extends string, F1 extends (...args: any[]) => any,
  K2 extends string, F2 extends (...args: any[]) => any,
  K3 extends string, F3 extends (...args: any[]) => any,
  K4 extends string, F4 extends (...args: any[]) => any,
  K5 extends string, F5 extends (...args: any[]) => any,
  K6 extends string, F6 extends (...args: any[]) => any,
  K7 extends string, F7 extends (...args: any[]) => any,
  K8 extends string, F8 extends (...args: any[]) => any,
  K9 extends string, F9 extends (...args: any[]) => any,
  K10 extends string, F10 extends (...args: any[]) => any,
  K11 extends string, F11 extends (...args: any[]) => any,
>(
  op1: readonly [F1, K1] | [F1, K1],
  op2: readonly [F2, K2] | [F2, K2],
  op3: readonly [F3, K3] | [F3, K3],
  op4: readonly [F4, K4] | [F4, K4],
  op5: readonly [F5, K5] | [F5, K5],
  op6: readonly [F6, K6] | [F6, K6],
  op7: readonly [F7, K7] | [F7, K7],
  op8: readonly [F8, K8] | [F8, K8],
  op9: readonly [F9, K9] | [F9, K9],
  op10: readonly [F10, K10] | [F10, K10],
  op11: readonly [F11, K11] | [F11, K11],
  ...rest: ((...args: any[]) => any)[]
): ComposedPipeline<
  { [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } &
  { [P in K3]: ExtractValue<F3> } & { [P in K4]: ExtractValue<F4> } &
  { [P in K5]: ExtractValue<F5> } & { [P in K6]: ExtractValue<F6> } &
  { [P in K7]: ExtractValue<F7> } & { [P in K8]: ExtractValue<F8> } &
  { [P in K9]: ExtractValue<F9> } & { [P in K10]: ExtractValue<F10> } &
  { [P in K11]: ExtractValue<F11> }
>;

declare function composeWith<
  K1 extends string, F1 extends (...args: any[]) => any,
  K2 extends string, F2 extends (...args: any[]) => any,
  K3 extends string, F3 extends (...args: any[]) => any,
  K4 extends string, F4 extends (...args: any[]) => any,
  K5 extends string, F5 extends (...args: any[]) => any,
  K6 extends string, F6 extends (...args: any[]) => any,
  K7 extends string, F7 extends (...args: any[]) => any,
  K8 extends string, F8 extends (...args: any[]) => any,
  K9 extends string, F9 extends (...args: any[]) => any,
  K10 extends string, F10 extends (...args: any[]) => any,
  K11 extends string, F11 extends (...args: any[]) => any,
  K12 extends string, F12 extends (...args: any[]) => any,
>(
  op1: readonly [F1, K1] | [F1, K1],
  op2: readonly [F2, K2] | [F2, K2],
  op3: readonly [F3, K3] | [F3, K3],
  op4: readonly [F4, K4] | [F4, K4],
  op5: readonly [F5, K5] | [F5, K5],
  op6: readonly [F6, K6] | [F6, K6],
  op7: readonly [F7, K7] | [F7, K7],
  op8: readonly [F8, K8] | [F8, K8],
  op9: readonly [F9, K9] | [F9, K9],
  op10: readonly [F10, K10] | [F10, K10],
  op11: readonly [F11, K11] | [F11, K11],
  op12: readonly [F12, K12] | [F12, K12],
  ...rest: ((...args: any[]) => any)[]
): ComposedPipeline<
  { [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } &
  { [P in K3]: ExtractValue<F3> } & { [P in K4]: ExtractValue<F4> } &
  { [P in K5]: ExtractValue<F5> } & { [P in K6]: ExtractValue<F6> } &
  { [P in K7]: ExtractValue<F7> } & { [P in K8]: ExtractValue<F8> } &
  { [P in K9]: ExtractValue<F9> } & { [P in K10]: ExtractValue<F10> } &
  { [P in K11]: ExtractValue<F11> } & { [P in K12]: ExtractValue<F12> }
>;

// Fallback for >12 tuples or all-plain-function calls
declare function composeWith(
  ...ops: (readonly [(...args: any[]) => any, string] | [(...args: any[]) => any, string] | ((...args: any[]) => any))[]
): (...args: any[]) => Promise<object>;

// ---------------------------------------------------------------------------
// composeWith.all overloads (1–12 tuples, mirroring top-level)
// ---------------------------------------------------------------------------

declare namespace composeWith {
  function all<K1 extends string, F1 extends (...args: any[]) => any>(
    op1: readonly [F1, K1] | [F1, K1],
    ...rest: ((...args: any[]) => any)[]
  ): ComposedPipeline<{ [P in K1]: ExtractValue<F1> }>;

  function all<
    K1 extends string, F1 extends (...args: any[]) => any,
    K2 extends string, F2 extends (...args: any[]) => any,
  >(
    op1: readonly [F1, K1] | [F1, K1],
    op2: readonly [F2, K2] | [F2, K2],
    ...rest: ((...args: any[]) => any)[]
  ): ComposedPipeline<{ [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> }>;

  function all<
    K1 extends string, F1 extends (...args: any[]) => any,
    K2 extends string, F2 extends (...args: any[]) => any,
    K3 extends string, F3 extends (...args: any[]) => any,
  >(
    op1: readonly [F1, K1] | [F1, K1],
    op2: readonly [F2, K2] | [F2, K2],
    op3: readonly [F3, K3] | [F3, K3],
    ...rest: ((...args: any[]) => any)[]
  ): ComposedPipeline<{ [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } & { [P in K3]: ExtractValue<F3> }>;

  function all<
    K1 extends string, F1 extends (...args: any[]) => any,
    K2 extends string, F2 extends (...args: any[]) => any,
    K3 extends string, F3 extends (...args: any[]) => any,
    K4 extends string, F4 extends (...args: any[]) => any,
  >(
    op1: readonly [F1, K1] | [F1, K1],
    op2: readonly [F2, K2] | [F2, K2],
    op3: readonly [F3, K3] | [F3, K3],
    op4: readonly [F4, K4] | [F4, K4],
    ...rest: ((...args: any[]) => any)[]
  ): ComposedPipeline<
    { [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } &
    { [P in K3]: ExtractValue<F3> } & { [P in K4]: ExtractValue<F4> }
  >;

  function all<
    K1 extends string, F1 extends (...args: any[]) => any,
    K2 extends string, F2 extends (...args: any[]) => any,
    K3 extends string, F3 extends (...args: any[]) => any,
    K4 extends string, F4 extends (...args: any[]) => any,
    K5 extends string, F5 extends (...args: any[]) => any,
  >(
    op1: readonly [F1, K1] | [F1, K1],
    op2: readonly [F2, K2] | [F2, K2],
    op3: readonly [F3, K3] | [F3, K3],
    op4: readonly [F4, K4] | [F4, K4],
    op5: readonly [F5, K5] | [F5, K5],
    ...rest: ((...args: any[]) => any)[]
  ): ComposedPipeline<
    { [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } &
    { [P in K3]: ExtractValue<F3> } & { [P in K4]: ExtractValue<F4> } &
    { [P in K5]: ExtractValue<F5> }
  >;

  function all<
    K1 extends string, F1 extends (...args: any[]) => any,
    K2 extends string, F2 extends (...args: any[]) => any,
    K3 extends string, F3 extends (...args: any[]) => any,
    K4 extends string, F4 extends (...args: any[]) => any,
    K5 extends string, F5 extends (...args: any[]) => any,
    K6 extends string, F6 extends (...args: any[]) => any,
  >(
    op1: readonly [F1, K1] | [F1, K1],
    op2: readonly [F2, K2] | [F2, K2],
    op3: readonly [F3, K3] | [F3, K3],
    op4: readonly [F4, K4] | [F4, K4],
    op5: readonly [F5, K5] | [F5, K5],
    op6: readonly [F6, K6] | [F6, K6],
    ...rest: ((...args: any[]) => any)[]
  ): ComposedPipeline<
    { [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } &
    { [P in K3]: ExtractValue<F3> } & { [P in K4]: ExtractValue<F4> } &
    { [P in K5]: ExtractValue<F5> } & { [P in K6]: ExtractValue<F6> }
  >;

  function all<
    K1 extends string, F1 extends (...args: any[]) => any,
    K2 extends string, F2 extends (...args: any[]) => any,
    K3 extends string, F3 extends (...args: any[]) => any,
    K4 extends string, F4 extends (...args: any[]) => any,
    K5 extends string, F5 extends (...args: any[]) => any,
    K6 extends string, F6 extends (...args: any[]) => any,
    K7 extends string, F7 extends (...args: any[]) => any,
  >(
    op1: readonly [F1, K1] | [F1, K1],
    op2: readonly [F2, K2] | [F2, K2],
    op3: readonly [F3, K3] | [F3, K3],
    op4: readonly [F4, K4] | [F4, K4],
    op5: readonly [F5, K5] | [F5, K5],
    op6: readonly [F6, K6] | [F6, K6],
    op7: readonly [F7, K7] | [F7, K7],
    ...rest: ((...args: any[]) => any)[]
  ): ComposedPipeline<
    { [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } &
    { [P in K3]: ExtractValue<F3> } & { [P in K4]: ExtractValue<F4> } &
    { [P in K5]: ExtractValue<F5> } & { [P in K6]: ExtractValue<F6> } &
    { [P in K7]: ExtractValue<F7> }
  >;

  function all<
    K1 extends string, F1 extends (...args: any[]) => any,
    K2 extends string, F2 extends (...args: any[]) => any,
    K3 extends string, F3 extends (...args: any[]) => any,
    K4 extends string, F4 extends (...args: any[]) => any,
    K5 extends string, F5 extends (...args: any[]) => any,
    K6 extends string, F6 extends (...args: any[]) => any,
    K7 extends string, F7 extends (...args: any[]) => any,
    K8 extends string, F8 extends (...args: any[]) => any,
  >(
    op1: readonly [F1, K1] | [F1, K1],
    op2: readonly [F2, K2] | [F2, K2],
    op3: readonly [F3, K3] | [F3, K3],
    op4: readonly [F4, K4] | [F4, K4],
    op5: readonly [F5, K5] | [F5, K5],
    op6: readonly [F6, K6] | [F6, K6],
    op7: readonly [F7, K7] | [F7, K7],
    op8: readonly [F8, K8] | [F8, K8],
    ...rest: ((...args: any[]) => any)[]
  ): ComposedPipeline<
    { [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } &
    { [P in K3]: ExtractValue<F3> } & { [P in K4]: ExtractValue<F4> } &
    { [P in K5]: ExtractValue<F5> } & { [P in K6]: ExtractValue<F6> } &
    { [P in K7]: ExtractValue<F7> } & { [P in K8]: ExtractValue<F8> }
  >;

  function all<
    K1 extends string, F1 extends (...args: any[]) => any,
    K2 extends string, F2 extends (...args: any[]) => any,
    K3 extends string, F3 extends (...args: any[]) => any,
    K4 extends string, F4 extends (...args: any[]) => any,
    K5 extends string, F5 extends (...args: any[]) => any,
    K6 extends string, F6 extends (...args: any[]) => any,
    K7 extends string, F7 extends (...args: any[]) => any,
    K8 extends string, F8 extends (...args: any[]) => any,
    K9 extends string, F9 extends (...args: any[]) => any,
  >(
    op1: readonly [F1, K1] | [F1, K1],
    op2: readonly [F2, K2] | [F2, K2],
    op3: readonly [F3, K3] | [F3, K3],
    op4: readonly [F4, K4] | [F4, K4],
    op5: readonly [F5, K5] | [F5, K5],
    op6: readonly [F6, K6] | [F6, K6],
    op7: readonly [F7, K7] | [F7, K7],
    op8: readonly [F8, K8] | [F8, K8],
    op9: readonly [F9, K9] | [F9, K9],
    ...rest: ((...args: any[]) => any)[]
  ): ComposedPipeline<
    { [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } &
    { [P in K3]: ExtractValue<F3> } & { [P in K4]: ExtractValue<F4> } &
    { [P in K5]: ExtractValue<F5> } & { [P in K6]: ExtractValue<F6> } &
    { [P in K7]: ExtractValue<F7> } & { [P in K8]: ExtractValue<F8> } &
    { [P in K9]: ExtractValue<F9> }
  >;

  function all<
    K1 extends string, F1 extends (...args: any[]) => any,
    K2 extends string, F2 extends (...args: any[]) => any,
    K3 extends string, F3 extends (...args: any[]) => any,
    K4 extends string, F4 extends (...args: any[]) => any,
    K5 extends string, F5 extends (...args: any[]) => any,
    K6 extends string, F6 extends (...args: any[]) => any,
    K7 extends string, F7 extends (...args: any[]) => any,
    K8 extends string, F8 extends (...args: any[]) => any,
    K9 extends string, F9 extends (...args: any[]) => any,
    K10 extends string, F10 extends (...args: any[]) => any,
  >(
    op1: readonly [F1, K1] | [F1, K1],
    op2: readonly [F2, K2] | [F2, K2],
    op3: readonly [F3, K3] | [F3, K3],
    op4: readonly [F4, K4] | [F4, K4],
    op5: readonly [F5, K5] | [F5, K5],
    op6: readonly [F6, K6] | [F6, K6],
    op7: readonly [F7, K7] | [F7, K7],
    op8: readonly [F8, K8] | [F8, K8],
    op9: readonly [F9, K9] | [F9, K9],
    op10: readonly [F10, K10] | [F10, K10],
    ...rest: ((...args: any[]) => any)[]
  ): ComposedPipeline<
    { [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } &
    { [P in K3]: ExtractValue<F3> } & { [P in K4]: ExtractValue<F4> } &
    { [P in K5]: ExtractValue<F5> } & { [P in K6]: ExtractValue<F6> } &
    { [P in K7]: ExtractValue<F7> } & { [P in K8]: ExtractValue<F8> } &
    { [P in K9]: ExtractValue<F9> } & { [P in K10]: ExtractValue<F10> }
  >;

  function all<
    K1 extends string, F1 extends (...args: any[]) => any,
    K2 extends string, F2 extends (...args: any[]) => any,
    K3 extends string, F3 extends (...args: any[]) => any,
    K4 extends string, F4 extends (...args: any[]) => any,
    K5 extends string, F5 extends (...args: any[]) => any,
    K6 extends string, F6 extends (...args: any[]) => any,
    K7 extends string, F7 extends (...args: any[]) => any,
    K8 extends string, F8 extends (...args: any[]) => any,
    K9 extends string, F9 extends (...args: any[]) => any,
    K10 extends string, F10 extends (...args: any[]) => any,
    K11 extends string, F11 extends (...args: any[]) => any,
  >(
    op1: readonly [F1, K1] | [F1, K1],
    op2: readonly [F2, K2] | [F2, K2],
    op3: readonly [F3, K3] | [F3, K3],
    op4: readonly [F4, K4] | [F4, K4],
    op5: readonly [F5, K5] | [F5, K5],
    op6: readonly [F6, K6] | [F6, K6],
    op7: readonly [F7, K7] | [F7, K7],
    op8: readonly [F8, K8] | [F8, K8],
    op9: readonly [F9, K9] | [F9, K9],
    op10: readonly [F10, K10] | [F10, K10],
    op11: readonly [F11, K11] | [F11, K11],
    ...rest: ((...args: any[]) => any)[]
  ): ComposedPipeline<
    { [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } &
    { [P in K3]: ExtractValue<F3> } & { [P in K4]: ExtractValue<F4> } &
    { [P in K5]: ExtractValue<F5> } & { [P in K6]: ExtractValue<F6> } &
    { [P in K7]: ExtractValue<F7> } & { [P in K8]: ExtractValue<F8> } &
    { [P in K9]: ExtractValue<F9> } & { [P in K10]: ExtractValue<F10> } &
    { [P in K11]: ExtractValue<F11> }
  >;

  function all<
    K1 extends string, F1 extends (...args: any[]) => any,
    K2 extends string, F2 extends (...args: any[]) => any,
    K3 extends string, F3 extends (...args: any[]) => any,
    K4 extends string, F4 extends (...args: any[]) => any,
    K5 extends string, F5 extends (...args: any[]) => any,
    K6 extends string, F6 extends (...args: any[]) => any,
    K7 extends string, F7 extends (...args: any[]) => any,
    K8 extends string, F8 extends (...args: any[]) => any,
    K9 extends string, F9 extends (...args: any[]) => any,
    K10 extends string, F10 extends (...args: any[]) => any,
    K11 extends string, F11 extends (...args: any[]) => any,
    K12 extends string, F12 extends (...args: any[]) => any,
  >(
    op1: readonly [F1, K1] | [F1, K1],
    op2: readonly [F2, K2] | [F2, K2],
    op3: readonly [F3, K3] | [F3, K3],
    op4: readonly [F4, K4] | [F4, K4],
    op5: readonly [F5, K5] | [F5, K5],
    op6: readonly [F6, K6] | [F6, K6],
    op7: readonly [F7, K7] | [F7, K7],
    op8: readonly [F8, K8] | [F8, K8],
    op9: readonly [F9, K9] | [F9, K9],
    op10: readonly [F10, K10] | [F10, K10],
    op11: readonly [F11, K11] | [F11, K11],
    op12: readonly [F12, K12] | [F12, K12],
    ...rest: ((...args: any[]) => any)[]
  ): ComposedPipeline<
    { [P in K1]: ExtractValue<F1> } & { [P in K2]: ExtractValue<F2> } &
    { [P in K3]: ExtractValue<F3> } & { [P in K4]: ExtractValue<F4> } &
    { [P in K5]: ExtractValue<F5> } & { [P in K6]: ExtractValue<F6> } &
    { [P in K7]: ExtractValue<F7> } & { [P in K8]: ExtractValue<F8> } &
    { [P in K9]: ExtractValue<F9> } & { [P in K10]: ExtractValue<F10> } &
    { [P in K11]: ExtractValue<F11> } & { [P in K12]: ExtractValue<F12> }
  >;

  function all(
    ...ops: (readonly [(...args: any[]) => any, string] | [(...args: any[]) => any, string] | ((...args: any[]) => any))[]
  ): (...args: any[]) => Promise<object>;
}

export default composeWith;

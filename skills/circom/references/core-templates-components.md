---
name: core-templates-components
description: Templates and components in circom—definition, instantiation, dot notation, arrays of components, parallel and custom templates.
---

# Templates and Components

**Templates** define parameterized circuits. **Components** are instances of templates. Templates cannot define local functions or nested templates.

## Template and instantiation

```circom
template tempid(param_1, ..., param_n) {
  signal input a;
  signal output b;
  // ...
}

component c = tempid(v1, ..., vn);
```

Parameters must be **known at compile time**. Do not assign to an input signal inside the same template where it is defined.

## Component semantics

- **Dot notation**: access inputs/outputs only, e.g. `c.a <== y*z-1;`, `var x = c.b;`.
- **Lazy instantiation**: the component runs only when all its input signals are assigned. Outputs are usable only after all inputs are set. Order of assignment in code need not match execution order.
- **Immutability**: a component can be declared then assigned once (or in different branches with the same template). All elements of a component array must be the same template (possibly different parameters).

```circom
component comp1 = mult();
component comp2 = mult();
comp2.in[0] <== in[1];
comp2.in[1] <== in[2];
comp1.in[0] <== in[0];
comp1.in[1] <== in[3];
// comp2 is instantiated before comp1
```

## Arrays of components

Size must be known at compile time. Initialize element by element; all elements must be the same template.

```circom
component ands[2];
ands[0] = MultiAND(n1);
ands[1] = MultiAND(n2);
```

## Parallel witness computation

Tag a template for parallel C++ witness generation: `template parallel NameTemplate(...){...}`. Or at call site: `component comp = parallel NameTemplate(...);`. Only affects C++ backend.

## Custom templates (PLONK)

Since 2.0.6, `template custom Example() { ... }` defines a custom gate for snarkjs/PLONK. No constraints or subcomponents inside. Add `pragma custom_templates;` in files that use them. With `extern_c`, the compiler can emit a C method stub for custom gates when using `--c`.

<!--
Source references:
- https://docs.circom.io/circom-language/templates-and-components/
- https://github.com/iden3/circom
-->

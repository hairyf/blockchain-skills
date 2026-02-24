---
name: core-main-component
description: The main component in circom—entry point, public input list, single main rule.
---

# The Main Component

The circuit entry point is the **main** component. It defines the global input and output of the circuit.

## Syntax

```circom
component main {public [signal_list]} = tempid(v1,...,vn);
```

`{public [signal_list]}` is optional. Inputs in the list are **public**; other inputs of the template are **private**. All **outputs** of main are always public and cannot be made private.

## Example

```circom
template A(){
  signal input in1;
  signal input in2;
  signal output out;
  out <== in1 * in2;
}

component main {public [in1]} = A();
```

Here `in1` is public, `in2` is private, `out` is public.

## Rule

Exactly **one** main component must exist in the whole project (including all included files). Otherwise: "Multiple main components in the project structure".

<!--
Source references:
- https://docs.circom.io/circom-language/the-main-component/
- https://github.com/iden3/circom
-->

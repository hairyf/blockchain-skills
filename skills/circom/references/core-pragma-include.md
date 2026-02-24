---
name: core-pragma-include
description: Pragma (version, custom_templates) and include directive; library path with -l.
---

# Pragma and Include

## Version pragma

Every `.circom` file should start with:

```circom
pragma circom xx.yy.zz;
```

This ensures compatibility with the compiler version. Omitting it triggers a warning.

## Custom templates pragma

If the file (or any included file) declares **custom templates**, add after the version pragma:

```circom
pragma custom_templates;
```

Otherwise the compiler errors and indicates which files need it.

## Include

Pull in other circuits with `include` (default extension `.circom`):

```circom
include "montgomery.circom";
include "bitify.circom";
```

Since 2.0.8, use **`-l <directory>`** to add library search paths:

```bash
circom circuit.circom -l ./lib -l ./node_modules/circomlib/circuits
```

<!--
Source references:
- https://docs.circom.io/circom-language/pragma/
- https://docs.circom.io/circom-language/include/
- https://github.com/iden3/circom
-->

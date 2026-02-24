---
name: Mythril custom detection modules
description: Adding custom analysis modules and loading them with --custom-modules-directory.
---

# Custom Detection Modules

You can add **custom detection modules** and load them with `--custom-modules-directory`.

## Interface

All modules inherit from `DetectionModule` and implement:

- **name**: Human-readable title
- **swc_id**: e.g. `"SWC-XXX"`
- **description**: What the module detects
- **entry_point**: `EntryPoint.CALLBACK` (prefer) or `EntryPoint.POST` (slower, searches full statespace)
- **pre_hooks** / **post_hooks**: Optional list of EVM opcode names to hook (e.g. `["CALL", "DELEGATECALL"]`)
- **execute(target)**: Receives a `GlobalState` (callback) or statespace (post); returns `Optional[List[Issue]]`

## Example (suicide-style module)

Create a class in a module under your package or a directory you will pass to Mythril:

```python
from mythril.analysis.module.base import DetectionModule, EntryPoint
from mythril.analysis.report import Issue
from mythril.laser.ethereum.state.global_state import GlobalState

class detector(DetectionModule):  # instance named "detector" is required
    name = "My Custom Check"
    swc_id = "SWC-000"
    description = "Detects my custom pattern"
    entry_point = EntryPoint.CALLBACK
    pre_hooks = ["SELFDESTRUCT"]

    def _analyze_state(self, state: GlobalState):
        # Build and return list of Issue() if found
        return []
```

Reference implementation: [suicide module](https://github.com/ConsenSys/mythril/blob/develop/mythril/analysis/module/modules/suicide.py).

## Loading custom modules

```bash
myth analyze contract.sol --custom-modules-directory /path/to/my_modules
```

Mythril will look for modules in that directory (Python package structure); each module must expose a `detector` instance of a `DetectionModule` subclass.

<!--
Source references:
- sources/mythril/docs/source/create-module.rst
- sources/mythril/mythril/analysis/module/base.py
- sources/mythril/mythril/analysis/module/loader.py (register_module)
- sources/mythril/mythril/analysis/module/modules/suicide.py
-->

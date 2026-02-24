---
name: layerzero-core-config-and-versions
description: UA config — setConfig, setSendVersion, setReceiveVersion, getConfig
metadata:
  author: hairy
---

# UA config and library versions

UAs that need to configure the messaging library or switch versions implement `ILayerZeroUserApplicationConfig` and delegate to the Endpoint. The Endpoint forwards config to the underlying messaging library by version.

## Config interface

```solidity
interface ILayerZeroUserApplicationConfig {
    function setConfig(uint16 _version, uint16 _chainId, uint _configType, bytes calldata _config) external;
    function setSendVersion(uint16 _version) external;
    function setReceiveVersion(uint16 _version) external;
    function forceResumeReceive(uint16 _srcChainId, bytes calldata _srcAddress) external;
}
```

## setConfig

Used to set oracle, relayer, block confirmations, or other library-specific options per chain:

```solidity
function setConfig(
    uint16 _version,
    uint16 _chainId,
    uint _configType,
    bytes calldata _config
) external override {
    endpoint.setConfig(
        endpoint.getSendVersion(address(this)),  // or a specific version
        _chainId,
        _configType,
        _config
    );
}
```

- **_version**: Messaging library version (use `endpoint.getSendVersion(address(this))` to match current).
- **_chainId**: LayerZero chain ID this config applies to.
- **_configType**: Library-defined type (e.g. oracle/relayer/confirmations).
- **_config**: Encoded config; format is library-specific.

## setSendVersion / setReceiveVersion

Switch which library version the UA uses for send and receive. Migration order: set send version first, wait for in-flight messages to clear, then set receive version.

```solidity
function setSendVersion(uint16 version) external override {
    endpoint.setSendVersion(version);
}
function setReceiveVersion(uint16 version) external override {
    endpoint.setReceiveVersion(version);
}
```

## forceResumeReceive

When a receive reverted and the payload is stored (blocking mode), the UA can clear the stored payload for that (srcChainId, srcAddress) and resume with `forceResumeReceive(_srcChainId, _srcAddress)`. Only the UA (dstAddress) may call it.

## Key points

- Delegate config to the Endpoint; the UA does not call the library directly.
- Use the same version for setConfig as the UA’s current send/receive version when configuring that path.
- forceResumeReceive is for clearing a stored payload so the next message can be delivered; consider retry flow before forcing.

<!--
Source references:
- sources/layerzero/contracts/interfaces/ILayerZeroUserApplicationConfig.sol
- sources/layerzero/contracts/Endpoint.sol
- sources/layerzero/contracts/mocks/PingPong.sol, OmniCounter.sol
-->

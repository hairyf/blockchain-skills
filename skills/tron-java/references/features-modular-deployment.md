---
name: java-tron modular deployment
description: Launch via distribution script after modular build; JVM options.
---

# Modular Deployment (Post-modularization)

After modularization, prefer launching via the distribution script instead of `java -jar FullNode.jar` (the latter may be deprecated).

## Build and Unzip

```bash
git clone git@github.com:tronprotocol/java-tron.git
./gradlew build
# Output: java-tron-1.0.0.zip in build/distributions
cd build/distributions
unzip -o java-tron-1.0.0.zip
# Result: bin/ (scripts), lib/ (jars)
```

## Startup

Use OS-appropriate script (`*.bat` on Windows; on Linux):

```bash
# default
java-tron-1.0.0/bin/FullNode

# with config (demos in framework/build/resources)
java-tron-1.0.0/bin/FullNode -c config.conf

# SR mode
java-tron-1.0.0/bin/FullNode -c config.conf -w
```

## JVM Options

Edit `bin/java-tron.vmoptions`, e.g.:

```
-XX:+UseConcMarkSweepGC
-XX:+PrintGCDetails
-Xloggc:./gc.log
-XX:+PrintGCDateStamps
-XX:+CMSParallelRemarkEnabled
-XX:ReservedCodeCacheSize=256m
-XX:+CMSScavengeBeforeRemark
```

## Key Points

- Script-based launch is the recommended path for modular deployments.
- Config and demo configs live under `framework/build/resources` or the unpacked distribution.

<!--
Source references:
- https://github.com/tronprotocol/java-tron (docs/modular-deployment-en.md)
-->

Jasmine Rhino Reporters
=======================

Reporters for the Jasmine testing framework for use
when running Javascript via Rhino.

Rhino does not provide a DOM, so output is via the Java
standard out interface.

Dependencies
============

Runtime
-------

* rhino

Testing
-------

* ruby
* bundler

Tests
=====

Setup
-----

```shell
bundle
```

Run
---

```shell
java -jar path/to/rhino/js.jar -require -f spec/runner.js
```


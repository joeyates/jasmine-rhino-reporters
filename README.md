Jasmine Rhino Reporters  [![Build Status](https://secure.travis-ci.org/joeyates/jasmine-rhino-reporters)][Continuous Integration]
=======================

Reporters for the Jasmine testing framework for use
when running Javascript via Rhino.

Rhino does not provide a DOM, so output is via the Java
standard out interface.

  * [Source Code]
  * [Continuous Integration]

[Source Code]: https://github.com/joeyates/metar-parser "Source code at GitHub"
[Continuous Integration]: http://travis-ci.org/joeyates/metar-parser "Build status by Travis-CI"

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


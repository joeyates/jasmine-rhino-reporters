(function() {
  if(!jasmine) {
    throw new Exception("jasmine library does not exist in global namespace!");
  }
  if(!jasmine.rhino) {
    jasmine.rhino = {};
  }

  /**
   * Jasmine reporter to be used when running under Rhino.
   * It outputs spec results via Rhino's print() method.
   *
   * Usage:
   *
   * jasmine.getEnv().addReporter(new jasmine.RhinoPrintReporter());
   * jasmine.getEnv().execute();
   */
  var ProgressReporter = function() {
    this.reportRunnerStarting = function(runner) {
      reset();
      this.start_time = new Date().getTime();
    };

    this.reportRunnerResults = function(runner) {
      this.end_time = new Date().getTime();
      print(""); // Newline after spec results
      print("");
      print(this.examples + " examples in " + runTime() + "s");
      if(this.fails.length > 0)
        printSpecFailures();
    };

    this.reportSpecResults = function(spec) {
      this.examples++;
      var items = spec.results().getItems();
      var fails = [];
      for(i in items) {
        var item = items[i];
        if(item.passed()) {
          java.lang.System.out.print(".");
        }
        else {
          fails.push(item);
          java.lang.System.out.print("F");
        }
      }
      if(fails.length == 0) {
        this.passed++;
      } else {
        var spec_failures = {
          fails: fails,
          spec:  spec
        };
        this.fails.push(spec_failures);
      }
    };

    // private methods

    var self = this;

    var reset = function() {
      self.start_time = null;
      self.end_time   = null;
      self.examples   = 0;
      self.passed     = 0;
      self.fails      = [];
    };

    var fullName = function(spec) {
      var parts = [];
      var suite = spec.suite;
      while(suite) {
        parts.unshift(suite.description);
        suite = suite.parentSuite;
      }
      parts.push(spec.description);
      return parts;
    };

    var printSpecFailures = function() {
      print(self.fails.length + " failures:");
      for(var i in self.fails) {
        var spec = self.fails[i].spec;
        print(fullName(spec).join(" "));
        var items = spec.results().getItems();
        for(var j in items) {
          var item = items[j];
          if(!item.passed())
            print("  " + item.message);
        }
      }
    };

    var runTime = function() {
      return (self.end_time - self.start_time) / 1000.0;
    };

    reset();
  };

  // export public
  jasmine.rhino.ProgressReporter = ProgressReporter;
})();


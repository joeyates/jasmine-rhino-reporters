function mockItem(item) {
  return {
    passed: function() {return item[0];},
    message: item[1]
  };
}

function mockSpecs(description, items) {
  var mockItems = [];
  for(var i in items)
    mockItems.push(mockItem(items[i]));
  var results = {
    getItems: function() {return mockItems;}
  };
  return {
    results: function() {return results;},
    description: description
  };
}

function startOutputCapture(spec) {
  spec.output = new java.io.ByteArrayOutputStream();
  spec.out    = new java.io.PrintStream(spec.output);
  spec.originalOut = java.lang.System.out;
  java.lang.System.setOut(spec.out);
}

function stopOutputCapture(spec) {
  java.lang.System.setOut(spec.originalOut);
}

describe("ProgressReporter", function() {
  var pr;

  beforeEach(function() {
    startOutputCapture(this);
    pr = new jasmine.rhino.ProgressReporter();
  });

  afterEach(function() {
    stopOutputCapture(this);
  });

  describe("initial", function() {
    it("should reset attributes", function() {
      expect(pr.start_time).toEqual(null);
      expect(pr.end_time).toEqual(null);
      expect(pr.examples).toEqual(0);
      expect(pr.passed).toEqual(0);
      expect(pr.fails.length).toEqual(0);
    });
  });

  describe("reportRunnerStarting", function() {
    it("should save the start time", function() {
      pr.reportRunnerStarting(null);

      expect(pr.start_time).not.toEqual(null);
    });
  });

  describe("reportRunnerResults", function() {
    beforeEach(function() {
      pr.reportRunnerStarting(null);
    });

    it("should save the end time", function() {
      pr.reportRunnerResults(null);

      expect(pr.end_time).not.toEqual(null);
    });

    it("should list failures", function() {
      items = [[true, "passing expectation message"], [false, "failing expectation message"]]
      pr.reportSpecResults(mockSpecs("the spec description", items));
      pr.reportRunnerResults(null);

      expect("" + this.output.toString()).toContain("the spec description\n");
      expect("" + this.output.toString()).toContain("  failing expectation message\n");
      expect("" + this.output.toString()).not.toContain("  passing expectation message\n");
    });
  });

  describe("reportSpecResults", function() {
    it("should count specs", function() {
      items = [[true, ""], [true, ""], [true, ""], [false, ""], [false, ""]]
      pr.reportSpecResults(mockSpecs("", items));

      expect("" + this.output.toString()).toEqual("...FF");
    });
  });
});


load("lib/jasmine.rhino.timer_patch.js");
load("vendor/bundle/gems/jasmine-core-1.2.0/lib/jasmine-core/jasmine.js");
load("lib/jasmine.rhino.progress_reporter.js");
load("spec/progress_reporter_spec.js")
jasmine.getEnv().execute();

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

var runner = jasmine.getEnv().currentRunner();
var specs  = 0;
var errors = [];
for(var i in runner.specs()) {
  specs++;
  var spec = runner.specs()[i];
  var items = spec.results().getItems();
  var spec_errors = [];
  for(var j in items) {
    var item = items[j];
    if(!item.passed())
      spec_errors.push(item.message);
    if(spec_errors.length > 0)
      errors.push({title: fullName(spec).join(" "), errors: spec_errors});
  }
}

print(specs + " specs, " + errors.length + " errors");
for(var i in errors) {
  var error = errors[i];
  print(error.title);
  for(j in error.errors)
    print("  " + error.errors[j]);
}


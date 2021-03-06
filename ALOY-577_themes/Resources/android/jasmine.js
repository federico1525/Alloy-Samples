var isCommonJS = "undefined" == typeof window || "undefined" != typeof Titanium;

var jasmine = {};

isCommonJS && (exports.jasmine = jasmine);

jasmine.unimplementedMethod_ = function() {
    throw new Error("unimplemented method");
};

jasmine.undefined = jasmine.___undefined___;

jasmine.VERBOSE = false;

jasmine.DEFAULT_UPDATE_INTERVAL = 250;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5e3;

jasmine.getGlobal = function() {
    function getGlobal() {
        return this;
    }
    return getGlobal();
};

jasmine.bindOriginal_ = function(base, name) {
    var original = base[name];
    return original.apply ? function() {
        return original.apply(base, arguments);
    } : jasmine.getGlobal()[name];
};

jasmine.setTimeout = jasmine.bindOriginal_(jasmine.getGlobal(), "setTimeout");

jasmine.clearTimeout = jasmine.bindOriginal_(jasmine.getGlobal(), "clearTimeout");

jasmine.setInterval = jasmine.bindOriginal_(jasmine.getGlobal(), "setInterval");

jasmine.clearInterval = jasmine.bindOriginal_(jasmine.getGlobal(), "clearInterval");

jasmine.MessageResult = function(values) {
    this.type = "log";
    this.values = values;
    this.trace = new Error();
};

jasmine.MessageResult.prototype.toString = function() {
    var text = "";
    for (var i = 0; this.values.length > i; i++) {
        i > 0 && (text += " ");
        text += jasmine.isString_(this.values[i]) ? this.values[i] : jasmine.pp(this.values[i]);
    }
    return text;
};

jasmine.ExpectationResult = function(params) {
    this.type = "expect";
    this.matcherName = params.matcherName;
    this.passed_ = params.passed;
    this.expected = params.expected;
    this.actual = params.actual;
    this.message = this.passed_ ? "Passed." : params.message;
    var trace = params.trace || new Error(this.message);
    this.trace = this.passed_ ? "" : trace;
};

jasmine.ExpectationResult.prototype.toString = function() {
    return this.message;
};

jasmine.ExpectationResult.prototype.passed = function() {
    return this.passed_;
};

jasmine.getEnv = function() {
    var env = jasmine.currentEnv_ = jasmine.currentEnv_ || new jasmine.Env();
    return env;
};

jasmine.isArray_ = function(value) {
    return jasmine.isA_("Array", value);
};

jasmine.isString_ = function(value) {
    return jasmine.isA_("String", value);
};

jasmine.isNumber_ = function(value) {
    return jasmine.isA_("Number", value);
};

jasmine.isA_ = function(typeName, value) {
    return Object.prototype.toString.apply(value) === "[object " + typeName + "]";
};

jasmine.pp = function(value) {
    var stringPrettyPrinter = new jasmine.StringPrettyPrinter();
    stringPrettyPrinter.format(value);
    return stringPrettyPrinter.string;
};

jasmine.isDomNode = function(obj) {
    return obj.nodeType > 0;
};

jasmine.any = function(clazz) {
    return new jasmine.Matchers.Any(clazz);
};

jasmine.objectContaining = function(sample) {
    return new jasmine.Matchers.ObjectContaining(sample);
};

jasmine.Spy = function(name) {
    this.identity = name || "unknown";
    this.isSpy = true;
    this.plan = function() {};
    this.mostRecentCall = {};
    this.argsForCall = [];
    this.calls = [];
};

jasmine.Spy.prototype.andCallThrough = function() {
    this.plan = this.originalValue;
    return this;
};

jasmine.Spy.prototype.andReturn = function(value) {
    this.plan = function() {
        return value;
    };
    return this;
};

jasmine.Spy.prototype.andThrow = function(exceptionMsg) {
    this.plan = function() {
        throw exceptionMsg;
    };
    return this;
};

jasmine.Spy.prototype.andCallFake = function(fakeFunc) {
    this.plan = fakeFunc;
    return this;
};

jasmine.Spy.prototype.reset = function() {
    this.wasCalled = false;
    this.callCount = 0;
    this.argsForCall = [];
    this.calls = [];
    this.mostRecentCall = {};
};

jasmine.createSpy = function(name) {
    var spyObj = function() {
        spyObj.wasCalled = true;
        spyObj.callCount++;
        var args = jasmine.util.argsToArray(arguments);
        spyObj.mostRecentCall.object = this;
        spyObj.mostRecentCall.args = args;
        spyObj.argsForCall.push(args);
        spyObj.calls.push({
            object: this,
            args: args
        });
        return spyObj.plan.apply(this, arguments);
    };
    var spy = new jasmine.Spy(name);
    for (var prop in spy) spyObj[prop] = spy[prop];
    spyObj.reset();
    return spyObj;
};

jasmine.isSpy = function(putativeSpy) {
    return putativeSpy && putativeSpy.isSpy;
};

jasmine.createSpyObj = function(baseName, methodNames) {
    if (!jasmine.isArray_(methodNames) || 0 === methodNames.length) throw new Error("createSpyObj requires a non-empty array of method names to create spies for");
    var obj = {};
    for (var i = 0; methodNames.length > i; i++) obj[methodNames[i]] = jasmine.createSpy(baseName + "." + methodNames[i]);
    return obj;
};

jasmine.log = function() {
    var spec = jasmine.getEnv().currentSpec;
    spec.log.apply(spec, arguments);
};

var spyOn = function(obj, methodName) {
    return jasmine.getEnv().currentSpec.spyOn(obj, methodName);
};

isCommonJS && (exports.spyOn = spyOn);

var it = function(desc, func) {
    return jasmine.getEnv().it(desc, func);
};

isCommonJS && (exports.it = it);

var xit = function(desc, func) {
    return jasmine.getEnv().xit(desc, func);
};

isCommonJS && (exports.xit = xit);

var expect = function(actual) {
    return jasmine.getEnv().currentSpec.expect(actual);
};

isCommonJS && (exports.expect = expect);

var runs = function(func) {
    jasmine.getEnv().currentSpec.runs(func);
};

isCommonJS && (exports.runs = runs);

var waits = function(timeout) {
    jasmine.getEnv().currentSpec.waits(timeout);
};

isCommonJS && (exports.waits = waits);

var waitsFor = function() {
    jasmine.getEnv().currentSpec.waitsFor.apply(jasmine.getEnv().currentSpec, arguments);
};

isCommonJS && (exports.waitsFor = waitsFor);

var beforeEach = function(beforeEachFunction) {
    jasmine.getEnv().beforeEach(beforeEachFunction);
};

isCommonJS && (exports.beforeEach = beforeEach);

var afterEach = function(afterEachFunction) {
    jasmine.getEnv().afterEach(afterEachFunction);
};

isCommonJS && (exports.afterEach = afterEach);

var describe = function(description, specDefinitions) {
    return jasmine.getEnv().describe(description, specDefinitions);
};

isCommonJS && (exports.describe = describe);

var xdescribe = function(description, specDefinitions) {
    return jasmine.getEnv().xdescribe(description, specDefinitions);
};

isCommonJS && (exports.xdescribe = xdescribe);

jasmine.XmlHttpRequest = "undefined" == typeof XMLHttpRequest ? function() {
    function tryIt(f) {
        try {
            return f();
        } catch (e) {}
        return null;
    }
    var xhr = tryIt(function() {
        return new ActiveXObject("Msxml2.XMLHTTP.6.0");
    }) || tryIt(function() {
        return new ActiveXObject("Msxml2.XMLHTTP.3.0");
    }) || tryIt(function() {
        return new ActiveXObject("Msxml2.XMLHTTP");
    }) || tryIt(function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
    });
    if (!xhr) throw new Error("This browser does not support XMLHttpRequest.");
    return xhr;
} : XMLHttpRequest;

jasmine.util = {};

jasmine.util.inherit = function(childClass, parentClass) {
    var subclass = function() {};
    subclass.prototype = parentClass.prototype;
    childClass.prototype = new subclass();
};

jasmine.util.formatException = function(e) {
    var lineNumber;
    e.line ? lineNumber = e.line : e.lineNumber && (lineNumber = e.lineNumber);
    var file;
    e.sourceURL ? file = e.sourceURL : e.fileName && (file = e.fileName);
    var message = e.name && e.message ? e.name + ": " + e.message : e.toString();
    file && lineNumber && (message += " in " + file + " (line " + lineNumber + ")");
    return message;
};

jasmine.util.htmlEscape = function(str) {
    if (!str) return str;
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

jasmine.util.argsToArray = function(args) {
    var arrayOfArgs = [];
    for (var i = 0; args.length > i; i++) arrayOfArgs.push(args[i]);
    return arrayOfArgs;
};

jasmine.util.extend = function(destination, source) {
    for (var property in source) destination[property] = source[property];
    return destination;
};

jasmine.Env = function() {
    this.currentSpec = null;
    this.currentSuite = null;
    this.currentRunner_ = new jasmine.Runner(this);
    this.reporter = new jasmine.MultiReporter();
    this.updateInterval = jasmine.DEFAULT_UPDATE_INTERVAL;
    this.defaultTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    this.lastUpdate = 0;
    this.specFilter = function() {
        return true;
    };
    this.nextSpecId_ = 0;
    this.nextSuiteId_ = 0;
    this.equalityTesters_ = [];
    this.matchersClass = function() {
        jasmine.Matchers.apply(this, arguments);
    };
    jasmine.util.inherit(this.matchersClass, jasmine.Matchers);
    jasmine.Matchers.wrapInto_(jasmine.Matchers.prototype, this.matchersClass);
};

jasmine.Env.prototype.setTimeout = jasmine.setTimeout;

jasmine.Env.prototype.clearTimeout = jasmine.clearTimeout;

jasmine.Env.prototype.setInterval = jasmine.setInterval;

jasmine.Env.prototype.clearInterval = jasmine.clearInterval;

jasmine.Env.prototype.version = function() {
    if (jasmine.version_) return jasmine.version_;
    throw new Error("Version not set");
};

jasmine.Env.prototype.versionString = function() {
    if (!jasmine.version_) return "version unknown";
    var version = this.version();
    var versionString = version.major + "." + version.minor + "." + version.build;
    version.release_candidate && (versionString += ".rc" + version.release_candidate);
    versionString += " revision " + version.revision;
    return versionString;
};

jasmine.Env.prototype.nextSpecId = function() {
    return this.nextSpecId_++;
};

jasmine.Env.prototype.nextSuiteId = function() {
    return this.nextSuiteId_++;
};

jasmine.Env.prototype.addReporter = function(reporter) {
    this.reporter.addReporter(reporter);
};

jasmine.Env.prototype.execute = function() {
    this.currentRunner_.execute();
};

jasmine.Env.prototype.describe = function(description, specDefinitions) {
    var suite = new jasmine.Suite(this, description, specDefinitions, this.currentSuite);
    var parentSuite = this.currentSuite;
    parentSuite ? parentSuite.add(suite) : this.currentRunner_.add(suite);
    this.currentSuite = suite;
    var declarationError = null;
    try {
        specDefinitions.call(suite);
    } catch (e) {
        declarationError = e;
    }
    declarationError && this.it("encountered a declaration exception", function() {
        throw declarationError;
    });
    this.currentSuite = parentSuite;
    return suite;
};

jasmine.Env.prototype.beforeEach = function(beforeEachFunction) {
    this.currentSuite ? this.currentSuite.beforeEach(beforeEachFunction) : this.currentRunner_.beforeEach(beforeEachFunction);
};

jasmine.Env.prototype.currentRunner = function() {
    return this.currentRunner_;
};

jasmine.Env.prototype.afterEach = function(afterEachFunction) {
    this.currentSuite ? this.currentSuite.afterEach(afterEachFunction) : this.currentRunner_.afterEach(afterEachFunction);
};

jasmine.Env.prototype.xdescribe = function() {
    return {
        execute: function() {}
    };
};

jasmine.Env.prototype.it = function(description, func) {
    var spec = new jasmine.Spec(this, this.currentSuite, description);
    this.currentSuite.add(spec);
    this.currentSpec = spec;
    func && spec.runs(func);
    return spec;
};

jasmine.Env.prototype.xit = function() {
    return {
        id: this.nextSpecId(),
        runs: function() {}
    };
};

jasmine.Env.prototype.compareObjects_ = function(a, b, mismatchKeys, mismatchValues) {
    if (a.__Jasmine_been_here_before__ === b && b.__Jasmine_been_here_before__ === a) return true;
    a.__Jasmine_been_here_before__ = b;
    b.__Jasmine_been_here_before__ = a;
    var hasKey = function(obj, keyName) {
        return null !== obj && obj[keyName] !== jasmine.undefined;
    };
    for (var property in b) !hasKey(a, property) && hasKey(b, property) && mismatchKeys.push("expected has key '" + property + "', but missing from actual.");
    for (property in a) !hasKey(b, property) && hasKey(a, property) && mismatchKeys.push("expected missing key '" + property + "', but present in actual.");
    for (property in b) {
        if ("__Jasmine_been_here_before__" == property) continue;
        this.equals_(a[property], b[property], mismatchKeys, mismatchValues) || mismatchValues.push("'" + property + "' was '" + (b[property] ? jasmine.util.htmlEscape(b[property].toString()) : b[property]) + "' in expected, but was '" + (a[property] ? jasmine.util.htmlEscape(a[property].toString()) : a[property]) + "' in actual.");
    }
    jasmine.isArray_(a) && jasmine.isArray_(b) && a.length != b.length && mismatchValues.push("arrays were not the same length");
    delete a.__Jasmine_been_here_before__;
    delete b.__Jasmine_been_here_before__;
    return 0 === mismatchKeys.length && 0 === mismatchValues.length;
};

jasmine.Env.prototype.equals_ = function(a, b, mismatchKeys, mismatchValues) {
    mismatchKeys = mismatchKeys || [];
    mismatchValues = mismatchValues || [];
    for (var i = 0; this.equalityTesters_.length > i; i++) {
        var equalityTester = this.equalityTesters_[i];
        var result = equalityTester(a, b, this, mismatchKeys, mismatchValues);
        if (result !== jasmine.undefined) return result;
    }
    if (a === b) return true;
    if (a === jasmine.undefined || null === a || b === jasmine.undefined || null === b) return a == jasmine.undefined && b == jasmine.undefined;
    if (jasmine.isDomNode(a) && jasmine.isDomNode(b)) return a === b;
    if (a instanceof Date && b instanceof Date) return a.getTime() == b.getTime();
    if (a.jasmineMatches) return a.jasmineMatches(b);
    if (b.jasmineMatches) return b.jasmineMatches(a);
    if (a instanceof jasmine.Matchers.ObjectContaining) return a.matches(b);
    if (b instanceof jasmine.Matchers.ObjectContaining) return b.matches(a);
    if (jasmine.isString_(a) && jasmine.isString_(b)) return a == b;
    if (jasmine.isNumber_(a) && jasmine.isNumber_(b)) return a == b;
    if ("object" == typeof a && "object" == typeof b) return this.compareObjects_(a, b, mismatchKeys, mismatchValues);
    return a === b;
};

jasmine.Env.prototype.contains_ = function(haystack, needle) {
    if (jasmine.isArray_(haystack)) {
        for (var i = 0; haystack.length > i; i++) if (this.equals_(haystack[i], needle)) return true;
        return false;
    }
    return haystack.indexOf(needle) >= 0;
};

jasmine.Env.prototype.addEqualityTester = function(equalityTester) {
    this.equalityTesters_.push(equalityTester);
};

jasmine.Reporter = function() {};

jasmine.Reporter.prototype.reportRunnerStarting = function() {};

jasmine.Reporter.prototype.reportRunnerResults = function() {};

jasmine.Reporter.prototype.reportSuiteResults = function() {};

jasmine.Reporter.prototype.reportSpecStarting = function() {};

jasmine.Reporter.prototype.reportSpecResults = function() {};

jasmine.Reporter.prototype.log = function() {};

jasmine.Block = function(env, func, spec) {
    this.env = env;
    this.func = func;
    this.spec = spec;
};

jasmine.Block.prototype.execute = function(onComplete) {
    try {
        this.func.apply(this.spec);
    } catch (e) {
        this.spec.fail(e);
    }
    onComplete();
};

jasmine.JsApiReporter = function() {
    this.started = false;
    this.finished = false;
    this.suites_ = [];
    this.results_ = {};
};

jasmine.JsApiReporter.prototype.reportRunnerStarting = function(runner) {
    this.started = true;
    var suites = runner.topLevelSuites();
    for (var i = 0; suites.length > i; i++) {
        var suite = suites[i];
        this.suites_.push(this.summarize_(suite));
    }
};

jasmine.JsApiReporter.prototype.suites = function() {
    return this.suites_;
};

jasmine.JsApiReporter.prototype.summarize_ = function(suiteOrSpec) {
    var isSuite = suiteOrSpec instanceof jasmine.Suite;
    var summary = {
        id: suiteOrSpec.id,
        name: suiteOrSpec.description,
        type: isSuite ? "suite" : "spec",
        children: []
    };
    if (isSuite) {
        var children = suiteOrSpec.children();
        for (var i = 0; children.length > i; i++) summary.children.push(this.summarize_(children[i]));
    }
    return summary;
};

jasmine.JsApiReporter.prototype.results = function() {
    return this.results_;
};

jasmine.JsApiReporter.prototype.resultsForSpec = function(specId) {
    return this.results_[specId];
};

jasmine.JsApiReporter.prototype.reportRunnerResults = function() {
    this.finished = true;
};

jasmine.JsApiReporter.prototype.reportSuiteResults = function() {};

jasmine.JsApiReporter.prototype.reportSpecResults = function(spec) {
    this.results_[spec.id] = {
        messages: spec.results().getItems(),
        result: spec.results().failedCount > 0 ? "failed" : "passed"
    };
};

jasmine.JsApiReporter.prototype.log = function() {};

jasmine.JsApiReporter.prototype.resultsForSpecs = function(specIds) {
    var results = {};
    for (var i = 0; specIds.length > i; i++) {
        var specId = specIds[i];
        results[specId] = this.summarizeResult_(this.results_[specId]);
    }
    return results;
};

jasmine.JsApiReporter.prototype.summarizeResult_ = function(result) {
    var summaryMessages = [];
    var messagesLength = result.messages.length;
    for (var messageIndex = 0; messagesLength > messageIndex; messageIndex++) {
        var resultMessage = result.messages[messageIndex];
        summaryMessages.push({
            text: "log" == resultMessage.type ? resultMessage.toString() : jasmine.undefined,
            passed: resultMessage.passed ? resultMessage.passed() : true,
            type: resultMessage.type,
            message: resultMessage.message,
            trace: {
                stack: resultMessage.passed && !resultMessage.passed() ? resultMessage.trace.stack : jasmine.undefined
            }
        });
    }
    return {
        result: result.result,
        messages: summaryMessages
    };
};

jasmine.Matchers = function(env, actual, spec, opt_isNot) {
    this.env = env;
    this.actual = actual;
    this.spec = spec;
    this.isNot = opt_isNot || false;
    this.reportWasCalled_ = false;
};

jasmine.Matchers.pp = function() {
    throw new Error("jasmine.Matchers.pp() is no longer supported, please use jasmine.pp() instead!");
};

jasmine.Matchers.prototype.report = function() {
    throw new Error("As of jasmine 0.11, custom matchers must be implemented differently -- please see jasmine docs");
};

jasmine.Matchers.wrapInto_ = function(prototype, matchersClass) {
    for (var methodName in prototype) {
        if ("report" == methodName) continue;
        var orig = prototype[methodName];
        matchersClass.prototype[methodName] = jasmine.Matchers.matcherFn_(methodName, orig);
    }
};

jasmine.Matchers.matcherFn_ = function(matcherName, matcherFunction) {
    return function() {
        var matcherArgs = jasmine.util.argsToArray(arguments);
        var result = matcherFunction.apply(this, arguments);
        this.isNot && (result = !result);
        if (this.reportWasCalled_) return result;
        var message;
        if (!result) if (this.message) {
            message = this.message.apply(this, arguments);
            jasmine.isArray_(message) && (message = message[this.isNot ? 1 : 0]);
        } else {
            var englishyPredicate = matcherName.replace(/[A-Z]/g, function(s) {
                return " " + s.toLowerCase();
            });
            message = "Expected " + jasmine.pp(this.actual) + (this.isNot ? " not " : " ") + englishyPredicate;
            if (matcherArgs.length > 0) for (var i = 0; matcherArgs.length > i; i++) {
                i > 0 && (message += ",");
                message += " " + jasmine.pp(matcherArgs[i]);
            }
            message += ".";
        }
        var expectationResult = new jasmine.ExpectationResult({
            matcherName: matcherName,
            passed: result,
            expected: matcherArgs.length > 1 ? matcherArgs : matcherArgs[0],
            actual: this.actual,
            message: message
        });
        this.spec.addMatcherResult(expectationResult);
        return jasmine.undefined;
    };
};

jasmine.Matchers.prototype.toBe = function(expected) {
    return this.actual === expected;
};

jasmine.Matchers.prototype.toNotBe = function(expected) {
    return this.actual !== expected;
};

jasmine.Matchers.prototype.toEqual = function(expected) {
    return this.env.equals_(this.actual, expected);
};

jasmine.Matchers.prototype.toNotEqual = function(expected) {
    return !this.env.equals_(this.actual, expected);
};

jasmine.Matchers.prototype.toMatch = function(expected) {
    return new RegExp(expected).test(this.actual);
};

jasmine.Matchers.prototype.toNotMatch = function(expected) {
    return !new RegExp(expected).test(this.actual);
};

jasmine.Matchers.prototype.toBeDefined = function() {
    return this.actual !== jasmine.undefined;
};

jasmine.Matchers.prototype.toBeUndefined = function() {
    return this.actual === jasmine.undefined;
};

jasmine.Matchers.prototype.toBeNull = function() {
    return null === this.actual;
};

jasmine.Matchers.prototype.toBeTruthy = function() {
    return !!this.actual;
};

jasmine.Matchers.prototype.toBeFalsy = function() {
    return !this.actual;
};

jasmine.Matchers.prototype.toHaveBeenCalled = function() {
    if (arguments.length > 0) throw new Error("toHaveBeenCalled does not take arguments, use toHaveBeenCalledWith");
    if (!jasmine.isSpy(this.actual)) throw new Error("Expected a spy, but got " + jasmine.pp(this.actual) + ".");
    this.message = function() {
        return [ "Expected spy " + this.actual.identity + " to have been called.", "Expected spy " + this.actual.identity + " not to have been called." ];
    };
    return this.actual.wasCalled;
};

jasmine.Matchers.prototype.wasCalled = jasmine.Matchers.prototype.toHaveBeenCalled;

jasmine.Matchers.prototype.wasNotCalled = function() {
    if (arguments.length > 0) throw new Error("wasNotCalled does not take arguments");
    if (!jasmine.isSpy(this.actual)) throw new Error("Expected a spy, but got " + jasmine.pp(this.actual) + ".");
    this.message = function() {
        return [ "Expected spy " + this.actual.identity + " to not have been called.", "Expected spy " + this.actual.identity + " to have been called." ];
    };
    return !this.actual.wasCalled;
};

jasmine.Matchers.prototype.toHaveBeenCalledWith = function() {
    var expectedArgs = jasmine.util.argsToArray(arguments);
    if (!jasmine.isSpy(this.actual)) throw new Error("Expected a spy, but got " + jasmine.pp(this.actual) + ".");
    this.message = function() {
        return 0 === this.actual.callCount ? [ "Expected spy " + this.actual.identity + " to have been called with " + jasmine.pp(expectedArgs) + " but it was never called.", "Expected spy " + this.actual.identity + " not to have been called with " + jasmine.pp(expectedArgs) + " but it was." ] : [ "Expected spy " + this.actual.identity + " to have been called with " + jasmine.pp(expectedArgs) + " but was called with " + jasmine.pp(this.actual.argsForCall), "Expected spy " + this.actual.identity + " not to have been called with " + jasmine.pp(expectedArgs) + " but was called with " + jasmine.pp(this.actual.argsForCall) ];
    };
    return this.env.contains_(this.actual.argsForCall, expectedArgs);
};

jasmine.Matchers.prototype.wasCalledWith = jasmine.Matchers.prototype.toHaveBeenCalledWith;

jasmine.Matchers.prototype.wasNotCalledWith = function() {
    var expectedArgs = jasmine.util.argsToArray(arguments);
    if (!jasmine.isSpy(this.actual)) throw new Error("Expected a spy, but got " + jasmine.pp(this.actual) + ".");
    this.message = function() {
        return [ "Expected spy not to have been called with " + jasmine.pp(expectedArgs) + " but it was", "Expected spy to have been called with " + jasmine.pp(expectedArgs) + " but it was" ];
    };
    return !this.env.contains_(this.actual.argsForCall, expectedArgs);
};

jasmine.Matchers.prototype.toContain = function(expected) {
    return this.env.contains_(this.actual, expected);
};

jasmine.Matchers.prototype.toNotContain = function(expected) {
    return !this.env.contains_(this.actual, expected);
};

jasmine.Matchers.prototype.toBeLessThan = function(expected) {
    return expected > this.actual;
};

jasmine.Matchers.prototype.toBeGreaterThan = function(expected) {
    return this.actual > expected;
};

jasmine.Matchers.prototype.toBeCloseTo = function(expected, precision) {
    0 === precision || (precision = precision || 2);
    var multiplier = Math.pow(10, precision);
    var actual = Math.round(this.actual * multiplier);
    expected = Math.round(expected * multiplier);
    return expected == actual;
};

jasmine.Matchers.prototype.toThrow = function(expected) {
    var result = false;
    var exception;
    if ("function" != typeof this.actual) throw new Error("Actual is not a function");
    try {
        this.actual();
    } catch (e) {
        exception = e;
    }
    exception && (result = expected === jasmine.undefined || this.env.equals_(exception.message || exception, expected.message || expected));
    var not = this.isNot ? "not " : "";
    this.message = function() {
        return !exception || expected !== jasmine.undefined && this.env.equals_(exception.message || exception, expected.message || expected) ? "Expected function to throw an exception." : [ "Expected function " + not + "to throw", expected ? expected.message || expected : "an exception", ", but it threw", exception.message || exception ].join(" ");
    };
    return result;
};

jasmine.Matchers.Any = function(expectedClass) {
    this.expectedClass = expectedClass;
};

jasmine.Matchers.Any.prototype.jasmineMatches = function(other) {
    if (this.expectedClass == String) return "string" == typeof other || other instanceof String;
    if (this.expectedClass == Number) return "number" == typeof other || other instanceof Number;
    if (this.expectedClass == Function) return "function" == typeof other || other instanceof Function;
    if (this.expectedClass == Object) return "object" == typeof other;
    return other instanceof this.expectedClass;
};

jasmine.Matchers.Any.prototype.jasmineToString = function() {
    return "<jasmine.any(" + this.expectedClass + ")>";
};

jasmine.Matchers.ObjectContaining = function(sample) {
    this.sample = sample;
};

jasmine.Matchers.ObjectContaining.prototype.jasmineMatches = function(other, mismatchKeys, mismatchValues) {
    mismatchKeys = mismatchKeys || [];
    mismatchValues = mismatchValues || [];
    var env = jasmine.getEnv();
    var hasKey = function(obj, keyName) {
        return null != obj && obj[keyName] !== jasmine.undefined;
    };
    for (var property in this.sample) !hasKey(other, property) && hasKey(this.sample, property) ? mismatchKeys.push("expected has key '" + property + "', but missing from actual.") : env.equals_(this.sample[property], other[property], mismatchKeys, mismatchValues) || mismatchValues.push("'" + property + "' was '" + (other[property] ? jasmine.util.htmlEscape(other[property].toString()) : other[property]) + "' in expected, but was '" + (this.sample[property] ? jasmine.util.htmlEscape(this.sample[property].toString()) : this.sample[property]) + "' in actual.");
    return 0 === mismatchKeys.length && 0 === mismatchValues.length;
};

jasmine.Matchers.ObjectContaining.prototype.jasmineToString = function() {
    return "<jasmine.objectContaining(" + jasmine.pp(this.sample) + ")>";
};

jasmine.FakeTimer = function() {
    this.reset();
    var self = this;
    self.setTimeout = function(funcToCall, millis) {
        self.timeoutsMade++;
        self.scheduleFunction(self.timeoutsMade, funcToCall, millis, false);
        return self.timeoutsMade;
    };
    self.setInterval = function(funcToCall, millis) {
        self.timeoutsMade++;
        self.scheduleFunction(self.timeoutsMade, funcToCall, millis, true);
        return self.timeoutsMade;
    };
    self.clearTimeout = function(timeoutKey) {
        self.scheduledFunctions[timeoutKey] = jasmine.undefined;
    };
    self.clearInterval = function(timeoutKey) {
        self.scheduledFunctions[timeoutKey] = jasmine.undefined;
    };
};

jasmine.FakeTimer.prototype.reset = function() {
    this.timeoutsMade = 0;
    this.scheduledFunctions = {};
    this.nowMillis = 0;
};

jasmine.FakeTimer.prototype.tick = function(millis) {
    var oldMillis = this.nowMillis;
    var newMillis = oldMillis + millis;
    this.runFunctionsWithinRange(oldMillis, newMillis);
    this.nowMillis = newMillis;
};

jasmine.FakeTimer.prototype.runFunctionsWithinRange = function(oldMillis, nowMillis) {
    var scheduledFunc;
    var funcsToRun = [];
    for (var timeoutKey in this.scheduledFunctions) {
        scheduledFunc = this.scheduledFunctions[timeoutKey];
        if (scheduledFunc != jasmine.undefined && scheduledFunc.runAtMillis >= oldMillis && nowMillis >= scheduledFunc.runAtMillis) {
            funcsToRun.push(scheduledFunc);
            this.scheduledFunctions[timeoutKey] = jasmine.undefined;
        }
    }
    if (funcsToRun.length > 0) {
        funcsToRun.sort(function(a, b) {
            return a.runAtMillis - b.runAtMillis;
        });
        for (var i = 0; funcsToRun.length > i; ++i) try {
            var funcToRun = funcsToRun[i];
            this.nowMillis = funcToRun.runAtMillis;
            funcToRun.funcToCall();
            funcToRun.recurring && this.scheduleFunction(funcToRun.timeoutKey, funcToRun.funcToCall, funcToRun.millis, true);
        } catch (e) {}
        this.runFunctionsWithinRange(oldMillis, nowMillis);
    }
};

jasmine.FakeTimer.prototype.scheduleFunction = function(timeoutKey, funcToCall, millis, recurring) {
    this.scheduledFunctions[timeoutKey] = {
        runAtMillis: this.nowMillis + millis,
        funcToCall: funcToCall,
        recurring: recurring,
        timeoutKey: timeoutKey,
        millis: millis
    };
};

jasmine.Clock = {
    defaultFakeTimer: new jasmine.FakeTimer(),
    reset: function() {
        jasmine.Clock.assertInstalled();
        jasmine.Clock.defaultFakeTimer.reset();
    },
    tick: function(millis) {
        jasmine.Clock.assertInstalled();
        jasmine.Clock.defaultFakeTimer.tick(millis);
    },
    runFunctionsWithinRange: function(oldMillis, nowMillis) {
        jasmine.Clock.defaultFakeTimer.runFunctionsWithinRange(oldMillis, nowMillis);
    },
    scheduleFunction: function(timeoutKey, funcToCall, millis, recurring) {
        jasmine.Clock.defaultFakeTimer.scheduleFunction(timeoutKey, funcToCall, millis, recurring);
    },
    useMock: function() {
        if (!jasmine.Clock.isInstalled()) {
            var spec = jasmine.getEnv().currentSpec;
            spec.after(jasmine.Clock.uninstallMock);
            jasmine.Clock.installMock();
        }
    },
    installMock: function() {
        jasmine.Clock.installed = jasmine.Clock.defaultFakeTimer;
    },
    uninstallMock: function() {
        jasmine.Clock.assertInstalled();
        jasmine.Clock.installed = jasmine.Clock.real;
    },
    real: {
        setTimeout: jasmine.getGlobal().setTimeout,
        clearTimeout: jasmine.getGlobal().clearTimeout,
        setInterval: jasmine.getGlobal().setInterval,
        clearInterval: jasmine.getGlobal().clearInterval
    },
    assertInstalled: function() {
        if (!jasmine.Clock.isInstalled()) throw new Error("Mock clock is not installed, use jasmine.Clock.useMock()");
    },
    isInstalled: function() {
        return jasmine.Clock.installed == jasmine.Clock.defaultFakeTimer;
    },
    installed: null
};

jasmine.Clock.installed = jasmine.Clock.real;

jasmine.getGlobal().setTimeout = function(funcToCall, millis) {
    return jasmine.Clock.installed.setTimeout.apply ? jasmine.Clock.installed.setTimeout.apply(this, arguments) : jasmine.Clock.installed.setTimeout(funcToCall, millis);
};

jasmine.getGlobal().setInterval = function(funcToCall, millis) {
    return jasmine.Clock.installed.setInterval.apply ? jasmine.Clock.installed.setInterval.apply(this, arguments) : jasmine.Clock.installed.setInterval(funcToCall, millis);
};

jasmine.getGlobal().clearTimeout = function(timeoutKey) {
    return jasmine.Clock.installed.clearTimeout.apply ? jasmine.Clock.installed.clearTimeout.apply(this, arguments) : jasmine.Clock.installed.clearTimeout(timeoutKey);
};

jasmine.getGlobal().clearInterval = function(timeoutKey) {
    return jasmine.Clock.installed.clearTimeout.apply ? jasmine.Clock.installed.clearInterval.apply(this, arguments) : jasmine.Clock.installed.clearInterval(timeoutKey);
};

jasmine.MultiReporter = function() {
    this.subReporters_ = [];
};

jasmine.util.inherit(jasmine.MultiReporter, jasmine.Reporter);

jasmine.MultiReporter.prototype.addReporter = function(reporter) {
    this.subReporters_.push(reporter);
};

(function() {
    var functionNames = [ "reportRunnerStarting", "reportRunnerResults", "reportSuiteResults", "reportSpecStarting", "reportSpecResults", "log" ];
    for (var i = 0; functionNames.length > i; i++) {
        var functionName = functionNames[i];
        jasmine.MultiReporter.prototype[functionName] = function(functionName) {
            return function() {
                for (var j = 0; this.subReporters_.length > j; j++) {
                    var subReporter = this.subReporters_[j];
                    subReporter[functionName] && subReporter[functionName].apply(subReporter, arguments);
                }
            };
        }(functionName);
    }
})();

jasmine.NestedResults = function() {
    this.totalCount = 0;
    this.passedCount = 0;
    this.failedCount = 0;
    this.skipped = false;
    this.items_ = [];
};

jasmine.NestedResults.prototype.rollupCounts = function(result) {
    this.totalCount += result.totalCount;
    this.passedCount += result.passedCount;
    this.failedCount += result.failedCount;
};

jasmine.NestedResults.prototype.log = function(values) {
    this.items_.push(new jasmine.MessageResult(values));
};

jasmine.NestedResults.prototype.getItems = function() {
    return this.items_;
};

jasmine.NestedResults.prototype.addResult = function(result) {
    if ("log" != result.type) if (result.items_) this.rollupCounts(result); else {
        this.totalCount++;
        result.passed() ? this.passedCount++ : this.failedCount++;
    }
    this.items_.push(result);
};

jasmine.NestedResults.prototype.passed = function() {
    return this.passedCount === this.totalCount;
};

jasmine.PrettyPrinter = function() {
    this.ppNestLevel_ = 0;
};

jasmine.PrettyPrinter.prototype.format = function(value) {
    if (this.ppNestLevel_ > 40) throw new Error("jasmine.PrettyPrinter: format() nested too deeply!");
    this.ppNestLevel_++;
    try {
        if (value === jasmine.undefined) this.emitScalar("undefined"); else if (null === value) this.emitScalar("null"); else if (value === jasmine.getGlobal()) this.emitScalar("<global>"); else if (value.jasmineToString) this.emitScalar(value.jasmineToString()); else if ("string" == typeof value) this.emitString(value); else if (jasmine.isSpy(value)) this.emitScalar("spy on " + value.identity); else if (value instanceof RegExp) this.emitScalar(value.toString()); else if ("function" == typeof value) this.emitScalar("Function"); else if ("number" == typeof value.nodeType) this.emitScalar("HTMLNode"); else if (value instanceof Date) this.emitScalar("Date(" + value + ")"); else if (value.__Jasmine_been_here_before__) this.emitScalar("<circular reference: " + (jasmine.isArray_(value) ? "Array" : "Object") + ">"); else if (jasmine.isArray_(value) || "object" == typeof value) {
            value.__Jasmine_been_here_before__ = true;
            jasmine.isArray_(value) ? this.emitArray(value) : this.emitObject(value);
            delete value.__Jasmine_been_here_before__;
        } else this.emitScalar(value.toString());
    } finally {
        this.ppNestLevel_--;
    }
};

jasmine.PrettyPrinter.prototype.iterateObject = function(obj, fn) {
    for (var property in obj) {
        if ("__Jasmine_been_here_before__" == property) continue;
        fn(property, obj.__lookupGetter__ ? obj.__lookupGetter__(property) !== jasmine.undefined && null !== obj.__lookupGetter__(property) : false);
    }
};

jasmine.PrettyPrinter.prototype.emitArray = jasmine.unimplementedMethod_;

jasmine.PrettyPrinter.prototype.emitObject = jasmine.unimplementedMethod_;

jasmine.PrettyPrinter.prototype.emitScalar = jasmine.unimplementedMethod_;

jasmine.PrettyPrinter.prototype.emitString = jasmine.unimplementedMethod_;

jasmine.StringPrettyPrinter = function() {
    jasmine.PrettyPrinter.call(this);
    this.string = "";
};

jasmine.util.inherit(jasmine.StringPrettyPrinter, jasmine.PrettyPrinter);

jasmine.StringPrettyPrinter.prototype.emitScalar = function(value) {
    this.append(value);
};

jasmine.StringPrettyPrinter.prototype.emitString = function(value) {
    this.append("'" + value + "'");
};

jasmine.StringPrettyPrinter.prototype.emitArray = function(array) {
    this.append("[ ");
    for (var i = 0; array.length > i; i++) {
        i > 0 && this.append(", ");
        this.format(array[i]);
    }
    this.append(" ]");
};

jasmine.StringPrettyPrinter.prototype.emitObject = function(obj) {
    var self = this;
    this.append("{ ");
    var first = true;
    this.iterateObject(obj, function(property, isGetter) {
        first ? first = false : self.append(", ");
        self.append(property);
        self.append(" : ");
        isGetter ? self.append("<getter>") : self.format(obj[property]);
    });
    this.append(" }");
};

jasmine.StringPrettyPrinter.prototype.append = function(value) {
    this.string += value;
};

jasmine.Queue = function(env) {
    this.env = env;
    this.blocks = [];
    this.running = false;
    this.index = 0;
    this.offset = 0;
    this.abort = false;
};

jasmine.Queue.prototype.addBefore = function(block) {
    this.blocks.unshift(block);
};

jasmine.Queue.prototype.add = function(block) {
    this.blocks.push(block);
};

jasmine.Queue.prototype.insertNext = function(block) {
    this.blocks.splice(this.index + this.offset + 1, 0, block);
    this.offset++;
};

jasmine.Queue.prototype.start = function(onComplete) {
    this.running = true;
    this.onComplete = onComplete;
    this.next_();
};

jasmine.Queue.prototype.isRunning = function() {
    return this.running;
};

jasmine.Queue.LOOP_DONT_RECURSE = true;

jasmine.Queue.prototype.next_ = function() {
    var self = this;
    var goAgain = true;
    while (goAgain) {
        goAgain = false;
        if (self.index < self.blocks.length && !this.abort) {
            var calledSynchronously = true;
            var completedSynchronously = false;
            var onComplete = function() {
                if (jasmine.Queue.LOOP_DONT_RECURSE && calledSynchronously) {
                    completedSynchronously = true;
                    return;
                }
                self.blocks[self.index].abort && (self.abort = true);
                self.offset = 0;
                self.index++;
                var now = new Date().getTime();
                if (self.env.updateInterval && now - self.env.lastUpdate > self.env.updateInterval) {
                    self.env.lastUpdate = now;
                    self.env.setTimeout(function() {
                        self.next_();
                    }, 0);
                } else jasmine.Queue.LOOP_DONT_RECURSE && completedSynchronously ? goAgain = true : self.next_();
            };
            self.blocks[self.index].execute(onComplete);
            calledSynchronously = false;
            completedSynchronously && onComplete();
        } else {
            self.running = false;
            self.onComplete && self.onComplete();
        }
    }
};

jasmine.Queue.prototype.results = function() {
    var results = new jasmine.NestedResults();
    for (var i = 0; this.blocks.length > i; i++) this.blocks[i].results && results.addResult(this.blocks[i].results());
    return results;
};

jasmine.Runner = function(env) {
    var self = this;
    self.env = env;
    self.queue = new jasmine.Queue(env);
    self.before_ = [];
    self.after_ = [];
    self.suites_ = [];
};

jasmine.Runner.prototype.execute = function() {
    var self = this;
    self.env.reporter.reportRunnerStarting && self.env.reporter.reportRunnerStarting(this);
    self.queue.start(function() {
        self.finishCallback();
    });
};

jasmine.Runner.prototype.beforeEach = function(beforeEachFunction) {
    beforeEachFunction.typeName = "beforeEach";
    this.before_.splice(0, 0, beforeEachFunction);
};

jasmine.Runner.prototype.afterEach = function(afterEachFunction) {
    afterEachFunction.typeName = "afterEach";
    this.after_.splice(0, 0, afterEachFunction);
};

jasmine.Runner.prototype.finishCallback = function() {
    this.env.reporter.reportRunnerResults(this);
};

jasmine.Runner.prototype.addSuite = function(suite) {
    this.suites_.push(suite);
};

jasmine.Runner.prototype.add = function(block) {
    block instanceof jasmine.Suite && this.addSuite(block);
    this.queue.add(block);
};

jasmine.Runner.prototype.specs = function() {
    var suites = this.suites();
    var specs = [];
    for (var i = 0; suites.length > i; i++) specs = specs.concat(suites[i].specs());
    return specs;
};

jasmine.Runner.prototype.suites = function() {
    return this.suites_;
};

jasmine.Runner.prototype.topLevelSuites = function() {
    var topLevelSuites = [];
    for (var i = 0; this.suites_.length > i; i++) this.suites_[i].parentSuite || topLevelSuites.push(this.suites_[i]);
    return topLevelSuites;
};

jasmine.Runner.prototype.results = function() {
    return this.queue.results();
};

jasmine.Spec = function(env, suite, description) {
    if (!env) throw new Error("jasmine.Env() required");
    if (!suite) throw new Error("jasmine.Suite() required");
    var spec = this;
    spec.id = env.nextSpecId ? env.nextSpecId() : null;
    spec.env = env;
    spec.suite = suite;
    spec.description = description;
    spec.queue = new jasmine.Queue(env);
    spec.afterCallbacks = [];
    spec.spies_ = [];
    spec.results_ = new jasmine.NestedResults();
    spec.results_.description = description;
    spec.matchersClass = null;
};

jasmine.Spec.prototype.getFullName = function() {
    return this.suite.getFullName() + " " + this.description + ".";
};

jasmine.Spec.prototype.results = function() {
    return this.results_;
};

jasmine.Spec.prototype.log = function() {
    return this.results_.log(arguments);
};

jasmine.Spec.prototype.runs = function(func) {
    var block = new jasmine.Block(this.env, func, this);
    this.addToQueue(block);
    return this;
};

jasmine.Spec.prototype.addToQueue = function(block) {
    this.queue.isRunning() ? this.queue.insertNext(block) : this.queue.add(block);
};

jasmine.Spec.prototype.addMatcherResult = function(result) {
    this.results_.addResult(result);
};

jasmine.Spec.prototype.expect = function(actual) {
    var positive = new (this.getMatchersClass_())(this.env, actual, this);
    positive.not = new (this.getMatchersClass_())(this.env, actual, this, true);
    return positive;
};

jasmine.Spec.prototype.waits = function(timeout) {
    var waitsFunc = new jasmine.WaitsBlock(this.env, timeout, this);
    this.addToQueue(waitsFunc);
    return this;
};

jasmine.Spec.prototype.waitsFor = function() {
    var latchFunction_ = null;
    var optional_timeoutMessage_ = null;
    var optional_timeout_ = null;
    for (var i = 0; arguments.length > i; i++) {
        var arg = arguments[i];
        switch (typeof arg) {
          case "function":
            latchFunction_ = arg;
            break;

          case "string":
            optional_timeoutMessage_ = arg;
            break;

          case "number":
            optional_timeout_ = arg;
        }
    }
    var waitsForFunc = new jasmine.WaitsForBlock(this.env, optional_timeout_, latchFunction_, optional_timeoutMessage_, this);
    this.addToQueue(waitsForFunc);
    return this;
};

jasmine.Spec.prototype.fail = function(e) {
    var expectationResult = new jasmine.ExpectationResult({
        passed: false,
        message: e ? jasmine.util.formatException(e) : "Exception",
        trace: {
            stack: e.stack
        }
    });
    this.results_.addResult(expectationResult);
};

jasmine.Spec.prototype.getMatchersClass_ = function() {
    return this.matchersClass || this.env.matchersClass;
};

jasmine.Spec.prototype.addMatchers = function(matchersPrototype) {
    var parent = this.getMatchersClass_();
    var newMatchersClass = function() {
        parent.apply(this, arguments);
    };
    jasmine.util.inherit(newMatchersClass, parent);
    jasmine.Matchers.wrapInto_(matchersPrototype, newMatchersClass);
    this.matchersClass = newMatchersClass;
};

jasmine.Spec.prototype.finishCallback = function() {
    this.env.reporter.reportSpecResults(this);
};

jasmine.Spec.prototype.finish = function(onComplete) {
    this.removeAllSpies();
    this.finishCallback();
    onComplete && onComplete();
};

jasmine.Spec.prototype.after = function(doAfter) {
    this.queue.isRunning() ? this.queue.add(new jasmine.Block(this.env, doAfter, this)) : this.afterCallbacks.unshift(doAfter);
};

jasmine.Spec.prototype.execute = function(onComplete) {
    var spec = this;
    if (!spec.env.specFilter(spec)) {
        spec.results_.skipped = true;
        spec.finish(onComplete);
        return;
    }
    this.env.reporter.reportSpecStarting(this);
    spec.env.currentSpec = spec;
    spec.addBeforesAndAftersToQueue();
    spec.queue.start(function() {
        spec.finish(onComplete);
    });
};

jasmine.Spec.prototype.addBeforesAndAftersToQueue = function() {
    var runner = this.env.currentRunner();
    var i;
    for (var suite = this.suite; suite; suite = suite.parentSuite) for (i = 0; suite.before_.length > i; i++) this.queue.addBefore(new jasmine.Block(this.env, suite.before_[i], this));
    for (i = 0; runner.before_.length > i; i++) this.queue.addBefore(new jasmine.Block(this.env, runner.before_[i], this));
    for (i = 0; this.afterCallbacks.length > i; i++) this.queue.add(new jasmine.Block(this.env, this.afterCallbacks[i], this));
    for (suite = this.suite; suite; suite = suite.parentSuite) for (i = 0; suite.after_.length > i; i++) this.queue.add(new jasmine.Block(this.env, suite.after_[i], this));
    for (i = 0; runner.after_.length > i; i++) this.queue.add(new jasmine.Block(this.env, runner.after_[i], this));
};

jasmine.Spec.prototype.explodes = function() {
    throw "explodes function should not have been called";
};

jasmine.Spec.prototype.spyOn = function(obj, methodName, ignoreMethodDoesntExist) {
    if (obj == jasmine.undefined) throw "spyOn could not find an object to spy upon for " + methodName + "()";
    if (!ignoreMethodDoesntExist && obj[methodName] === jasmine.undefined) throw methodName + "() method does not exist";
    if (!ignoreMethodDoesntExist && obj[methodName] && obj[methodName].isSpy) throw new Error(methodName + " has already been spied upon");
    var spyObj = jasmine.createSpy(methodName);
    this.spies_.push(spyObj);
    spyObj.baseObj = obj;
    spyObj.methodName = methodName;
    spyObj.originalValue = obj[methodName];
    obj[methodName] = spyObj;
    return spyObj;
};

jasmine.Spec.prototype.removeAllSpies = function() {
    for (var i = 0; this.spies_.length > i; i++) {
        var spy = this.spies_[i];
        spy.baseObj[spy.methodName] = spy.originalValue;
    }
    this.spies_ = [];
};

jasmine.Suite = function(env, description, specDefinitions, parentSuite) {
    var self = this;
    self.id = env.nextSuiteId ? env.nextSuiteId() : null;
    self.description = description;
    self.queue = new jasmine.Queue(env);
    self.parentSuite = parentSuite;
    self.env = env;
    self.before_ = [];
    self.after_ = [];
    self.children_ = [];
    self.suites_ = [];
    self.specs_ = [];
};

jasmine.Suite.prototype.getFullName = function() {
    var fullName = this.description;
    for (var parentSuite = this.parentSuite; parentSuite; parentSuite = parentSuite.parentSuite) fullName = parentSuite.description + " " + fullName;
    return fullName;
};

jasmine.Suite.prototype.finish = function(onComplete) {
    this.env.reporter.reportSuiteResults(this);
    this.finished = true;
    "function" == typeof onComplete && onComplete();
};

jasmine.Suite.prototype.beforeEach = function(beforeEachFunction) {
    beforeEachFunction.typeName = "beforeEach";
    this.before_.unshift(beforeEachFunction);
};

jasmine.Suite.prototype.afterEach = function(afterEachFunction) {
    afterEachFunction.typeName = "afterEach";
    this.after_.unshift(afterEachFunction);
};

jasmine.Suite.prototype.results = function() {
    return this.queue.results();
};

jasmine.Suite.prototype.add = function(suiteOrSpec) {
    this.children_.push(suiteOrSpec);
    if (suiteOrSpec instanceof jasmine.Suite) {
        this.suites_.push(suiteOrSpec);
        this.env.currentRunner().addSuite(suiteOrSpec);
    } else this.specs_.push(suiteOrSpec);
    this.queue.add(suiteOrSpec);
};

jasmine.Suite.prototype.specs = function() {
    return this.specs_;
};

jasmine.Suite.prototype.suites = function() {
    return this.suites_;
};

jasmine.Suite.prototype.children = function() {
    return this.children_;
};

jasmine.Suite.prototype.execute = function(onComplete) {
    var self = this;
    this.queue.start(function() {
        self.finish(onComplete);
    });
};

jasmine.WaitsBlock = function(env, timeout, spec) {
    this.timeout = timeout;
    jasmine.Block.call(this, env, null, spec);
};

jasmine.util.inherit(jasmine.WaitsBlock, jasmine.Block);

jasmine.WaitsBlock.prototype.execute = function(onComplete) {
    jasmine.VERBOSE && this.env.reporter.log(">> Jasmine waiting for " + this.timeout + " ms...");
    this.env.setTimeout(function() {
        onComplete();
    }, this.timeout);
};

jasmine.WaitsForBlock = function(env, timeout, latchFunction, message, spec) {
    this.timeout = timeout || env.defaultTimeoutInterval;
    this.latchFunction = latchFunction;
    this.message = message;
    this.totalTimeSpentWaitingForLatch = 0;
    jasmine.Block.call(this, env, null, spec);
};

jasmine.util.inherit(jasmine.WaitsForBlock, jasmine.Block);

jasmine.WaitsForBlock.TIMEOUT_INCREMENT = 10;

jasmine.WaitsForBlock.prototype.execute = function(onComplete) {
    jasmine.VERBOSE && this.env.reporter.log(">> Jasmine waiting for " + (this.message || "something to happen"));
    var latchFunctionResult;
    try {
        latchFunctionResult = this.latchFunction.apply(this.spec);
    } catch (e) {
        this.spec.fail(e);
        onComplete();
        return;
    }
    if (latchFunctionResult) onComplete(); else if (this.totalTimeSpentWaitingForLatch >= this.timeout) {
        var message = "timed out after " + this.timeout + " msec waiting for " + (this.message || "something to happen");
        this.spec.fail({
            name: "timeout",
            message: message
        });
        this.abort = true;
        onComplete();
    } else {
        this.totalTimeSpentWaitingForLatch += jasmine.WaitsForBlock.TIMEOUT_INCREMENT;
        var self = this;
        this.env.setTimeout(function() {
            self.execute(onComplete);
        }, jasmine.WaitsForBlock.TIMEOUT_INCREMENT);
    }
};

jasmine.version_ = {
    major: 1,
    minor: 2,
    build: 0,
    revision: 1337005947
};
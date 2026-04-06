const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function loadScript(relativePath, context) {
  const script = fs.readFileSync(path.join(__dirname, "..", relativePath), "utf8");
  vm.runInNewContext(script, context, { filename: relativePath });
  return context;
}

function createLocalStorage(seed = {}) {
  const store = new Map(
    Object.entries(seed).map(([key, value]) => [
      key,
      typeof value === "string" ? value : JSON.stringify(value),
    ]),
  );

  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
    dump() {
      return Object.fromEntries(store.entries());
    },
  };
}

function loadQuizEnvironment(options = {}) {
  const window = {
    localStorage: options.localStorage ?? createLocalStorage(),
  };
  const context = {
    console,
    window,
  };

  loadScript("js/storage.js", context);
  loadScript("js/quiz.js", context);
  loadScript("js/report.js", context);

  return context.window;
}

module.exports = {
  createLocalStorage,
  loadQuizEnvironment,
  loadScript,
};

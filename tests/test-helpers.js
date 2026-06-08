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

function createSupabaseStub(options = {}) {
  const calls = [];
  const tables = new Map(
    Object.entries(options.tables ?? {}).map(([name, rows]) => [
      name,
      rows.map((row) => ({ ...row })),
    ]),
  );
  const fail = options.fail ?? {};

  function getRows(tableName) {
    if (!tables.has(tableName)) {
      tables.set(tableName, []);
    }
    return tables.get(tableName);
  }

  function shouldFail(tableName, operation) {
    return fail === true || fail[operation] === true || fail[tableName]?.[operation] === true;
  }

  function response(tableName, operation, data = null) {
    return Promise.resolve({
      data,
      error: shouldFail(tableName, operation) ? { message: "Supabase stub failure" } : null,
    });
  }

  const stub = {
    calls,
    tables,
    createClient() {
      return {
        from(tableName) {
          return {
            select() {
              calls.push({ table: tableName, operation: "select" });
              const data = shouldFail(tableName, "select") ? null : getRows(tableName).map((row) => ({ ...row }));
              return response(tableName, "select", data);
            },
            upsert(payload) {
              calls.push({ table: tableName, operation: "upsert", payload });
              if (!shouldFail(tableName, "upsert")) {
                const rows = getRows(tableName);
                const rowIndex = rows.findIndex((row) => row.id === payload.id || row.set_id === payload.set_id || row.question_id === payload.question_id);
                if (rowIndex >= 0) {
                  rows[rowIndex] = { ...rows[rowIndex], ...payload };
                } else {
                  rows.push({ ...payload });
                }
              }
              return response(tableName, "upsert");
            },
            delete() {
              calls.push({ table: tableName, operation: "delete" });
              return {
                eq(column, value) {
                  calls.push({ table: tableName, operation: "delete.eq", column, value });
                  if (!shouldFail(tableName, "delete")) {
                    const rows = getRows(tableName);
                    const nextRows = rows.filter((row) => row[column] !== value);
                    tables.set(tableName, nextRows);
                  }
                  return response(tableName, "delete");
                },
              };
            },
          };
        },
      };
    },
  };

  return stub;
}

function loadQuizEnvironment(options = {}) {
  const window = {
    localStorage: options.localStorage ?? createLocalStorage(),
    supabase: options.supabase ?? createSupabaseStub(),
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
  createSupabaseStub,
  loadQuizEnvironment,
  loadScript,
};

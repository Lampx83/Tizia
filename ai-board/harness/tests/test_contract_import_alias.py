"""Cross-file contract: `import { X as Y }` needs X exported, not the local alias Y (fe-01 r107 false block)."""
from gates import subtask_contract

APPS_HTML = "<script type=\"module\">\n  import { INTEGRATIONS as APPS, getAppDomains } from './js/integrations.js';\n</script>"


def test_aliased_import_asks_for_the_exported_name():
    assert subtask_contract._imports(APPS_HTML, "public/apps.html") == [
        ("public/js/integrations.js", ["INTEGRATIONS", "getAppDomains"])]


def test_plain_import_is_unchanged():
    assert subtask_contract._imports("import { a, b } from './x.js';", "public/js/m.js") == [("public/js/x.js", ["a", "b"])]

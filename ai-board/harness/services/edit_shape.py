"""Edit item shape guard; ValueError naming the expected shapes."""


def check(edits: list) -> None:
    for index, edit in enumerate(edits, start=1):
        if not isinstance(edit, dict):
            raise ValueError(f"edit {index}: phải là object")
        if "after_line" in edit:
            ok = set(edit) == {"after_line", "insert"} and isinstance(edit["insert"], str)
        else:
            ok = set(edit) == {"search", "replace"} and isinstance(edit["search"], str) and isinstance(edit["replace"], str)
        if not ok:
            raise ValueError(f"edit {index}: sai dạng (keys {sorted(edit)}); dùng {{after_line:int, insert:str}} "
                             "(file mới/rỗng: after_line=0) hoặc {search:str, replace:str}")

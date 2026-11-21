
OPTIONAL "allowed_scope": a subtask that must change several files that belong together may list them in "allowed_scope" (an array of repo paths that includes the subtask "file"). Each path exists at base or is a new path the request needs. A file not listed there cannot be edited, and no file may appear in two subtasks. Omit it for one-file subtasks.

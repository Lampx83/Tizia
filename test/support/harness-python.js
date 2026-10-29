import path from 'node:path';

// Windows venv puts python under Scripts/, Linux/macOS under bin/.
export const VENV_PYTHON = path.resolve('ai-board/harness/.venv', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');

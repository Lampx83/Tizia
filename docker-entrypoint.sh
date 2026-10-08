#!/bin/sh
set -e

# EduVerse (Express + PostgreSQL + WebSocket) — main service + healthcheck target.
exec node /app/server/index.js

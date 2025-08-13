#!/bin/bash
set -e

# Make sure we're on main branch
git checkout main

# Stage all files except _site
git add --all

# Commit with date & time
git commit -m "Backup on $(date '+%Y-%m-%d %H:%M:%S')"

# Push to main
git push origin main

echo "✅ Backup pushed to main branch"


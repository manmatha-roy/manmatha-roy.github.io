#!/bin/bash
set -e

# Build jekyl site
bundle exec jekyll build 


# Go into the _site directory
cd _site

# Initialize git repo if not already initialized
if [ ! -d ".git" ]; then
    git init
fi

# Set remote if not already set
if ! git remote get-url origin &>/dev/null; then
    git remote add origin git@github.com:manmatha-roy/manmatha-roy.github.io.git
fi

# Switch/create gh-pages branch
if git show-ref --verify --quiet refs/heads/gh-pages; then
    git checkout gh-pages
else
    git checkout -b gh-pages
fi

# Stage, commit, push
git add --all
git commit -m "Site publish $(date '+%Y-%m-%d %H:%M:%S')"
git push origin gh-pages --force

echo "✅ Published to gh-pages"


cd ..


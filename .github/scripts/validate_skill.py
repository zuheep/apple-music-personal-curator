#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

import yaml

ALLOWED_TOP_LEVEL = {
    "name",
    "description",
    "license",
    "compatibility",
    "metadata",
    "allowed-tools",
}
NAME_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
SEMVER_RE = re.compile(r"^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$")


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def load_skill(path: Path) -> tuple[dict, str]:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        fail("SKILL.md must begin with YAML frontmatter")

    parts = text.split("---", 2)
    if len(parts) != 3:
        fail("SKILL.md must contain a closing YAML frontmatter delimiter")

    try:
        meta = yaml.safe_load(parts[1]) or {}
    except yaml.YAMLError as exc:
        fail(f"invalid YAML frontmatter: {exc}")

    if not isinstance(meta, dict):
        fail("frontmatter must be a YAML mapping")
    return meta, parts[2].lstrip("\n")


def validate(path: Path) -> str:
    meta, body = load_skill(path)

    unknown = sorted(set(meta) - ALLOWED_TOP_LEVEL)
    if unknown:
        fail("unsupported top-level frontmatter field(s): " + ", ".join(unknown))

    name = meta.get("name")
    description = meta.get("description")
    if not isinstance(name, str) or not name:
        fail("name is required")
    if len(name) > 64 or not NAME_RE.fullmatch(name):
        fail("name must be <=64 chars and use lowercase letters, numbers, and single hyphens")

    parent_name = path.resolve().parent.name
    if name != parent_name:
        fail(f"name '{name}' must match parent directory '{parent_name}'")

    if not isinstance(description, str) or not description.strip():
        fail("description is required")
    if len(description) > 1024:
        fail("description must be <=1024 characters")

    compatibility = meta.get("compatibility")
    if compatibility is not None and (not isinstance(compatibility, str) or len(compatibility) > 500):
        fail("compatibility must be a string <=500 characters")

    metadata = meta.get("metadata", {})
    if not isinstance(metadata, dict):
        fail("metadata must be a mapping")
    for key, value in metadata.items():
        if not isinstance(key, str) or not isinstance(value, str):
            fail("metadata keys and values must be strings")

    version = metadata.get("version")
    if not version or not SEMVER_RE.fullmatch(version):
        fail("metadata.version must contain a semantic version such as 1.1.0")

    line_count = len(path.read_text(encoding="utf-8").splitlines())
    if line_count > 500:
        print(f"WARNING: SKILL.md has {line_count} lines; Agent Skills recommends staying under 500", file=sys.stderr)

    if not body.strip():
        fail("SKILL.md body must not be empty")

    print(f"OK: {name} v{version} ({line_count} lines)")
    return version


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("path", nargs="?", default="SKILL.md")
    parser.add_argument("--version-only", action="store_true")
    args = parser.parse_args()

    path = Path(args.path)
    if not path.exists():
        fail(f"missing {path}")

    version = validate(path)
    if args.version_only:
        print(version)


if __name__ == "__main__":
    main()

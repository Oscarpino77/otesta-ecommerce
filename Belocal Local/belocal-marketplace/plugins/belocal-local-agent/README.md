# belocal-local-agent

Local Claude Code plugin with one custom agent for the Belocal Local project.

## Structure

- `.claude-plugin/plugin.json` plugin metadata
- `agents/belocal-local-guide.md` custom agent definition

## Validate

```bash
claude plugin validate /Users/oscarsette/test/Belocal\ Local/belocal-local-agent
```

## Add local marketplace

```bash
claude plugin marketplace add /Users/oscarsette/test/Belocal\ Local/belocal-local-agent
```

## Install plugin

```bash
claude plugin install belocal-local-agent@belocal-local-marketplace
```

## Check installation

```bash
claude plugin list
claude agents
```

# Main branch protection and approval-based auto-merge

This repository protects `main` so changes can only land through reviewed pull requests.

![Main branch protection settings](https://github.com/user-attachments/assets/79cfac94-2bea-4ed7-9c72-5631e2a57b9d)

## Branch protection baseline

Configure a branch rule for `main` with at least:

- ✅ **Require a pull request before merging**
- ✅ **Block force pushes**
- (Optional but recommended) required status checks and code scanning checks

These settings prevent direct and force pushes to `main`, and require review through a PR flow.

## Approval to auto-merge flow

To make merges automatic after human approval:

1. Enable **Auto-merge** in repository settings.
2. In the branch rule, require at least one approving review.
3. Set required status checks (if used by the repo).
4. On each PR, choose **Enable auto-merge**.

Result: a human still approves the PR, and GitHub merges it automatically once all required protections pass.

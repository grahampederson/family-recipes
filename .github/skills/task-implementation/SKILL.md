---
name: task-implementation
description: 'Implement structured plans from task breakdowns. Use when: executing high-priority work items, writing implementation code, setting up verification tests, and tracking progress.'
argument-hint: 'Provide the task breakdown plan to implement'
---

# Task Implementation

You are a Lead Software Engineer. Your goal is to take the structured plan provided and begin the implementation phase. Focus on the first high-priority Work Items and Tasks.

## 1. Project Initialization
- Create the folder/file structure required for the **Features** identified in the plan.
- Initialize boilerplate for the core logic and testing framework.

## 2. Implementation Loop
For the highest priority **Work Items**:
- **Code Generation**: Write the actual implementation code (Python, JS, etc.).
- **Testing**: Implement the "Verification Method" defined in the plan (e.g., creating `test_feature.py`).
- **Observability**: Add the logs, traces, or metrics required for the "Success Signals."

## 3. Verification
- Review the "Definition of Done" from the plan.
- Provide a summary of what was built and how to run the verification tests.

## 4. Next Steps
- Identify the next Task in the hierarchy to be tackled.
- Note any "Unknowns" encountered during implementation.

## Implementation Guardrails
- **Continuous Execution**: Do not stop after the first file. Review the task list and proceed to the next Work Item until the "Body of Work" is complete.
- **Verification Loop**: After writing code for a Task, immediately run the specified "Verification Method." If it fails, fix the code and re-run the test before moving to the next Task.
- **Completion Check**: Only signal "Done" once all high-priority items in the plan are implemented and verified.
- Locate and read the latest plan in .continue/plans/ before starting implementation.

---
name: task-breakdown
description: 'Break down complex tasks into structured plans. Use when: planning a large project, creating task hierarchies, defining testing strategies, and identifying dependencies.'
argument-hint: 'Describe the task you want to break down'
---

# Task Breakdown

You are an expert project manager and technical architect. Help break down the following task into a structured, manageable plan:

## 1. Objective & Deliverables
Understand the overall objective of the task and identify the high-level key deliverables.

## 2. Work Hierarchy Breakdown
Break the work down into a formal hierarchy. Ensure each level clearly maps to its parent:
- **Body of Work**: The overall mission or project scope.
- **Features**: Major functional capabilities within the body of work.
- **Tasks**: Specific, actionable technical or design goals to implement a feature.
- **Work Items**: The smallest atomic units of work (e.g., individual commits or configuration changes).

## 3. Prioritization
Rank these items based on complexity, risk, and immediate impact to the project's critical path.

## 4. Testing Strategy
For every level of the hierarchy, define specific tests:

### Work Item Level – Unit Tests
- Test the smallest isolated pieces of logic
- For data models: validate creation, serialization, edge cases
- For utilities: test inputs/outputs with various parameters
- **Example**: `test_ingredient_consolidation_sums_quantities_correctly()`

### Task Level – Component & Integration Tests
- Test UI components: form validation, state changes, error handling
- Test API endpoints: valid inputs, error responses, edge cases
- Test integrations between systems
- **Example**: `test_add_family_member_form_validates_required_fields()`

### Feature Level – Integration & E2E Tests
- End-to-end flows spanning multiple tasks
- Happy path: user completes full workflow successfully
- Error paths: system handles edge cases gracefully
- **Example**: `test_user_creates_meal_plan_and_generates_grocery_list()`

### Body of Work Level – UAT & Performance
- Real users test in realistic conditions
- Load/performance testing if applicable
- Critical bug tracking

### For Each Work Item, Specify:
- **Verification Method**: unit test, component test, integration test, E2E test, or manual UAT?
- **Test Name**: specific test case (e.g., `test_detect_allergen_conflict_warns_user()`)
- **Success Criteria**: what must pass for this to be "done"?

**Example Test Breakdown:**
- WI 1.1: Create family member → `test_family_member_validates_name()`, `test_family_member_handles_allergies()`, etc.
- WI 2.2: Generate recipes → `test_ollama_batch_generation()`, `test_validate_json_output()`, etc.
- WI 3.4: Detect conflicts → `test_conflict_detection_by_allergen()`, `test_conflict_warning_shows_ui()`, etc.

### Specify Testing Tools
- **Frontend**: Jest, React Testing Library, Playwright/Cypress
- **Backend**: pytest, unittest, integration test framework
- **Coverage Targets**: Core logic 95%+, API 90%+, UI 80%+, Overall 85%+

### Test Execution Strategy
- Unit tests: run on every commit
- Integration tests: run on PR
- E2E tests: run nightly (full regression)
- Manual UAT: before release

---

## 5. Observability & Behavior
Define the "Success Signals" for each feature:
- **Observability**: How can we observe/monitor that the feature is functioning correctly in a live environment?
- **Expected Behavior**: Describe the user or system experience when this feature is operating as intended.

## 6. Dependencies & Constraints
- List any technical or resource dependencies for each task.
- Identify potential blockers or "unknowns" that require early spikes.

## 7. Security & Compliance
- Perform a mini-threat model: what are the security risks for this feature?
- Define required security controls (e.g., auth, encryption, input validation).

## 8. Definition of Done (DoD)
- Specify the final checklist for each Feature to be considered "Production Ready."

## 9. Visual Hierarchy (Mermaid)
Generate a Mermaid.js 'graph TD' (top-down) diagram that visualizes:
- The relationship between the **Body of Work**, **Features**, and **Tasks**.
- Use different node shapes or subgraphs to distinguish between the levels.
- Add a legend or note indicating the "Testing Path" from bottom to top.

## 10. Observability Flow
Include a simple Mermaid sequence diagram or flowchart showing how a user interaction triggers the "Success Signals" you defined in Section 5.

## 11. CI/CD Pipeline & Automation
Define a continuous integration system that automatically runs tests:
- **Pre-commit / Commit Hooks**: Run unit tests locally before code is pushed
- **PR Checks**: On pull request, run unit + integration tests; block merge if coverage drops
- **Nightly Full Suite**: E2E tests, load tests, performance benchmarks
- **Deployment Gates**: All tests must pass before staging/production deployment
- **Coverage Reporting**: Track code coverage trends; alert if dipping below targets (95% core logic, 90% API, 80% UI)
- **Test Results Dashboard**: Public visibility into test health, flaky tests, failure trends

## 12. Artifact Storage
- Save the completed breakdown to `.continue/plans/task_breakdown.md`.

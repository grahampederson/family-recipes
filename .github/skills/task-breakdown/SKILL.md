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
For every level of the hierarchy (Work Item → Task → Feature → Body of Work), specify:
- **Verification Method**: How we prove this specific unit works (e.g., unit tests, integration tests, or manual UAT).
- **Definition of Done**: The specific criteria that must be met to mark it complete.

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

## 11. Artifact Storage
- Save the completed breakdown to `.continue/plans/task_breakdown.md`.

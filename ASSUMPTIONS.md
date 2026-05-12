# Implementation Assumptions

This document captures assumptions made during Phase 1 implementation. Review and adjust as needed.

## Technology Stack Decisions

### Frontend
- **Vanilla HTML/CSS/JavaScript**: No framework overhead, lightweight, CORS-friendly
- **Assumption**: You prefer simplicity over complex tooling; can add framework later if needed

### Backend
- **FastAPI**: Modern, async-ready, great for building APIs quickly with automatic OpenAPI docs
- **SQLAlchemy ORM**: Industry standard for Python; makes migrations and queries cleaner
- **Alembic**: Database migration tool (scaffolded but not yet configured)
- **Assumption**: Familiar with Python FastAPI ecosystem; willing to use ORM for data models

### Database
- **PostgreSQL**: Robust, good for structured relational data (family members, recipes, meal plans)
- **UUID strings for IDs**: Using string UUIDs instead of auto-increment integers
- **Assumption**: PostgreSQL handles our schema requirements; can scale as needed

### Ollama
- **llama3.1 model**: You specified this; good balance of quality and speed
- **Assumption**: Ollama runs locally at `http://localhost:11434` (via docker-compose)

---

## Data Model Assumptions

### Family Members
- **Structure**: FamilyMember has many-to-many relationships with Allergies and Preferences
- **Allergies** vs **Preferences**: 
  - Allergies: "peanuts", "dairy" (medical/safety critical)
  - Preferences: "no onions", "vegetarian", "gluten-free" (dietary choices, including both restrictions and dislikes)
- **Assumption**: Treating both as separate but similar tagging systems allows flexibility

### IDs
- **UUID strings**: All entity IDs are UUID strings (not auto-increment integers)
- **Assumption**: Easier to generate client-side if needed later; prevents ID enumeration attacks

### JSON Serialization
- **Removed**: The `test_family_member_serialization_to_json()` test currently tests `.to_dict()` conversion, not explicit JSON serialization
- **Assumption**: ORM handles DB persistence; API uses Pydantic schemas for JSON; explicit JSON serialization less critical

---

## API Design Assumptions

### RESTful Endpoints
- **Naming**: `/api/family-members` (plural, following REST conventions)
- **Status Codes**:
  - 201 Created for POST (create)
  - 204 No Content for DELETE
  - 404 Not Found for missing resources
- **Assumption**: Standard REST conventions; easy to understand and test

### CORS
- **Currently**: `allow_origins=["*"]` (all origins allowed)
- **For Production**: Should restrict to frontend domain only
- **Assumption**: Local dev first; CORS can be tightened before deployment

### Error Handling
- **Current**: Basic HTTPException with detail messages
- **Assumption**: Good enough for MVP; can add more sophisticated error handling later

---

## Testing Strategy Assumptions

### Database Isolation
- **Approach**: Each test creates a fresh database, runs tests, drops it
- **Tools**: pytest fixtures with SessionLocal
- **Assumption**: SQLite or in-memory DB would be faster for tests; PostgreSQL requires docker-compose for tests to run

### Coverage Targets
- **Current**: No coverage measurement tool configured yet
- **Plan**: Add pytest-cov; aim for 90%+ on models, 85%+ overall
- **Assumption**: Manual testing sufficient for Phase 1; CI will enforce coverage later

### Test Organization
- **Location**: `backend/tests/`
- **Pattern**: `test_*.py` files, `Test*` classes, `test_*` functions
- **Assumption**: pytest auto-discovery will find tests

---

## Frontend Assumptions

### Vanilla JS (No Framework)
- **Pro**: No build step, no dependencies, simple API calls
- **Con**: State management becomes manual
- **Assumption**: OK for MVP with limited pages; if it grows, consider Vue/React

### API Calls
- **Current**: Simple fetch() calls in JavaScript
- **Assumption**: No request retry logic or offline support yet; add if needed

### Form Validation
- **Current**: HTML5 built-in validation (required attribute) + basic JS checks
- **Assumption**: Server-side validation (Pydantic) is primary; client-side is UX enhancement

---

## Database & Migrations

### Alembic Setup
- **Status**: Directory scaffolded but not configured
- **Next Step**: Run `alembic init` to generate config; create initial migrations
- **Assumption**: Will need to create migrations for allergies, preferences, meal plans, recipes

### Foreign Keys
- **Approach**: Explicit ForeignKey declarations in models
- **Assumption**: SQLAlchemy will handle cascade rules via relationship configs

---

## Ollama Integration

### Model Selection
- **llama3.1**: You chose this; uses text generation for JSON recipe output
- **Prompt Engineering**: Not yet implemented; WI 2.2.1 will design the prompt template
- **Assumption**: llama3.1 is available locally and can generate valid JSON

### Recipe Generation
- **Status**: Model & schema ready; generation logic coming in Feature 2
- **Assumption**: Will batch-generate 50+ recipes on-demand via CLI or startup script

---

## CI/CD Pipeline

### Current Status
- **GitHub Actions**: Not yet configured
- **Pre-commit Hooks**: Not yet configured
- **Coverage Reporting**: Not yet configured
- **Assumption**: Will set up after core features are working

### Test Execution
- **Local**: `pytest tests/` works today
- **CI**: Placeholder; will add to GitHub Actions

---

## Security Assumptions

### Authentication
- **Current**: None (no auth required for MVP)
- **Assumption**: Adding login/password later if multi-user needed
- **Note**: Data is single-user only for now

### Input Validation
- **Current**: Pydantic schemas + HTML5 form validation
- **Assumption**: Sufficient for MVP; sanitization can be added if parsing user-generated content

### Database Credentials
- **Current**: Hardcoded in .env.example
- **Assumption**: For local dev only; production will use secrets manager (AWS Secrets, Vault, etc.)

---

## What Could Break This (Hard to Fix Later)

1. **Tech Stack Changes**: Switching from FastAPI to Flask or to a different framework later would require significant refactoring
2. **Database Schema**: Changing from PostgreSQL to SQLite mid-project could affect ORM features
3. **API Contract**: If many clients depend on current endpoint structure, breaking changes are costly
4. **Data ID Strategy**: Changing from UUID strings to integers would require migration scripts

## Review Checklist

- [ ] Tech stack choices align with your preferences?
- [ ] Allergies vs Preferences distinction makes sense?
- [ ] API endpoint naming and design acceptable?
- [ ] Testing strategy (pytest + fixture isolation) OK?
- [ ] Vanilla JS approach OK for now, or prefer framework?
- [ ] Alembic migration approach acceptable?
- [ ] Security assumptions (no auth for MVP) acceptable?
- [ ] Ready to proceed to Phase 2 (Allergy/Preference endpoints + Recipe generation)?

---

**Last Updated**: 2026-05-11  
**Phase**: 1 (Scaffolding + Family Profile Management)

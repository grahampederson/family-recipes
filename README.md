# Family Recipe Planner

A web application for families to plan weekly meals with dietary restrictions and auto-generate grocery lists. Uses Ollama (local LLM) to generate personalized recipes.

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Backend**: Python + FastAPI
- **Database**: PostgreSQL
- **Recipe Generation**: Ollama (llama3.1 model)
- **Testing**: pytest + pytest-asyncio

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Python 3.9+
- Ollama installed (or use Docker)

### Setup

1. **Clone and navigate to project**
   ```bash
   cd family-recipes
   ```

2. **Create env file**
   ```bash
   cp .env.example .env
   # Edit .env if needed (defaults should work with docker-compose)
   ```

3. **Start the full stack**
   ```bash
   docker-compose up --build
   ```

4. **Open the app**
   - Frontend: `http://localhost:8080`
   - Backend API: `http://localhost:8000`
   - Ollama: `http://localhost:11434`

5. **Run database migrations** (coming soon - Alembic setup)
   ```bash
   docker-compose exec backend alembic upgrade head
   ```

### Local development without Docker

If you prefer not to use Docker, you can still run the backend locally:

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Then open the frontend with a simple static server:

```bash
cd frontend
python -m http.server 8001
```

Navigate to `http://localhost:8001`.

### Running Tests

```bash
cd backend
pytest tests/ -v
```

## Project Structure

```
family-recipes/
├── backend/
│   ├── app/
│   │   ├── models/          # SQLAlchemy data models
│   │   ├── schemas/         # Pydantic schemas for API
│   │   ├── routes/          # FastAPI route handlers
│   │   ├── config.py        # Database & settings
│   │   └── main.py          # FastAPI app entry point
│   ├── tests/               # Unit & integration tests
│   ├── alembic/             # Database migrations
│   └── requirements.txt
├── frontend/
│   ├── index.html           # Home page
│   ├── family-members.html  # Family member management
│   ├── meal-planner.html    # (coming soon)
│   ├── recipes.html         # (coming soon)
│   ├── grocery-list.html    # (coming soon)
│   ├── css/style.css        # Shared styles
│   └── js/
│       ├── api.js           # API client wrapper
│       └── family-members.js # Family member page logic
├── docker-compose.yml       # PostgreSQL + Ollama
└── pytest.ini
```

## API Endpoints (Feature 1: Family Profile Management)

### Family Members
- `POST /api/family-members` - Create family member
- `GET /api/family-members` - List all members
- `GET /api/family-members/{id}` - Get specific member
- `PUT /api/family-members/{id}` - Update member
- `DELETE /api/family-members/{id}` - Delete member

More endpoints coming for recipes, meal planning, and grocery lists.

## Development Status

### ✅ Completed (Phase 1)
- [x] Project scaffolding
- [x] Backend setup (FastAPI, SQLAlchemy, PostgreSQL)
- [x] Family Member data model with allergies/preferences
- [x] CRUD endpoints for family members
- [x] Unit tests for Family Member model
- [x] Basic frontend structure

### 🔄 In Progress
- [ ] Allergy/Preference endpoints
- [ ] Family member UI form with validation
- [ ] Database migrations (Alembic)
- [ ] Integration tests

### 📋 Coming Next
- [ ] Recipe generation with Ollama
- [ ] Recipe database & filtering
- [ ] Weekly meal planner UI & logic
- [ ] Grocery list generator
- [ ] Print & export functionality
- [ ] Meal feedback & analytics

## Testing

Tests follow the test pyramid:
- **Unit Tests**: Data models, business logic (high coverage)
- **Integration Tests**: API endpoints, database operations
- **E2E Tests**: Full user workflows (coming later)

Run tests with:
```bash
pytest tests/ -v --cov=app
```

## Assumptions & Design Decisions

See [ASSUMPTIONS.md](ASSUMPTIONS.md) for detailed technical assumptions and design choices.

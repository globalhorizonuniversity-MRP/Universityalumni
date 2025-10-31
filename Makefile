.PHONY: help setup dev dev-build stop restart logs clean install test

help: ## Show this help message
\t@echo '🎓 Global Horizon University Alumni Network'
\t@echo ''
\t@echo 'Usage: make [target]'
\t@echo ''
\t@echo 'Targets:'
\t@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = \":.*?## \"}; {printf \"  \\033[36m%-15s\\033[0m %s\\n\", $$1, $$2}'

setup: ## Initial setup with Docker
\t@echo \"🚀 Setting up Alumni Network...\"
\t@chmod +x setup.sh
\t@./setup.sh

dev: ## Start all services with Docker Compose
\t@echo \"🐳 Starting all services...\"
\t@docker-compose up

dev-build: ## Build and start all services
\t@echo \"🏗️  Building and starting services...\"
\t@docker-compose up --build

stop: ## Stop all services
\t@echo \"🛑 Stopping all services...\"
\t@docker-compose down

restart: ## Restart all services
\t@echo \"🔄 Restarting services...\"
\t@docker-compose restart

logs: ## View logs from all services
\t@docker-compose logs -f

logs-backend: ## View backend logs only
\t@docker-compose logs -f backend

logs-frontend: ## View frontend logs only
\t@docker-compose logs -f frontend

logs-db: ## View MongoDB logs only
\t@docker-compose logs -f mongodb

clean: ## Remove all containers, volumes, and images
\t@echo \"🧹 Cleaning up...\"
\t@docker-compose down -v --rmi all

install: ## Install dependencies locally (without Docker)
\t@echo \"📦 Installing backend dependencies...\"
\t@cd backend && pip install -r requirements.txt
\t@echo \"📦 Installing frontend dependencies...\"
\t@cd frontend && yarn install
\t@echo \"✅ All dependencies installed!\"

start-backend: ## Start backend only (local)
\t@echo \"⚙️  Starting backend...\"
\t@cd backend && uvicorn server:app --host 0.0.0.0 --port 8001 --reload

start-frontend: ## Start frontend only (local)
\t@echo \"🌐 Starting frontend...\"
\t@cd frontend && yarn start

test: ## Run tests
\t@echo \"🧪 Running tests...\"
\t@echo \"Tests not implemented yet\"

ps: ## Show status of all containers
\t@docker-compose ps

shell-backend: ## Open shell in backend container
\t@docker-compose exec backend bash

shell-frontend: ## Open shell in frontend container
\t@docker-compose exec frontend sh

shell-db: ## Open MongoDB shell
\t@docker-compose exec mongodb mongosh alumni_network

backup-db: ## Backup MongoDB database
\t@echo \"💾 Backing up database...\"
\t@docker-compose exec -T mongodb mongodump --db=alumni_network --out=/tmp/backup
\t@docker cp alumni_mongodb:/tmp/backup ./backup
\t@echo \"✅ Database backed up to ./backup\"

restore-db: ## Restore MongoDB database from backup
\t@echo \"📥 Restoring database...\"
\t@docker cp ./backup alumni_mongodb:/tmp/backup
\t@docker-compose exec -T mongodb mongorestore --db=alumni_network /tmp/backup/alumni_network
\t@echo \"✅ Database restored\"

build:
	docker compose build

up-prod:
	docker compose up -d

up:
	docker compose -f docker-compose.local.yml up

stop:
	docker compose stop

restart:
	docker compose restart

down:
	docker compose down

format:
	docker exec stolmal-format-fe npm run lint:fix
	docker exec stolmal-format-fe npm run format

.PHONY: build up stop restart down format

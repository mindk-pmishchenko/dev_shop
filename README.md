# Lite Shop

## Instruction

1. Rename api/example.env to .env.
2. Install and run [docker](https://www.docker.com)
3. To start application run script:

- in development mode:

```
docker-compose up
```

- in production mode:

```
docker-compose -f docker-compose.production.yml up
```

4. Run migration in docker container (api)

```
docker container ps
docker exec -it {container_id} bash
knex migrate:latest
```

5. Run seeds in docker container (api)

```
docker container ps
docker exec -it {container_id} bash
knex seed:run
```

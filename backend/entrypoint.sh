#!/bin/sh

# Test outputs
echo "DB_HOST: $DB_HOST"
echo "DB_PORT: $DB_PORT"

export SPRING_DATASOURCE_URL="jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}"
export SPRING_DATASOURCE_USERNAME=${DB_USERNAME}
export SPRING_DATASOURCE_PASSWORD=${DB_PASSWORD}
export MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE=health

exec "$@"

docker build -t web .
docker run -d -p "${$HOST_ADDRESS}:${HOST_PORT}:${PORT}/tcp" -e PORT=${PORT} web:latest
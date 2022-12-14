FROM python:3.10-slim

COPY . /app

WORKDIR /app
RUN ["python", "-m", "pip", "install", "pipenv"]
RUN ["pipenv", "sync"]

EXPOSE 8000
CMD ["pipenv", "run", "server", "-b", ":8000"]

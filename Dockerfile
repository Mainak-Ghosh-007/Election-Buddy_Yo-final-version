FROM python:3.10

WORKDIR /app

COPY election_buddy/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "--bind", "0.0.0.0:8080", "election_buddy.app:app"]

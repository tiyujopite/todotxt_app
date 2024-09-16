# todotxt.app

## Local setup (frontend)

```bash
git clone https://github.com/tiyujopite/todotxt_app.git
cp .env.example .env
npm i
npm run dev
```

## Local setup (dummy backend)

```bash
cd dummy_backend
python -m venv todotxt_venv
source todotxt_venv/bin/activate
pip install -r requirements.txt
python app.py
```

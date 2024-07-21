from invoke import task


@task
def install(c):
    c.run("pip install -r requirements.txt")


@task
def lint(c):

    c.run("flake8 src/")


@task
def format(c):
    c.run("black src/")


@task
def typecheck(c):
    c.run("mypy src/")


@task
def run(c):
    c.run("uvicorn src.app:app --reload")

@task
def seed(c):
    c.run("python src/scripts/seed.py")

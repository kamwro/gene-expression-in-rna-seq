from invoke import task


@task
def install(c):
    c.run("pip install -r requirements.txt")


@task
def lint(c):

    c.run("flake8 ./")


@task
def format(c):
    c.run("black ./")


@task
def typecheck(c):
    c.run("mypy ./")


@task
def run(c):
    c.run("uvicorn app:app --reload")

@task
def seed(c):
    c.run("python scripts/seed.py")

from invoke import task


@task
def freeze(c):
    """Freeze the current environment's packages into requirements.txt."""
    c.run("pip freeze > requirements.txt")


@task
def install(c):
    """Install packages from requirements.txt and freeze the environment."""
    c.run("pip install -r requirements.txt")
    c.run("pip freeze > requirements.txt")


@task
def lint(c):
    """Run flake8 for linting the codebase."""
    c.run("flake8 .")


@task
def format(c):
    """Format the codebase using black."""
    c.run("black .")


@task
def typecheck(c):
    """Run mypy for type checking."""
    c.run("mypy .")


@task
def run(c):
    """Run the application using uvicorn."""
    c.run("uvicorn src.app:app --reload")

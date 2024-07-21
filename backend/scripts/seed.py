import os
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Define the base directory and database URL
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATABASE_FILE = os.path.join(BASE_DIR, "db", "gene_expression.db")
DATABASE_URL = f"sqlite:///{DATABASE_FILE}"

# Ensure the data directory exists
if not os.path.exists(os.path.dirname(DATABASE_FILE)):
    os.makedirs(os.path.dirname(DATABASE_FILE))

# Create engine and session
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

# Define base class
Base = declarative_base()


# Define the Result model
class Result(Base):
    __tablename__ = "results"
    id = Column(Integer, primary_key=True)
    gene = Column(String)
    expression_level = Column(Float)


def seed_database():
    # Create tables if they don't exist
    Base.metadata.create_all(engine)

    # Sample data
    sample_data = [
        Result(gene="Gene1", expression_level=1.23),
        Result(gene="Gene2", expression_level=2.34),
        Result(gene="Gene3", expression_level=3.45),
    ]

    # Add sample data to the session
    session.add_all(sample_data)
    session.commit()


if __name__ == "__main__":
    seed_database()

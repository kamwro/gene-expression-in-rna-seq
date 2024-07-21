import sqlite3
from sqlite3 import Connection

def get_db_connection() -> Connection:
    conn = sqlite3.connect('data/gene_expression.db')
    conn.row_factory = sqlite3.Row
    return conn

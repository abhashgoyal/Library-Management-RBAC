from pymongo import MongoClient
from dotenv import load_dotenv
import os
import certifi

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = "Library_Management"

def connect_db():
    try:
        client = MongoClient(MONGODB_URL, tlsCAFile=certifi.where())
        db = client[DATABASE_NAME]
        print("Connected to MongoDB")
        return db["Users"]
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        raise

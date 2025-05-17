import asyncio
import asyncpg
import json
from src.core.config import settings

async def seed_tasks():
    # Load data dari JSON
    with open("src/data/tasks.json") as f:
        tasks = json.load(f)

    # Connect ke database
    conn = await asyncpg.connect(dsn=settings.DATABASE_URL)

    # Insert data ke table tasks
    for task in tasks:
        await conn.execute(
            "INSERT INTO tasks (title, is_completed) VALUES ($1, $2)",
            task["title"], task["is_completed"]
        )

    await conn.close()
    print("Seeder selesai! 🚀")

if __name__ == "__main__":
    asyncio.run(seed_tasks())

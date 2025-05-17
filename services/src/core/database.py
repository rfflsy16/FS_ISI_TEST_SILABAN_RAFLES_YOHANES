import asyncpg
from src.core.config import settings

class Database:
    def __init__(self):
        self.pool = None

    async def connect(self):
        self.pool = await asyncpg.create_pool(dsn=settings.DATABASE_URL)

    async def disconnect(self):
        if self.pool:
            await self.pool.close()

    async def fetch(self, query, *args):
        async with self.pool.acquire() as conn:
            return await conn.fetch(query, *args)

    async def execute(self, query, *args):
        async with self.pool.acquire() as conn:
            return await conn.execute(query, *args)

db = Database()

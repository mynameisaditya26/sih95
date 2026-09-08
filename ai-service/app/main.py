from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import ai_routes
import os
app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(ai_routes.router)
@app.get("/")
async def root(): return {"message": "AI Service is running"}
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=int(os.getenv("PORT", 8000)), reload=True)

from fastapi import FastAPI, Depends
from db.connect_db import connect_db
from modals.users import Role, User
from utils.authentication import require_role, get_current_user
from utils.signup import signup
from utils.login import login
from typing import Optional

app = FastAPI()

client = None


@app.on_event("startup")
async def startup_event():
    global client
    client = connect_db()


@app.on_event("shutdown")
async def shutdown_event():
    global client
    client.close()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}


@app.post("/signup")
def signUp(user: User):
    return signup(client, user.model_dump())

@app.post("/login")
def logIn(user: User):
    return login(client, user.model_dump())



@app.get("/admin-dashboard")
def admin_dashboard(user: User = Depends(require_role([Role.ADMIN]))):
    return {"message": "Welcome to the admin dashboard"}

@app.get("/moderator-dashboard")
def moderator_dashboard(user: User = Depends(require_role([Role.MODERATOR, Role.ADMIN]))):
    return {"message": "Welcome to the moderator dashboard"}

@app.get("/user-dashboard")
def user_dashboard(user: User = Depends(get_current_user)):
    return {"message": f"Welcome {user.username} to your dashboard"}

@app.post("/logout")
def logout(user: User = Depends(get_current_user)):
    # Implement logout logic here (e.g., invalidate token)
    return {"message": "Successfully logged out"}
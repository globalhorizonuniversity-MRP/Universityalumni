from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Models
class UserCreate(BaseModel):
    full_name: str
    email: str
    password: str
    university: str = "Global Horizon University"
    passout_year: int
    location: str
    company: str
    domain: str
    phone: str
    profile_picture: Optional[str] = None

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: str
    password: str
    university: str
    passout_year: int
    location: str
    company: str
    domain: str
    phone: str
    profile_picture: Optional[str] = None
    registered_events: List[str] = []
    donations: List[dict] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LoginRequest(BaseModel):
    email: str
    password: str

class EventRegistration(BaseModel):
    user_id: str
    event_id: str
    name: str
    email: str
    phone: str
    attend_dinner: bool

class Message(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    sender_id: str
    receiver_id: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class MessageCreate(BaseModel):
    sender_id: str
    receiver_id: str
    message: str

class Donation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    name: str
    email: str
    phone: str
    amount: float
    purpose: str
    message: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class DonationCreate(BaseModel):
    user_id: str
    name: str
    email: str
    phone: str
    amount: float
    purpose: str
    message: Optional[str] = None

class Feedback(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class FeedbackCreate(BaseModel):
    name: str
    email: str
    message: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    location: Optional[str] = None
    company: Optional[str] = None
    domain: Optional[str] = None
    phone: Optional[str] = None
    profile_picture: Optional[str] = None

# Routes
@api_router.post("/register", response_model=User)
async def register(user_data: UserCreate):
    # Check if email exists
    existing = await db.users.find_one({"email": user_data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user = User(**user_data.model_dump())
    doc = user.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.users.insert_one(doc)
    return user

@api_router.post("/login")
async def login(login_data: LoginRequest):
    user = await db.users.find_one({"email": login_data.email, "password": login_data.password}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return user

@api_router.get("/user/{user_id}")
async def get_user(user_id: str):
    user = await db.users.find_one({"id": user_id}, {"_id": 0, "password": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@api_router.put("/user/{user_id}")
async def update_user(user_id: str, update_data: UserUpdate):
    update_dict = {k: v for k, v in update_data.model_dump().items() if v is not None}
    
    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    result = await db.users.update_one({"id": user_id}, {"$set": update_dict})
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    updated_user = await db.users.find_one({"id": user_id}, {"_id": 0, "password": 0})
    return updated_user

@api_router.get("/events")
async def get_events():
    # Return hardcoded events for prototype
    events = [
        {
            "id": "evt1",
            "title": "Global Alumni Summit 2025",
            "date": "2025-12-20",
            "location": "San Francisco, CA",
            "image": "https://images.unsplash.com/photo-1590650046871-92c887180603",
            "description": "Join us for our annual alumni summit featuring keynote speakers from Fortune 500 companies, networking sessions, and celebration dinner. Reconnect with classmates and build meaningful professional relationships.",
            "has_registration": True
        },
        {
            "id": "evt2",
            "title": "Tech Innovation Workshop",
            "date": "2025-12-25",
            "location": "Virtual Event",
            "image": "https://images.unsplash.com/photo-1758520144420-3e5b22e9b9a4",
            "description": "Explore cutting-edge technologies with industry leaders. Learn about AI, blockchain, and cloud computing through hands-on workshops. Perfect for alumni looking to upskill and stay ahead in their careers.",
            "has_registration": True
        },
        {
            "id": "evt3",
            "title": "Alumni Career Fair",
            "date": "2026-01-10",
            "location": "New York, NY",
            "image": "https://images.unsplash.com/photo-1758599543132-ba9b306d715e",
            "description": "Meet top recruiters and explore exciting career opportunities across various industries. Network with hiring managers and learn about job openings tailored for our alumni community.",
            "has_registration": False
        },
        {
            "id": "evt4",
            "title": "Winter Homecoming Celebration",
            "date": "2026-01-15",
            "location": "Global Horizon Campus",
            "image": "https://images.pexels.com/photos/34513728/pexels-photo-34513728.jpeg",
            "description": "Come back to campus for a nostalgic celebration of memories. Tour the new facilities, meet current students, and enjoy an evening of music, food, and reconnecting with old friends.",
            "has_registration": True
        },
        {
            "id": "evt5",
            "title": "Entrepreneurship Mentorship Program Launch",
            "date": "2026-02-01",
            "location": "Boston, MA",
            "image": "https://images.pexels.com/photos/34504392/pexels-photo-34504392.jpeg",
            "description": "Launch event for our new mentorship program connecting experienced entrepreneurs with aspiring alumni founders. Get guidance, funding advice, and access to our startup ecosystem.",
            "has_registration": True
        },
        {
            "id": "evt6",
            "title": "Spring Sports Tournament",
            "date": "2026-03-05",
            "location": "Los Angeles, CA",
            "image": "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f",
            "description": "Annual alumni sports tournament featuring basketball, soccer, and tennis competitions. Bring your competitive spirit and team pride for a day of athletics and camaraderie.",
            "has_registration": False
        },
        {
            "id": "evt7",
            "title": "Women in Leadership Conference",
            "date": "2026-03-20",
            "location": "Chicago, IL",
            "image": "https://images.unsplash.com/photo-1590650046871-92c887180603",
            "description": "Empowering conference celebrating women alumni leaders. Features panel discussions, workshops on career advancement, and networking opportunities with influential female executives.",
            "has_registration": False
        },
        {
            "id": "evt8",
            "title": "Global Alumni Golf Classic",
            "date": "2026-04-12",
            "location": "Pebble Beach, CA",
            "image": "https://images.unsplash.com/photo-1485182708500-e8f1318ba72",
            "description": "Prestigious golf tournament at world-class venue. Enjoy a day on the greens with fellow alumni, followed by awards ceremony and gala dinner overlooking the Pacific Ocean.",
            "has_registration": False
        },
        {
            "id": "evt9",
            "title": "Alumni Art & Culture Gala",
            "date": "2026-05-08",
            "location": "Washington, DC",
            "image": "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg",
            "description": "Elegant evening celebrating artistic achievements of our alumni. Features art exhibition, live performances, and fundraising auction supporting arts education programs at Global Horizon.",
            "has_registration": False
        },
        {
            "id": "evt10",
            "title": "50th Anniversary Reunion Weekend",
            "date": "2026-06-15",
            "location": "Global Horizon Campus",
            "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
            "description": "Grand celebration marking 50 years of Global Horizon University. Three days of festivities including campus tours, class reunions, special ceremonies, and commemorative gala dinner.",
            "has_registration": False
        }
    ]
    return events

@api_router.post("/events/register")
async def register_event(registration: EventRegistration):
    reg_doc = registration.model_dump()
    reg_doc['timestamp'] = datetime.now(timezone.utc).isoformat()
    
    await db.event_registrations.insert_one(reg_doc)
    
    # Add event to user's registered events
    await db.users.update_one(
        {"id": registration.user_id},
        {"$addToSet": {"registered_events": registration.event_id}}
    )
    
    return {"message": "Registration Successful!", "success": True}

@api_router.get("/alumni")
async def get_alumni():
    alumni = await db.users.find({}, {"_id": 0, "password": 0}).to_list(1000)
    return alumni

@api_router.post("/messages", response_model=Message)
async def send_message(message_data: MessageCreate):
    message = Message(**message_data.model_dump())
    doc = message.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.messages.insert_one(doc)
    return message

@api_router.get("/messages/{user_id}")
async def get_messages(user_id: str, other_user_id: str):
    messages = await db.messages.find(
        {
            "$or": [
                {"sender_id": user_id, "receiver_id": other_user_id},
                {"sender_id": other_user_id, "receiver_id": user_id}
            ]
        },
        {"_id": 0}
    ).sort("timestamp", 1).to_list(1000)
    
    return messages

@api_router.post("/donate", response_model=Donation)
async def create_donation(donation_data: DonationCreate):
    donation = Donation(**donation_data.model_dump())
    doc = donation.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.donations.insert_one(doc)
    
    # Add to user's donation history
    await db.users.update_one(
        {"id": donation_data.user_id},
        {"$push": {"donations": doc}}
    )
    
    return donation

@api_router.post("/feedback", response_model=Feedback)
async def create_feedback(feedback_data: FeedbackCreate):
    feedback = Feedback(**feedback_data.model_dump())
    doc = feedback.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.feedback.insert_one(doc)
    return feedback

@api_router.get("/stats")
async def get_stats():
    total_alumni = await db.users.count_documents({})
    total_donations = await db.donations.count_documents({})
    
    return {
        "total_alumni": total_alumni,
        "upcoming_events": 10,
        "recent_donations": total_donations
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
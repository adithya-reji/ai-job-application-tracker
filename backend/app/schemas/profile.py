from pydantic import Field, BaseModel, ConfigDict
from datetime import datetime

class ProfileBase(BaseModel):
    name: str | None = None
    location: str | None = None
    experience_years: int | None = None
    education: str | None = None
    skills: list[str] = Field(default_factory=list)

class ProfileCreate(ProfileBase):
    pass

class ProfileUpdate(ProfileBase):
    pass

class ProfileResponse(ProfileBase):
    id: int
    user_id: int
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
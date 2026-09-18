from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from app.models.job import ApplicationStatus, VerificationStatus

class JobBase(BaseModel):
    title: str | None = None
    company: str | None = None
    location: str | None = None
    job_url: str | None = None
    raw_description: str | None = None
    required_skills: list[str] = Field(default_factory=list)
    application_status: ApplicationStatus = ApplicationStatus.SAVED
    verification_status: VerificationStatus = VerificationStatus.PENDING

class JobCreate(JobBase):
    pass

class JobUpdate(BaseModel):
    title: str | None = None
    company: str | None = None
    location: str | None = None
    job_url: str | None = None
    raw_description: str | None = None
    required_skills: list[str] | None = None
    application_status: ApplicationStatus | None = None
    verification_status: VerificationStatus | None = None

class JobResponse(JobBase):
    id: int
    user_id: int
    skill_match: int | None = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class JobRequestRaw(BaseModel):
    raw_data: str = Field(
        min_length=10, 
        description="The raw text of the job description pasted by the user."
    )

class JobExtracted(BaseModel):
    title: str = Field(description="The job title or role")
    company: str = Field(description="The name of the company hiring")
    location: str = Field(description="The location of the job, or 'Remote'")
    required_skills: list[str] = Field(description="A list of technical skills required")

class JobAnalysisResponse(BaseModel):
    analysis: str = Field(description="A markdown-formatted strategic analysis of how the user fits the job.")
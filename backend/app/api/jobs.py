from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.schemas.job import JobUpdate, JobResponse, JobRequestRaw, JobAnalysisResponse
from app.models.user import User
from app.models.job import Job, ApplicationStatus, VerificationStatus
from app.services.ai_services import analyze_job_description, generate_profile_job_analysis
from app.services.skill_match import calculate_skill_match

router = APIRouter(prefix="/jobs", tags=["Jobs"])

@router.get('', response_model=list[JobResponse])
def get_jobs(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = db.execute(select(Job).where(Job.user_id == current_user.id))
    jobs = result.scalars().all()

    user_skills = current_user.profile.skills if current_user.profile else []

    for job in jobs:
        job.skill_match = calculate_skill_match(user_skills, job.required_skills)

    return jobs

@router.get('/{job_id}', response_model=JobResponse)
def get_job(job_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = db.execute(select(Job).where(Job.id == job_id, Job.user_id == current_user.id))
    job = result.scalar_one_or_none()

    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )

    user_skills = current_user.profile.skills if current_user.profile else []
    job.skill_match = calculate_skill_match(user_skills, job.required_skills)

    return job

@router.post('/extract', response_model=JobResponse, status_code=status.HTTP_201_CREATED)
def extract_and_create_job(request: JobRequestRaw, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    extracted_data = analyze_job_description(request.raw_data)

    job = Job(
        user_id=current_user.id,
        title=extracted_data.title,
        company=extracted_data.company,
        location=extracted_data.location,
        required_skills=extracted_data.required_skills,
        raw_description=request.raw_data,
        application_status=ApplicationStatus.SAVED,
        verification_status=VerificationStatus.PENDING
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    return job

# @router.post('', response_model=JobResponse, status_code=status.HTTP_201_CREATED)
# def create_job(job_data: JobCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
#     job = Job(**job_data.model_dump(), user_id=current_user.id)

#     db.add(job)
#     db.commit()
#     db.refresh(job)

#     return job

@router.patch('/{job_id}', response_model=JobResponse)
def update_job(job_id: int, job_data: JobUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = db.execute(select(Job).where(Job.id == job_id, Job.user_id == current_user.id))
    job = result.scalar_one_or_none()

    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )

    update_dict = job_data.model_dump(exclude_unset=True)

    for key, value in update_dict.items():
        setattr(job, key, value)

    db.commit()
    db.refresh(job)

    return job

@router.get('/{job_id}/analyze', response_model=JobAnalysisResponse)
def analyze_job_match(job_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = db.execute(select(Job).where(Job.id == job_id, Job.user_id == current_user.id))
    job = result.scalar_one_or_none()

    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )

    if not current_user.profile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please complete your profile first."
        )

    profile = current_user.profile
    profile_text = f"""
    Location: {profile.location}
    Experience: {profile.experience_years} years
    Education: {profile.education}
    Skills: {', '.join(profile.skills)}
    """

    analysis = generate_profile_job_analysis(profile_text, job.raw_description)

    return JobAnalysisResponse(analysis=analysis)

@router.delete('/{job_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_job(job_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = db.execute(select(Job).where(Job.id == job_id, Job.user_id == current_user.id))
    job = result.scalar_one_or_none()

    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )

    db.delete(job)
    db.commit()
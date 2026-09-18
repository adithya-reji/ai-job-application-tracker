from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.schemas.profile import ProfileUpdate, ProfileResponse
from app.core.database import get_db
from app.models.user import User
from app.models.profile import Profile
from app.api.dependencies import get_current_user

router = APIRouter(prefix="/profile", tags=["Profile"])

@router.get('', response_model=ProfileResponse)
def get_user_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = db.execute(select(Profile).where(Profile.user_id == current_user.id))
    profile = result.scalar_one_or_none()

    if not profile:
        profile = Profile(user_id=current_user.id)
        db.add(profile)
        db.commit()
        db.refresh(profile)

    return profile

@router.patch('', response_model=ProfileResponse)
def update_user_profile(profile_data: ProfileUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = db.execute(select(Profile).where(Profile.user_id == current_user.id))
    profile = result.scalar_one_or_none()

    if not profile:
        profile = Profile(user_id=current_user.id)
        db.add(profile)

    update_dict = profile_data.model_dump(exclude_unset=True)
    for key, value in update_dict.items():
        setattr(profile, key, value)

    db.commit()
    db.refresh(profile)

    return profile

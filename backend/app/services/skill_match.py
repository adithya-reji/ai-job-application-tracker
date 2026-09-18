import re

def normalize_skill(skill: str) -> str:
    clean = skill.lower()

    clean = re.sub(r'[\s\.\-]', '', clean)
    return clean

def calculate_skill_match(user_skills: list[str], job_skills: list[str]) -> int:
    if not job_skills:
        return 100

    normalized_user_skills = {normalize_skill(skill) for skill in user_skills}
    normalized_job_skills = {normalize_skill(skill) for skill in job_skills}

    matched_skills = normalized_job_skills.intersection(normalized_user_skills)

    match_percentage = (len(matched_skills) / len(normalized_job_skills)) * 100

    return round(match_percentage)
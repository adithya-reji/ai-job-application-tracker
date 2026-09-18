import os
import json
from dotenv import load_dotenv
from google import genai
from google.genai import types
from app.schemas.job import JobExtracted, JobAnalysisResponse

load_dotenv()

client = genai.Client()

def analyze_job_description(raw_text: str) -> JobExtracted:
    prompt = f"""
    You are an expert technical recruiter. Extract the required information from the following raw description.
    If a piece of information is missing, infer it if obvious, otherwise use "Unknown".

    Raw Job Description:
    {raw_text}
    """

    try:
        interaction = client.interactions.create(
            model="gemini-3.6-flash",
            input=prompt,
            response_format={
                "type": "text",
                "mime_type": "application/json",
                "schema": JobExtracted.model_json_schema()
            }
        )

        return JobExtracted.model_validate_json(interaction.output_text)
    except Exception as e:
        print(f"Error parsing AI response: {e}")
        return JobExtracted(
            company="Parsing Error",
            title="Please edit manuelly",
            location="Unknown",
            required_skills=[]
        )

def generate_profile_job_analysis(profile_data: str, job_description: str) -> str:
    prompt = f"""
    You are an expert career coach. Compare my profile with the job description.
    Provide a short, highly strategic analysis (3-4 brief paragraphs) highlighting:
    1. Their strongest matches.
    2. Missing skills or gaps, and how they can address or frame them in an interview.
    3. Actionable advice for their application.
    
    Format the response cleanly in Markdown.

    My Profile:
    {profile_data}

    Job Description:
    {job_description}
    """

    try:
        interaction = client.interactions.create(
            model="gemini-3.6-flash",
            input=prompt,
            response_format={
                "type": "text",
                "mime_type": "application/json",
                "schema": JobAnalysisResponse.model_json_schema()
            }
        )

        data = JobAnalysisResponse.model_validate_json(interaction.output_text)
        return data.analysis
    except Exception as e:
        print(f"Error generating analysis: {e}")
        return "Analysis currently unavailable. Please try again later."
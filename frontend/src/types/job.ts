export type JobEditorMode = "verify" | "edit";

export type EmploymentType =
    | "full_time"
    | "part_time"
    | "contract"
    | "internship"
    | "temporary"
    | "other";

export interface Job {
    id: number;

    company: string;
    title: string;
    location: string;

    employment_type: EmploymentType | null;

    experience_min: number | null;
    experience_max: number | null;

    salary_min: number | null;
    salary_max: number | null;
    currency: string | null;

    required_skills: string[];
    preferred_skills: string[];

    education: string | null;
    application_url: string | null;

    raw_description: string;

    verification_status: "PENDING" | "VERIFIED";

    application_status:
    | "SAVED"
    | "APPLIED"
    | "INTERVIEW"
    | "OFFER"
    | "REJECTED"
    | "WITHDRAWN";

    applied_date: string | null;

    created_at: string;
    updated_at: string;
}

export interface JobFormData {
    company: string;
    title: string;
    location: string;

    employment_type: EmploymentType | "";

    experience_min: string;
    experience_max: string;

    salary_min: string;
    salary_max: string;
    currency: string;

    required_skills: string[];
    preferred_skills: string[];

    education: string;
    application_url: string;

    raw_description: string;
}
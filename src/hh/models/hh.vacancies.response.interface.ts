export interface HhVacanciesResponse {
  items: HhVacancy[];
  found: number;
  pages: number;
  page: number;
  per_page: number;
  clusters: unknown | null;
  arguments: unknown | null;
  fixes: unknown | null;
  suggests: unknown | null;
  alternate_url: string;
}

export interface HhVacancy {
  id: string;
  premium: boolean;
  name: string;
  department: HhDepartment | null;
  has_test: boolean;
  response_letter_required: boolean;
  area: HhArea;
  salary: HhSalary | null;
  salary_range: HhSalaryRange | null;
  type: HhDictionaryItem;
  address: HhAddress | null;
  response_url: string | null;
  sort_point_distance: number | null;
  published_at: string;
  created_at: string;
  archived: boolean;
  apply_alternate_url: string;
  show_contacts: boolean;
  show_logo_in_search?: boolean | null;
  insider_interview: unknown | null;
  url: string;
  alternate_url: string;
  relations: unknown[];
  employer: HhEmployer;
  snippet: HhSnippet;
  contacts: unknown | null;
  schedule: HhDictionaryItem;
  working_days: HhDictionaryItem[];
  working_time_intervals: HhDictionaryItem[];
  working_time_modes: HhDictionaryItem[];
  accept_temporary: boolean;
  fly_in_fly_out_duration: HhDictionaryItem[];
  work_format: HhDictionaryItem[];
  working_hours: HhDictionaryItem[];
  work_schedule_by_days: HhDictionaryItem[];
  accept_labor_contract: boolean;
  civil_law_contracts: HhDictionaryItem[];
  night_shifts: boolean;
  professional_roles: HhDictionaryItem[];
  accept_incomplete_resumes: boolean;
  experience: HhDictionaryItem;
  employment: HhDictionaryItem;
  employment_form: HhDictionaryItem;
  internship: boolean;
  adv_response_url: string | null;
  is_adv_vacancy: boolean;
  adv_context: unknown | null;
}

export interface HhDepartment {
  id?: string;
  name?: string;
}

export interface HhArea {
  id: string;
  name: string;
  url: string;
}

export interface HhSalary {
  from: number | null;
  to: number | null;
  currency: string;
  gross: boolean;
}

export interface HhSalaryRange {
  from: number | null;
  to: number | null;
  currency: string;
  gross: boolean;
  mode: HhDictionaryItem;
  frequency: HhDictionaryItem | null;
}

export interface HhDictionaryItem {
  id: string;
  name: string;
}

export interface HhAddress {
  city: string | null;
  street: string | null;
  building: string | null;
  lat: number | null;
  lng: number | null;
  description: string | null;
  raw: string;
  metro: HhMetroStation | null;
  metro_stations: HhMetroStation[];
  id: string;
}

export interface HhMetroStation {
  station_name: string;
  line_name: string;
  station_id: string;
  line_id: string;
  lat: number;
  lng: number;
}

export interface HhEmployer {
  id: string;
  name: string;
  url: string;
  alternate_url: string;
  logo_urls: HhLogoUrls | null;
  vacancies_url: string;
  country_id: number;
  accredited_it_employer: boolean;
  trusted: boolean;
}

export interface HhLogoUrls {
  original?: string;
  "90"?: string;
  "240"?: string;
}

export interface HhSnippet {
  requirement: string | null;
  responsibility: string | null;
}
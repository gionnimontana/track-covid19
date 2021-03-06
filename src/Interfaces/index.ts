export interface Data {
  date: number,
  companies: Company[]
  countries: Country[]
}

export interface Country {
  country: string
  employees: number
  absData: AbsData
}

export interface Company {
  company: string
  country: string
  employees: number
  absData: AbsData
}

export interface AbsData {
  people_factory: number
  people_home: number
  people_vacation: number
  people_off: number
  people_quarantine: number
  people_sick: number
  people_infected: number
}

export interface AggregatedData {
  date: string
  factory: number
  home: number
  vacation: number
  off: number
  quarantine: number
  sick: number
  infected: number
}

export interface Filter {
  countries: FilterOption[]
  companies: FilterOption[]
  date: FilterOption[]
}

export interface FilterOption {
  label: string
  value: string | number
}

export interface Stats {
  employees: number
  countries: number
  companies: number
  lastUpdate: string
}
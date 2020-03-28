export interface Data {
  date: number,
  companies: Company[]
}

export interface Company {
  name: string
  country: string
  employees: number
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
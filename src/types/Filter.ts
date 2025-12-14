export enum Filter {
  All = 'all',
  Completed = 'completed',
  Ongoing = 'ongoing',
}

export const isValidFilter = (value: string): value is Filter => {
  return Object.values(Filter).includes(value as Filter)
}

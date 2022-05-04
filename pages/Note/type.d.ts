export interface DailyDataType {
  title: string;
  date: string;
  code: string;
  content: string[];
}
export interface DailyType extends DailyDataType {
  year: number;
}

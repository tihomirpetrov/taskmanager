export interface Task {
  id: number;
  title: string;
  description: string;
  start: Date;
  end: Date;
  completed: boolean;
}

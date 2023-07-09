import { BoilerPartProps } from './boilerparts';

export interface DashboardSliderProps {
  items: BoilerPartProps[];
  isLoading: boolean;
  goToPartPage?: boolean;
}

export interface CartAlertProps {
  count: number;
  closeAlert: VoidFunction;
}

export interface OrderAccordionProps {
  setOrderIsReady: (arg0: boolean) => void;
  showDoneIcon: boolean;
}

export interface MakePaymentFx {
  url: string;
  amount: number;
}

export interface CheckPaymentFx {
  url: string;
  paymentId: string;
}

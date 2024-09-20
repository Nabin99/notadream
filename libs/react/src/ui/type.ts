export interface ListboxOptionType {
  [key: string]: string | number;
}

export interface ListboxProperties {
  data: ListboxOptionType[];
  selected: ListboxOptionType;
  setSelected: (value: ListboxOptionType) => void;
  accessKey: string;
  buttonIcon?: React.ReactNode; // Allow users to pass custom icons
}

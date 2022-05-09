interface Nutrients {
  ENERC_KCAL?: number;
  FAT?: number;
  CHOCDF?: number;
  PROCNT?: number;
  FIBTG?: number;
}

export interface SearchResultProps {
  label: string;
  image?: string;
  nutrients: Nutrients;
}

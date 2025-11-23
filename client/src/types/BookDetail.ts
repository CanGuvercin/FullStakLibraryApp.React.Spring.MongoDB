export interface CopyDto {
  id: string;
  status: string;
  location: string;
}

export interface BookDetailDto {
  id: string;
  bookId: string;
  title: string;
  description: string | null;
  isbn: string;
  publicationYear: number | null;
  authors: string[];
  coverUrl: string | null;
  tags: string[];

  availableCount: number;
  totalCopies: number;
  copies: CopyDto[];

  userHasLoan: boolean;
  userHasHold: boolean;
  activeLoanId: string | null;
  activeHoldId: string | null;

  availableCopyId?: string | null;
}

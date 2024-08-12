// src/app/interfaces/signer.interfaces.ts

export interface ISigner {
    init(config: ISignerConfig): void;
    sign(): void;
  }
  
  export interface ISignerConfig {
    documentPath: string;
    documentType: string;
    onSuccess: () => void;
    onError: (error: any) => void;
  }
  
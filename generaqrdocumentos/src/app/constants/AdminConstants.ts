export class AdminConstants {
  public static defaultItemPerPage = 10;

  public static defaultFIleSize = 10 * 1024 * 1000;

  public static firmux = {
    firmuxNotExist: 5,
    firmuxError: 0,    
    firmuxDesconocido: 1,
    firmuxOk: 2,
  };

  public static info = {
    commonName: true,
    signatureDate: true,
    issuerDN: true,
    validationStatus: true,
    trustStatus: true,
    revocationStatus: true,
    validityStatus: true,
    signatureFormat: true,
    expirationDate: true,
    serialNumber: true,
    country: true,
    ou: true,
    title: true,
    localy: true,
    street: true,
    organization: true,
  }

  public static fileConfig = {
    default: {
      tipoArchivos: 'pdf,.pdf',
      tamanoArchivo: this.defaultFIleSize,
      tamanoArchivosText: '10MB',
    },
  };
}

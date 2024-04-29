package pe.gob.minjus.generaqrdocumentos.models;

import lombok.Data;

@Data
public class Signature {
    private String commonName;
    private String signatureDate;
    private String issuerDN;
    private String validationStatus;
    private String trustStatus;
    private String revocationStatus;
    private String validityStatus;
    private String signatureFormat;
    private String expirationDate;
    private CertificateInformation certificateInformation;

    private Integer status;
}

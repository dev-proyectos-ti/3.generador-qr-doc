package pe.gob.minjus.generaqrdocumentos.models;

import lombok.Data;

@Data
public class CertificateInformation {
    private String serialNumber;
    private String country;
    private String ou;
    private String title;
    private String localy;
    private String street;
    private String organization;
    private String emailAddress;
}

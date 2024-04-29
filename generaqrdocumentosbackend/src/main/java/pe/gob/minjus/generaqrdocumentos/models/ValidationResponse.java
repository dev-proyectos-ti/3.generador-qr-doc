package pe.gob.minjus.generaqrdocumentos.models;

import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class ValidationResponse {
    private String validationDate;
    private boolean changedAfterSigned;
    private int totalSignatures;
    private List<Signature> signatures;

    private String error;
}

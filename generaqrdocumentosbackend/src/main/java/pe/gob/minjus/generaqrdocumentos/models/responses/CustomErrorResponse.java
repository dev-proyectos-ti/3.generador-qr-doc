package pe.gob.minjus.generaqrdocumentos.models.responses;

import lombok.Data;

@Data
public class CustomErrorResponse {
    private int status;
    private String message;
}

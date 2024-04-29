package pe.gob.minjus.generaqrdocumentos.models.responses;

import lombok.Data;

@Data
public class DataResponse {
    private String mensaje;
    private Object dato;
    private int estado;
}

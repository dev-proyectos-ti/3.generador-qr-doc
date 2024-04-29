package pe.gob.minjus.generaqrdocumentos.services;

import pe.gob.minjus.generaqrdocumentos.models.responses.DataResponse;

public interface IGeneraQRDocumentosService {
    DataResponse generaqrdocumentos(byte[] file, int tamanioQR, int startX, int startY, String urlQR) throws Exception;
    void generateQRCode(String contenigoqr) throws Exception;

}

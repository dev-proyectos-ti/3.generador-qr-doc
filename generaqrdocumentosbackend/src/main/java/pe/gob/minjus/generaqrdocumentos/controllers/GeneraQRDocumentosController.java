package pe.gob.minjus.generaqrdocumentos.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import pe.gob.minjus.generaqrdocumentos.models.responses.DataResponse;
import pe.gob.minjus.generaqrdocumentos.services.IGeneraQRDocumentosService;

@RestController
@RequestMapping("/api")
public class GeneraQRDocumentosController {

    @Autowired
    private IGeneraQRDocumentosService generaQRDocumentosService;

    
    @PostMapping(value = {"/genera-qr-documento"}, produces = { "application/json" })
    public ResponseEntity<Object> generaqrdocumentos(@RequestParam("fileData") MultipartFile fileData,
            @RequestParam("tamanioQR") int tamanioQR,
            @RequestParam("startX") int startX,
            @RequestParam("startY") int startY,
            @RequestParam("urlQR") String urlQR) {

        DataResponse response = new DataResponse();

        try {
            response = generaQRDocumentosService.generaqrdocumentos(fileData.getBytes(),tamanioQR,startX,startY,urlQR);
            return (new ResponseEntity<>(response, HttpStatus.OK));
        } catch (Exception e) {
            response.setMensaje(e.getMessage());
            response.setEstado(0);
            return (new ResponseEntity<>(response, HttpStatus.BAD_REQUEST));
        }
    }


    
    @PostMapping(value = "/genera-qr", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> qrcode(@RequestParam("contenigoqr") String contenigoqr) throws Exception {
    	DataResponse response = new DataResponse();
    	try {
    		generaQRDocumentosService.generateQRCode(contenigoqr);
    		response.setMensaje("Created QR Code");
            response.setEstado(1);
    		 return (new ResponseEntity<>(response, HttpStatus.OK));
    	} catch (Exception e) {
            response.setMensaje(e.getMessage());
            response.setEstado(0);
            return (new ResponseEntity<>(response, HttpStatus.BAD_REQUEST));
        }
      
       
    }
    


}

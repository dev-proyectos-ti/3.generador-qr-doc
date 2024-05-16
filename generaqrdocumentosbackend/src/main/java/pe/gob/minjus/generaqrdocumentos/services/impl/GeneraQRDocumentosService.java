package pe.gob.minjus.generaqrdocumentos.services.impl;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.graphics.image.LosslessFactory;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;
import pe.gob.minjus.generaqrdocumentos.models.responses.DataResponse;
import pe.gob.minjus.generaqrdocumentos.services.IGeneraQRDocumentosService;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import io.micrometer.common.util.StringUtils;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
@Data
public class GeneraQRDocumentosService implements IGeneraQRDocumentosService {

    @Autowired
    private ObjectMapper mapper;

    @Value("${qrcode.message}")
    private String qrCodeMessage;

    @Value("${qrcode.output.directory}")
    private String outputLocation;

    private static final String charset = "UTF-8";

    private static final String strDateFormat = "yyyyMMddhhmmss";
    
    

    
    @Override
    public DataResponse generaqrdocumentos(byte[] file,int tamanioQR, int startX, int startY, String urlQR) throws Exception {
    	
    	 if (file == null) {
             throw new Exception("El contenido es null");
         }
    	
    	String text = urlQR; // Texto para el código QR
        int qrCodeWidth = tamanioQR;//200; // Ancho del código QR
        int qrCodeHeight = tamanioQR;//200; // Altura del código QR

        // Generar el código QR
        BufferedImage bitMatrix = generateQRCode(text, qrCodeWidth, qrCodeHeight);

        byte[] pdfMasQr; 
        pdfMasQr = addQRCodeToPDF(file,bitMatrix,startX,startY);
       
        DataResponse dataResponse = new DataResponse();

        dataResponse.setDato(pdfMasQr);
        dataResponse.setEstado(1);
        dataResponse.setMensaje("Información del resultado");

        return dataResponse;
    }

    
    public byte[] addQRCodeToPDF(byte[] pdfBytes, BufferedImage qrImage, int paramStartX, int paramStartY) {
    	try (PDDocument document = PDDocument.load(new ByteArrayInputStream(pdfBytes))) {
            PDPage page = document.getPage(0); // primera página
            PDRectangle mediaBox = page.getMediaBox();
            float startX = mediaBox.getLowerLeftX() + paramStartX; //10 Agregamos un pequeño margen
            float startY = mediaBox.getLowerLeftY() + paramStartY; //10 Agregamos un pequeño margen

            PDImageXObject pdImage = LosslessFactory.createFromImage(document, qrImage);
            PDPageContentStream contentStream = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true, true);

            float scale = 0.25f; //Escala de la imagen (ajustar según necesidad)
            contentStream.drawImage(pdImage, startX, startY, pdImage.getWidth() * scale, pdImage.getHeight() * scale);

            contentStream.close();
            
            // Guardar el documento modificado a un nuevo array de bytes
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            document.save(outputStream);
            //document.save(new File("C:\\QRCodeOuput\\ff.pdf"));
            return outputStream.toByteArray();
            
            
    	} catch (IOException e) {
            System.err.println("Error al modificar el PDF: " + e);
            return null;
        }
    }

    // Generar el código QR como una matriz de bits
    private static BufferedImage generateQRCode(String text, int width, int height) {
        try {

            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);
            return MatrixToImageWriter.toBufferedImage(bitMatrix);
        } catch (Exception e) {
            System.err.println("Error al generar el código QR: " + e);
            return null;
        }
    }
    
    
    public void generateQRCode(String contenigoqr) {
        try {
            String finalMessage = (StringUtils.isBlank(contenigoqr))?qrCodeMessage:contenigoqr;
            processQRcode(finalMessage, prepareOutputFileName(), charset, 400, 400);

        } catch (WriterException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private String prepareOutputFileName() {
        Date date = new Date();

        DateFormat dateFormat = new SimpleDateFormat(strDateFormat);
        String formattedDate= dateFormat.format(date);

        StringBuilder sb = new StringBuilder();
        sb.append(outputLocation).append("\\").append("QRCode-").append(formattedDate).append(".png");
        return sb.toString();
    }

    private void processQRcode(String data, String path, String charset, int height, int width) throws WriterException, IOException {
        BitMatrix matrix = new MultiFormatWriter().encode(new String(data.getBytes(charset), charset), BarcodeFormat.QR_CODE, width, height);
        MatrixToImageWriter.writeToFile(matrix, path.substring(path.lastIndexOf('.') + 1), new File(path));
        
    }

    
}

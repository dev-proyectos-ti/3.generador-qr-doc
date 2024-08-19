package pe.gob.minjus.generaqrdocumentos.firma.servlets;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;
import pe.gob.minjus.psm.alfresco.model.domain.CreateResponse;
import pe.gob.minjus.psm.util.AlfrescoUtil;

@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT })
@RequestMapping("/firmaUploadServlet")
public class FirmaUploadServlet extends HttpServlet {

	 private static final Logger LOG = LoggerFactory.getLogger(FirmaUploadServlet.class);
	    
	    private static final long serialVersionUID = 1L;
	    
	    private String urlAnexoAlfresco="";

	    public FirmaUploadServlet() {
	        super();
	    }
	    
	    private boolean isEmpty(String param){
	        return param==null || param.trim().isEmpty();
	    }

	    @Override
	    @GetMapping
	    @ResponseBody
	    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    	    	
	    	response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(urlAnexoAlfresco);
            
            String paramValue = urlAnexoAlfresco;  
            String redirectUrl = "http://localhost:4200/#/firmar-pdf?parametro=" + paramValue; // Añade el parámetro a la URL
            response.sendRedirect(redirectUrl); // Realiza la redirección
            
            System.out.println("fin ddoGett: "+redirectUrl);
            
	    }

	    @Override
		@PostMapping
		@ResponseBody
	    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    	System.out.println("Entro doPost UploadServlet");
	    	System.out.println("request.getContentType(): " + request.getContentType());
	    	
	    	if (request.getContentType()==null) {
	    	    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
	    	    response.getWriter().write("{\"status\":\"error\",\"message\":\"Invalid content type.\"}");
	    	    return;
	    	}

	    	
	        try {   
	        	String result = ""; // Variable para almacenar el resultado a devolver
	            	            
	            for (Part part : request.getParts()) {      
	            	LOG.info("entro doc");
	                if ("attach".equals(part.getName())) {                    
	                    InputStream inputStream = part.getInputStream();
	                    
	            		AlfrescoUtil alfrescoUtil = new AlfrescoUtil();

	            		byte[] contentArchivo = inputStream.readAllBytes();
	            		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
	            		String fileNameArchivo = "NombreDemoPDF"+sdf.format(new Date())+".pdf";
	            		//String directorioArchivo = "SISNOT/"+ "10422909082" + "/" + sdf.format(new Date()) + "/archivos";
	            		String directorioArchivo = "SISNOT/"+ "10422909082" + "/" + "archivos2024";

	            		try {

	            			CreateResponse responsePrincipal = alfrescoUtil.uploadDocument(contentArchivo, fileNameArchivo,
	            					directorioArchivo);
	            			//String urlAnexoAlfresco = responsePrincipal.getUuid();
	            			urlAnexoAlfresco = responsePrincipal.getUuid();

	            			String codRespuesta = responsePrincipal.getCode();

	            			if (responsePrincipal.getCode().equals("00000")) { // Ya existe un archivo con el mismo nombre
	            				System.out.println("OK");
	            				 result = "{\"status\":\"success\",\"codigoAlfresco\":\"" + urlAnexoAlfresco + "\"}";
	            			} else {
	            				System.out.println("NOOK");
	            				result = "{\"status\":\"error\",\"message\":\"Failed to upload document.\"}";
	            			}

	            		} catch (Exception ex) {
	            			ex.printStackTrace();
	                        result = "{\"status\":\"error\",\"message\":\"" + ex.getMessage() + "\"}";
	                    
	            		}

	                    
	                    
	                    break;
	                }
	            }
	            
	            
            
	            response.setContentType("application/json");
	            response.setCharacterEncoding("UTF-8");
	            response.setStatus(HttpServletResponse.SC_OK);
	            response.getWriter().write(result);
	            

	        } catch (IOException | ServletException ex) {
	            System.out.println(ex.getMessage());
	            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	            response.getWriter().write("{\"status\":\"error\",\"message\":\"Internal server error.\"}");
	       
	        }
	    }
	    
}

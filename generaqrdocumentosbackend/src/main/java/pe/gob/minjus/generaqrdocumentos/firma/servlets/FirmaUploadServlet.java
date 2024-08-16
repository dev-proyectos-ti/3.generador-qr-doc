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
	    
	    private String codRespuesta="";

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
	    	/*PrintWriter writer =  response.getWriter();
	    	writer.write("Directorio temporal donde se almacenan los archivos: " + System.getProperty("java.io.tmpdir"));
			writer.close();*/
			
			/*response.setContentType("text/html");
	        try (PrintWriter out = response.getWriter()) {
	            out.println("SIGNATURE MANAGEMENT SERVLET"+ codRespuesta);
	            out.println("<script>");
	            out.println("try{");
	            out.println("finalizarFirma();");
	            out.println("}catch(err){");
	            out.println("alert(err);");
	            out.println("}");
	            out.println("</script>");
	            
	        } catch (Exception ex) {
	            LOG.warn(ex.getMessage(), ex);            
	        }*/
	        
	        response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "GET method is not supported.");
	    }

	    @Override
		@PostMapping
		@ResponseBody
	    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    	System.out.println("Entro doPost UploadServlet");
	        try {   
	        	String result = ""; // Variable para almacenar el resultado a devolver
	            	            
	            for (Part part : request.getParts()) {      
	            	LOG.info("entro doc");
	                if ("attach".equals(part.getName())) {                    
	                    InputStream inputStream = part.getInputStream();
	                    
	                 // INSERTO ANEXOS en alfresco
	            		AlfrescoUtil alfrescoUtil = new AlfrescoUtil();

	            		byte[] contentArchivo = inputStream.readAllBytes();
	            		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
	            		String fileNameArchivo = "NombreDemoPDF"+sdf.format(new Date())+".pdf";
	            		//String directorioArchivo = "SISNOT/"+ "10422909082" + "/" + sdf.format(new Date()) + "/archivos";
	            		String directorioArchivo = "SISNOT/"+ "10422909082" + "/" + "archivos2024";

	            		try {

	            			CreateResponse responsePrincipal = alfrescoUtil.uploadDocument(contentArchivo, fileNameArchivo,
	            					directorioArchivo);
	            			String urlAnexoAlfresco = responsePrincipal.getUuid();

	            			//String codRespuesta = responsePrincipal.getCode();
	            			codRespuesta = responsePrincipal.getCode();

	            			if (responsePrincipal.getCode().equals("00000")) { // Ya existe un archivo con el mismo nombre
	            				System.out.println("OK");
	            				 result = "{\"status\":\"success\",\"codigoAlfresco\":\"" + codRespuesta + "\"}";
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
	            
	            
	         // Escribir la respuesta en el objeto HttpServletResponse
	            //response.getWriter().write(result);
	            //response.setStatus(HttpServletResponse.SC_OK);
	            
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

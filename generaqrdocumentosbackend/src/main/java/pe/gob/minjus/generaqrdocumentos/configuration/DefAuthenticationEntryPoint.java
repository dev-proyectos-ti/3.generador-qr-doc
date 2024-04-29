package pe.gob.minjus.generaqrdocumentos.configuration;

import java.io.IOException;
import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import pe.gob.minjus.generaqrdocumentos.models.responses.CustomErrorResponse;

@Component
public class DefAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable {
    
   @Autowired
   private ObjectMapper objectMapper;

   public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
    
    CustomErrorResponse customErrorResponse = new CustomErrorResponse();
    customErrorResponse.setMessage("Acceso denegado. No tienes permiso para acceder a este recurso.");
    customErrorResponse.setStatus(HttpServletResponse.SC_OK);
    
    response.setStatus(HttpServletResponse.SC_OK);
    
    response.setContentType("application/json");

    response.getWriter().write(objectMapper.writeValueAsString(customErrorResponse));
    response.getWriter().flush();
    
   }
}

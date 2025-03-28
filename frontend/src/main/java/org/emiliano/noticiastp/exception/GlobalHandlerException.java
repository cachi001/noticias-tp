package org.emiliano.noticiastp.exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

//Es una anotación de Spring que permite manejar excepciones globalmente en todos los controladores.
@ControllerAdvice
public class GlobalHandlerException {

    // Manejar excepciones de validación (por ejemplo, @Valid)
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> handlerConstraintViolationException(ConstraintViolationException e){

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Error de validacion: "+ e.getMessage());
    }

    // Manejar cualquier otra excepción genérica
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handlerGenericException(Exception e){

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error interno del servidor: "+ e.getMessage());
    }
}

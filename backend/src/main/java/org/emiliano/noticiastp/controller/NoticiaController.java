package org.emiliano.noticiastp.controller;

import jakarta.validation.Valid;
import org.emiliano.noticiastp.dto.NoticiaCrearDto;
import org.emiliano.noticiastp.dto.NoticiaDto;
import org.emiliano.noticiastp.model.Noticia;
import org.emiliano.noticiastp.service.NoticiaService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/noticia")
public class NoticiaController {

    private final NoticiaService noticiaService;

    public NoticiaController(NoticiaService noticiaService){
        this.noticiaService = noticiaService;
    }

    //Crear Noticia
    @PostMapping("")
    public ResponseEntity<?> crearNoticia(@Valid @RequestBody NoticiaDto noticiaDto){
        try {
            NoticiaDto nuevaNoticia = noticiaService.crearNoticia(noticiaDto);
            return ResponseEntity.ok(nuevaNoticia);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("NO SE PUDO CREAR LA NOTICIA "+ e.getMessage());
        }
    }

    //Obtener Noticia
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerNoticias(@PathVariable Long id){
        try {
            NoticiaDto noticiaDto = noticiaService.consultarNoticia(id);
            return ResponseEntity.ok(noticiaDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NO SE ENCONTRO LA NOTICIA CON ID "+id+" "
            + e.getMessage());
        }
    }
    //Actualizar Noticia
    @PutMapping("/{id}")
    public ResponseEntity<?> modificarNoticia(@PathVariable Long id, @Valid @RequestBody Noticia noticia){
        try{
            Noticia noticiaActualizada = noticiaService.actualizarNoticia(id,noticia);

            return ResponseEntity.ok(noticiaActualizada);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("NO SE PUDO ELIMINAR LA NOTICIA CON ID "+id+" "+ e.getMessage());
        }
    }


    //Eliminar Noticia
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarNoticia(@PathVariable Long id) {
        try {
            noticiaService.eliminarNoticia(id);
            return ResponseEntity.ok("SE ELIMINO CORRECTAMENTE LA NOTICIA CON ID " + id);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("NO SE PUDO ELIMINAR LA NOTICIA CON ID " + id+" "+ e.getMessage());
        }
    }
}

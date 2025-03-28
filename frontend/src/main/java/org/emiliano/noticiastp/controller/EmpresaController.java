package org.emiliano.noticiastp.controller;

import jakarta.validation.Valid;
import org.emiliano.noticiastp.dto.EmpresaCrearDto;
import org.emiliano.noticiastp.dto.EmpresaDenominacionDto;
import org.emiliano.noticiastp.dto.EmpresaDto;
import org.emiliano.noticiastp.model.Empresa;
import org.emiliano.noticiastp.service.EmpresaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/empresa")
public class EmpresaController {

    private final EmpresaService empresaService;
    public EmpresaController(EmpresaService empresaService) {
        this.empresaService = empresaService;
    }

    //Crear Empresa
    @PostMapping("")
    public ResponseEntity<?> crearEmpresa (@Valid @RequestBody EmpresaCrearDto empresaCrearDto){
        try{
            EmpresaDto nuevaEmpresa = empresaService.crearEmpresa(empresaCrearDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaEmpresa);
        }catch(Exception e){
            return ResponseEntity.status(404)
                    .body("Error al crear la empresa: " + e.getMessage());
        }
    }

    //Modificar Empresa
    @PutMapping("/{id}")
    public ResponseEntity<?> modificarEmpresa (@PathVariable Long id, @Valid @RequestBody EmpresaCrearDto empresaCrearDto){
        try{
            Empresa empresaActualizada = empresaService.actualizarEmpresa(id, empresaCrearDto);

            return ResponseEntity.status(HttpStatus.OK).body(empresaActualizada);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("NO SE PUDO MODIFICAR LA EMPRESA CON EL ID"+id+" "+
                    e.getMessage());
        }
    }

    //Obtener EmpresaDto
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerEmpresa(@PathVariable Long id){
        try {
            EmpresaDto empresaDto = empresaService.consultarEmpresa(id);

            return ResponseEntity.ok(empresaDto);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NO SE ENCONTRO LA EMPRESA CON EL ID "+id);
        }
    }

    //Obtener Empresas (DENOMINACION Y ID) PAGE INDEX
    @GetMapping("/empresasI")
    public ResponseEntity<?> obtenerEmpresasIndex (){
        try {
            List<EmpresaDenominacionDto> listaEmpresas = empresaService.listarEmpresasIndex();
            return ResponseEntity.ok(listaEmpresas);
        } catch (Exception e){
            return ResponseEntity.status(404).body("NO SE PUDO OBTENER LAS EMPRESAS DEL INDEX"+ e.getMessage());
        }
    }

    //Eliminar Empresa
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarEmpresa(@PathVariable Long id){
        try{
                empresaService.eliminarEmpresa(id);
                return ResponseEntity.ok("SE ELIMINO LA EMPRESA CON EL ID"+ id);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("NO SE PUDO ELIMINAR LA EMPRESA "+ e.getMessage());
        }
    }
}

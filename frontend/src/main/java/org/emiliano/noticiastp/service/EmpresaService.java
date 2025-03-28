package org.emiliano.noticiastp.service;

import jakarta.persistence.EntityNotFoundException;
import org.emiliano.noticiastp.dto.*;
import org.emiliano.noticiastp.mapper.EmpresaMapper;
import org.emiliano.noticiastp.mapper.NoticiaMapper;
import org.emiliano.noticiastp.model.Empresa;
import org.emiliano.noticiastp.model.Noticia;
import org.emiliano.noticiastp.repository.EmpresaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmpresaService {

    private final EmpresaMapper empresaMapper;
    private final NoticiaMapper noticiaMapper;
    private final EmpresaRepository empresaRepository;

    public EmpresaService(EmpresaRepository empresaRepository,EmpresaMapper empresaMapper, NoticiaMapper noticiaMapper) {
        this.empresaRepository = empresaRepository;
        this.empresaMapper = empresaMapper;
        this.noticiaMapper = noticiaMapper;
    }

    // Alta Empresa
    public EmpresaDto crearEmpresa(EmpresaCrearDto empresaCrearDto){

        Empresa empresa = empresaMapper.toEntity(empresaCrearDto);

        Empresa empresaGuardada = empresaRepository.save(empresa);

        return empresaMapper.toEmpresaDto(empresaGuardada);
    }

    // Baja Empresa
    public void eliminarEmpresa(Long id){
        empresaRepository.deleteById(id);
    }

    // Modificar Empresa
    public Empresa actualizarEmpresa(Long id, EmpresaCrearDto empresaCrearDto){

        Empresa empresaExistente = empresaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Empresa No Encontrada"));

        empresaExistente.setDenominacion(empresaCrearDto.getDenominacion());
        empresaExistente.setDomicilio(empresaCrearDto.getDomicilio());
        empresaExistente.setEmail(empresaCrearDto.getEmail());
        empresaExistente.setTelefono(empresaCrearDto.getTelefono());
        empresaExistente.setLatitud(empresaCrearDto.getLatitud());
        empresaExistente.setLongitud(empresaCrearDto.getLongitud());
        empresaExistente.setHorarioAtencion(empresaCrearDto.getHorarioAtencion());
        empresaExistente.setQuienesSomos(empresaCrearDto.getQuienesSomos());

        // Guardar los cambios en la base de datos
        return empresaRepository.save(empresaExistente);
    }


    //Consultar Datos Empresa
    public EmpresaDto consultarEmpresa(Long id){
        Empresa empresa = empresaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Empresa no encontrada"));

        List<NoticiaDto> listaNoticiaDto = new ArrayList<>();

        empresa.getNoticias().forEach(noticia -> {
            listaNoticiaDto.add(noticiaMapper.toDto(noticia));
        });

        EmpresaDto empresaDto = empresaMapper.toEmpresaDto(empresa);
        empresaDto.setNoticias(listaNoticiaDto);

        return empresaDto;
    }


    // Consultar Denominacion y id d elas empresas (INDEX)
    public List<EmpresaDenominacionDto> listarEmpresasIndex(){
        List<Empresa> listaEmpresas = empresaRepository.findAll();
        List<EmpresaDenominacionDto> listaEmpresasDto = new ArrayList<>();
        listaEmpresas.forEach(empresa ->{
            listaEmpresasDto.add(empresaMapper.toEmpresaDenominacionDto(empresa));
        });

        return listaEmpresasDto;
    }

    // Consultar todas las empresas
    public List<Empresa> consultarEmpresas() {
        return empresaRepository.findAll();
    }
}

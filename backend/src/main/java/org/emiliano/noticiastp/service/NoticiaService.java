package org.emiliano.noticiastp.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.emiliano.noticiastp.dto.NoticiaCrearDto;
import org.emiliano.noticiastp.dto.NoticiaDto;
import org.emiliano.noticiastp.mapper.NoticiaMapper;
import org.emiliano.noticiastp.model.Empresa;
import org.emiliano.noticiastp.model.Noticia;
import org.emiliano.noticiastp.repository.EmpresaRepository; // Agregar importación
import org.emiliano.noticiastp.repository.NoticiaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticiaService {

    private final NoticiaRepository noticiaRepository;
    private final EmpresaRepository empresaRepository; // Añadir campo para EmpresaRepository
    private final NoticiaMapper noticiaMapper;

    // Constructor actualizado para inyectar EmpresaRepository
    public NoticiaService(NoticiaRepository noticiaRepository, EmpresaRepository empresaRepository, NoticiaMapper noticiaMapper){
        this.noticiaRepository = noticiaRepository;
        this.empresaRepository = empresaRepository; // Inicializar el repositorio de Empresa
        this.noticiaMapper = noticiaMapper;
    }

    //Alta Noticia
    @Transactional
    public NoticiaDto crearNoticia(NoticiaDto noticiaDto) {
        // Buscar la empresa usando el ID proporcionado
        Empresa empresa = empresaRepository.findById(noticiaDto.getIdEmpresa())
                .orElseThrow(() -> new RuntimeException("Empresa no encontrada"));

        // Crear la entidad Noticia y asignar la empresa
        Noticia noticia = noticiaMapper.toEntity(noticiaDto);
        noticia.setEmpresa(empresa); // Asignar la empresa a la noticia

        // Guardar la noticia
        Noticia noticiaGuardada = noticiaRepository.save(noticia);

        return noticiaMapper.toDto(noticiaGuardada);
    }

    //Baja Noticia
    public void eliminarNoticia(Long id){
        noticiaRepository.deleteById(id);
    }

    //Modificar Noticia
    public Noticia actualizarNoticia(Long id, Noticia noticia){
        Noticia noticiaExistente = noticiaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Noticia no encontrada"));

        noticiaExistente.setImagenNoticia(noticia.getImagenNoticia());
        noticiaExistente.setResumenNoticia(noticia.getResumenNoticia());
        noticiaExistente.setTitulo(noticia.getTitulo());
        noticiaExistente.setPublicada(noticia.isPublicada());
        noticiaExistente.setContenidoHtml(noticia.getContenidoHtml());
        noticiaExistente.setFechaPublicacion(noticia.getFechaPublicacion());

        return noticiaRepository.save(noticiaExistente);
    }

    //Consultar Noticia
    public NoticiaDto consultarNoticia(Long id){
        Noticia noticia = noticiaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Noticia no encontrada"));
        return noticiaMapper.toDto(noticia);
    }

    //Consultar Noticias
    public List<Noticia> consultarNoticias(){
        return noticiaRepository.findAll();
    }
}

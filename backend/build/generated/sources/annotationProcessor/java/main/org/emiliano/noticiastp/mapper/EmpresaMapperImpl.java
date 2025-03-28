package org.emiliano.noticiastp.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.emiliano.noticiastp.dto.EmpresaCrearDto;
import org.emiliano.noticiastp.dto.EmpresaDenominacionDto;
import org.emiliano.noticiastp.dto.EmpresaDto;
import org.emiliano.noticiastp.dto.NoticiaDto;
import org.emiliano.noticiastp.model.Empresa;
import org.emiliano.noticiastp.model.Noticia;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-03-27T23:47:45-0300",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.13.jar, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class EmpresaMapperImpl implements EmpresaMapper {

    @Override
    public Empresa toEntity(EmpresaCrearDto empresaCrearDto) {
        if ( empresaCrearDto == null ) {
            return null;
        }

        Empresa empresa = new Empresa();

        empresa.setDenominacion( empresaCrearDto.getDenominacion() );
        empresa.setTelefono( empresaCrearDto.getTelefono() );
        empresa.setHorarioAtencion( empresaCrearDto.getHorarioAtencion() );
        empresa.setQuienesSomos( empresaCrearDto.getQuienesSomos() );
        empresa.setLatitud( empresaCrearDto.getLatitud() );
        empresa.setLongitud( empresaCrearDto.getLongitud() );
        empresa.setDomicilio( empresaCrearDto.getDomicilio() );
        empresa.setEmail( empresaCrearDto.getEmail() );

        return empresa;
    }

    @Override
    public EmpresaDto toEmpresaDto(Empresa empresa) {
        if ( empresa == null ) {
            return null;
        }

        EmpresaDto empresaDto = new EmpresaDto();

        empresaDto.setId( empresa.getId() );
        empresaDto.setDenominacion( empresa.getDenominacion() );
        empresaDto.setTelefono( empresa.getTelefono() );
        empresaDto.setHorarioAtencion( empresa.getHorarioAtencion() );
        empresaDto.setQuienesSomos( empresa.getQuienesSomos() );
        empresaDto.setLatitud( empresa.getLatitud() );
        empresaDto.setLongitud( empresa.getLongitud() );
        empresaDto.setDomicilio( empresa.getDomicilio() );
        empresaDto.setEmail( empresa.getEmail() );
        empresaDto.setNoticias( noticiaListToNoticiaDtoList( empresa.getNoticias() ) );

        return empresaDto;
    }

    @Override
    public EmpresaDenominacionDto toEmpresaDenominacionDto(Empresa empresa) {
        if ( empresa == null ) {
            return null;
        }

        EmpresaDenominacionDto empresaDenominacionDto = new EmpresaDenominacionDto();

        empresaDenominacionDto.setId( empresa.getId() );
        empresaDenominacionDto.setDenominacion( empresa.getDenominacion() );

        return empresaDenominacionDto;
    }

    protected NoticiaDto noticiaToNoticiaDto(Noticia noticia) {
        if ( noticia == null ) {
            return null;
        }

        NoticiaDto noticiaDto = new NoticiaDto();

        noticiaDto.setId( noticia.getId() );
        noticiaDto.setTitulo( noticia.getTitulo() );
        noticiaDto.setResumenNoticia( noticia.getResumenNoticia() );
        noticiaDto.setImagenNoticia( noticia.getImagenNoticia() );
        noticiaDto.setContenidoHtml( noticia.getContenidoHtml() );
        noticiaDto.setPublicada( noticia.isPublicada() );
        noticiaDto.setFechaPublicacion( noticia.getFechaPublicacion() );

        return noticiaDto;
    }

    protected List<NoticiaDto> noticiaListToNoticiaDtoList(List<Noticia> list) {
        if ( list == null ) {
            return null;
        }

        List<NoticiaDto> list1 = new ArrayList<NoticiaDto>( list.size() );
        for ( Noticia noticia : list ) {
            list1.add( noticiaToNoticiaDto( noticia ) );
        }

        return list1;
    }
}

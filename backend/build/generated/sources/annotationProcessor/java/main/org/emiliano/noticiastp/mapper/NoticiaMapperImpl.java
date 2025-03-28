package org.emiliano.noticiastp.mapper;

import javax.annotation.processing.Generated;
import org.emiliano.noticiastp.dto.NoticiaDto;
import org.emiliano.noticiastp.model.Noticia;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-03-27T23:47:44-0300",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.13.jar, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class NoticiaMapperImpl implements NoticiaMapper {

    @Override
    public Noticia toEntity(NoticiaDto noticiaDto) {
        if ( noticiaDto == null ) {
            return null;
        }

        Noticia noticia = new Noticia();

        noticia.setId( noticiaDto.getId() );
        noticia.setTitulo( noticiaDto.getTitulo() );
        noticia.setResumenNoticia( noticiaDto.getResumenNoticia() );
        noticia.setImagenNoticia( noticiaDto.getImagenNoticia() );
        noticia.setContenidoHtml( noticiaDto.getContenidoHtml() );
        noticia.setPublicada( noticiaDto.isPublicada() );
        noticia.setFechaPublicacion( noticiaDto.getFechaPublicacion() );

        return noticia;
    }

    @Override
    public NoticiaDto toDto(Noticia noticia) {
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
}

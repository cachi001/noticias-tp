package org.emiliano.noticiastp.mapper;

import org.emiliano.noticiastp.dto.NoticiaDto;
import org.emiliano.noticiastp.model.Noticia;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NoticiaMapper {

    Noticia toEntity (NoticiaDto noticiaDto);

    NoticiaDto toDto (Noticia noticia);

}

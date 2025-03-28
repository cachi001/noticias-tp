package org.emiliano.noticiastp.mapper;

import org.emiliano.noticiastp.dto.EmpresaCrearDto;
import org.emiliano.noticiastp.dto.EmpresaDenominacionDto;
import org.emiliano.noticiastp.dto.EmpresaDto;
import org.emiliano.noticiastp.model.Empresa;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EmpresaMapper {
    Empresa toEntity(EmpresaCrearDto empresaCrearDto);

    EmpresaDto toEmpresaDto (Empresa empresa);

    EmpresaDenominacionDto toEmpresaDenominacionDto (Empresa empresa);
}

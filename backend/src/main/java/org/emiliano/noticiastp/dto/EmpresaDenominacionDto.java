package org.emiliano.noticiastp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpresaDenominacionDto {

    private Long id;

    private String denominacion;
}

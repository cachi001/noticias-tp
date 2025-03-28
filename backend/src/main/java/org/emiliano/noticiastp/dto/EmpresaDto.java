package org.emiliano.noticiastp.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpresaDto {

    private Long id;

    @NotNull(message = "La denominación es obligatoria")
    private String denominacion;

    @NotNull(message = "El teléfono es obligatorio")
    private String telefono;

    private String horarioAtencion;

    private String quienesSomos;

    @DecimalMin(value = "-90.0", message = "Latitud debe estar entre -90 y 90")
    @DecimalMax(value = "90.0", message = "Latitud debe estar entre -90 y 90")
    private double latitud;

    @DecimalMin(value = "-180.0", message = "Longitud debe estar entre -180 y 180")
    @DecimalMax(value = "180.0", message = "Longitud debe estar entre -180 y 180")
    private double longitud;

    @NotNull(message = "El domicilio es obligatorio")
    private String domicilio;

    @NotNull(message = "El email es obligatorio")
    @Email(message = "Formato de email inválido")
    private String email;

    private List<NoticiaDto> noticias = new ArrayList<>();
}

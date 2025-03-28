package org.emiliano.noticiastp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

@Table(name = "Empresa")
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 128, nullable = false)
    @NotNull(message = "La denominación es obligatoria")
    private String denominacion;

    @Column(length = 50, nullable = false)
    @NotNull(message = "El telefono es obligatoria")
    private String telefono;

    @Column(length = 256)
    private String horarioAtencion;

    @Column(length = 1024)
    private String quienesSomos;

    @DecimalMin(value = "-90.0", message = "Latitud debe estar entre -90 y 90")
    @DecimalMax(value = "90.0", message = "Latitud debe estar entre -90 y 90")
    private double latitud;

    @DecimalMin(value = "-180.0", message = "Longitud debe estar entre -180 y 180")
    @DecimalMax(value = "180.0", message = "Longitud debe estar entre -180 y 180")
    private double longitud;

    @Column(length = 256, nullable = false)
    @NotNull(message = "El domicilio es obligatorio")
    private String domicilio;

    @Column(length = 75, nullable = false)
    @NotNull(message = "El email es obligatorio")
    @Email(message = "Formato de email inválido")
    private String email;

    @OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Noticia> noticias = new ArrayList<>();
}

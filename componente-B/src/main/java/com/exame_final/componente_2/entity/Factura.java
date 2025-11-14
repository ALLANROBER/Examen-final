package com.exame_final.componente_2.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDateTime;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "facturas")
public class Factura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo;
    private double total;
    private LocalDateTime fecha = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proveedor_id")
    private Proveedor proveedor;

    // getters y setters
    public Long getId(){ return id; }
    public void setId(Long id){ this.id = id; }
    public String getCodigo(){ return codigo; }
    public void setCodigo(String codigo){ this.codigo = codigo; }
    public double getTotal(){ return total; }
    public void setTotal(double total){ this.total = total; }
    public LocalDateTime getFecha(){ return fecha; }
    public void setFecha(LocalDateTime fecha){ this.fecha = fecha; }
    public Proveedor getProveedor(){ return proveedor; }
    public void setProveedor(Proveedor proveedor){ this.proveedor = proveedor; }
}

package com.examen_final.examen_final.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "pedidos")
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    private double total;

    private LocalDateTime fechaCreacion = LocalDateTime.now();

    // getters y setters
    public Long getId(){ return id; }
    public void setId(Long id){ this.id = id; }
    public String getCodigo(){ return codigo; }
    public void setCodigo(String codigo){ this.codigo = codigo; }
    public Cliente getCliente(){ return cliente; }
    public void setCliente(Cliente cliente){ this.cliente = cliente; }
    public double getTotal(){ return total; }
    public void setTotal(double total){ this.total = total; }
    public LocalDateTime getFechaCreacion(){ return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion){ this.fechaCreacion = fechaCreacion; }
}

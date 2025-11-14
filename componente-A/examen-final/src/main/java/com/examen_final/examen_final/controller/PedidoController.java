package com.examen_final.examen_final.controller;


import com.examen_final.examen_final.entity.Pedido;
import com.examen_final.examen_final.service.PedidoService;
import com.examen_final.examen_final.shared.Producto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin("*")
public class PedidoController {
    private final PedidoService pedidoService;
    public PedidoController(PedidoService pedidoService){ this.pedidoService = pedidoService; }

    @PostMapping
    public ResponseEntity<Pedido> crearPedido(@RequestParam Long clienteId, @RequestBody List<Producto> productos){
        Pedido creado = pedidoService.crearPedido(clienteId, productos);
        return ResponseEntity.status(201).body(creado);
    }

    @GetMapping
    public ResponseEntity<List<Pedido>> listar(){ return ResponseEntity.ok(pedidoService.listarPedidos()); }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<Pedido>> listarPorCliente(@PathVariable Long clienteId){
        return ResponseEntity.ok(pedidoService.listarPorCliente(clienteId));
    }
}

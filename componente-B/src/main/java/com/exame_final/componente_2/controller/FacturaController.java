package com.exame_final.componente_2.controller;


import com.exame_final.componente_2.entity.Factura;
import com.exame_final.componente_2.service.FacturaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facturas")
public class FacturaController {
    private final FacturaService facturaService;
    public FacturaController(FacturaService facturaService){ this.facturaService = facturaService; }

    @PostMapping
    public ResponseEntity<Factura> crear(@RequestParam Long proveedorId, @RequestParam double total){
        Factura f = facturaService.crearFactura(proveedorId, total);
        return ResponseEntity.status(201).body(f);
    }

    @GetMapping
    public ResponseEntity<List<Factura>> listar(){ return ResponseEntity.ok(facturaService.listar()); }
}

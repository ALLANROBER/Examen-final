package com.exame_final.componente_2.service;

import com.exame_final.componente_2.entity.Factura;
import com.exame_final.componente_2.entity.Proveedor;
import com.exame_final.componente_2.repository.FacturaRepository;
import com.exame_final.componente_2.repository.ProveedorRepository;
import com.exame_final.componente_2.shared.SharedUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacturaService {
    private final FacturaRepository facturaRepo;
    private final ProveedorRepository proveedorRepo;

    public FacturaService(FacturaRepository facturaRepo, ProveedorRepository proveedorRepo){
        this.facturaRepo = facturaRepo;
        this.proveedorRepo = proveedorRepo;
    }

    public Factura crearFactura(Long proveedorId, double total){
        Proveedor p = proveedorRepo.findById(proveedorId).orElseThrow(() -> new RuntimeException("Proveedor no existe"));
        Factura f = new Factura();
        f.setProveedor(p);
        f.setTotal(total);
        f.setCodigo(SharedUtils.generarCodigoUnico("FAC"));

        // Ejemplo flujo circular: intentar ping a Componente A (actuator health)
        try {
            String resp = SharedUtils.pingEndpoint("http://localhost:8081/actuator/health");
            // opcional: registrar resp en logs
            System.out.println("Ping a A: " + resp);
        } catch (Exception e) {
            System.err.println("No se pudo ping a A: " + e.getMessage());
        }

        return facturaRepo.save(f);
    }

    public List<Factura> listar(){ return facturaRepo.findAll(); }
}

package com.examen_final.examen_final.service;

import com.examen_final.examen_final.entity.Cliente;
import com.examen_final.examen_final.entity.Pedido;
import com.examen_final.examen_final.repository.ClienteRepository;
import com.examen_final.examen_final.repository.PedidoRepository;
import com.examen_final.examen_final.shared.Producto;
import com.examen_final.examen_final.shared.SharedUtils;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
@Transactional
@Service
public class PedidoService {
    private final PedidoRepository pedidoRepo;
    private final ClienteRepository clienteRepo;

    public PedidoService(PedidoRepository pedidoRepo, ClienteRepository clienteRepo){
        this.pedidoRepo = pedidoRepo;
        this.clienteRepo = clienteRepo;
    }


    public Pedido crearPedido(Long clienteId, List<Producto> productos){
        Cliente c = clienteRepo.findById(clienteId).orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        Pedido p = new Pedido();
        p.setCliente(c);
        double total = SharedUtils.calcularTotal(productos);
        p.setTotal(total);
        p.setCodigo(SharedUtils.generarCodigoUnico("PED"));
        return pedidoRepo.save(p);
    }

    public List<Pedido> listarPedidos(){ return pedidoRepo.findAll(); }
    public List<Pedido> listarPorCliente(Long clienteId){ return pedidoRepo.findByClienteId(clienteId); }
}

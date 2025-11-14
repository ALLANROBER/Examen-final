package com.examen_final.examen_final.shared;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.UUID;

public class SharedUtils {
    public static double calcularTotal(List<Producto> productos){
        return productos == null ? 0.0 :
                productos.stream().mapToDouble(p -> p.getPrecio() * p.getCantidad()).sum();
    }

    public static String generarCodigoUnico(String tipoEntidad){
        String pref = tipoEntidad == null ? "GEN" : tipoEntidad.toUpperCase();
        return pref + "-" + UUID.randomUUID().toString().substring(0,8);
    }

    public static String pingEndpoint(String url) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest req = HttpRequest.newBuilder()
                .uri(new URI(url))
                .GET()
                .build();
        HttpResponse<String> resp = client.send(req, HttpResponse.BodyHandlers.ofString());
        return resp.body();
    }
}

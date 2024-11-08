document.addEventListener('DOMContentLoaded', function() {
    const productosSelect = document.getElementById('productos');
    const cantidadInput = document.getElementById('cantidad');
    const totalProducto = document.getElementById('total-producto');
    const agregarButton = document.getElementById('agregar');
    const borrarButton = document.getElementById('borrar');
    const resumenCompra = document.getElementById('resumen-compra');
    const totalCompra = document.getElementById('total-compra');
    const nombreProducto = document.getElementById('nombre-producto');

    let resumen = "";
    let total = 0;

    // Actualiza el nombre del producto al seleccionar un producto
    productosSelect.addEventListener('change', function() {
        const productoSeleccionado = productosSelect.options[productosSelect.selectedIndex].text;
        nombreProducto.value = productoSeleccionado;
        actualizarTotalProducto();
    });

    // Actualiza el total del producto al cambiar la cantidad o el producto
    productosSelect.addEventListener('change', actualizarTotalProducto);
    cantidadInput.addEventListener('input', actualizarTotalProducto);

    function actualizarTotalProducto() {
        const precioUnitario = parseFloat(productosSelect.value);
        const cantidad = parseInt(cantidadInput.value) || 0;
        const totalProductoCalculo = precioUnitario * cantidad;

        totalProducto.textContent = `Total del producto: $${totalProductoCalculo}`;
    }

    // Agrega el producto al resumen de la compra
    agregarButton.addEventListener('click', function() {
        const productoSeleccionado = productosSelect.options[productosSelect.selectedIndex].text;
        const precioUnitario = parseFloat(productosSelect.value);
        const cantidad = parseInt(cantidadInput.value) || 0;

        if (productosSelect.value === "0" || cantidad <= 0) {
            alert("Por favor, seleccione un producto y una cantidad válida.");
            return;
        }

        const totalProductoCalculo = precioUnitario * cantidad;
        total += totalProductoCalculo;

        resumen += `${productoSeleccionado} x ${cantidad} = $${totalProductoCalculo}<br>`;
        resumenCompra.innerHTML = resumen;

        totalCompra.textContent = `$${total}`;

        // Mostrar la alerta de éxito
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Producto agregado con éxito",
            showConfirmButton: false,
            timer: 1500
        });

        // Limpia la selección después de agregar
        productosSelect.value = "0";
        nombreProducto.value = "";
        cantidadInput.value = "1";
        totalProducto.textContent = "Total del producto: $0";
    });

    // Borra toda la compra
    borrarButton.addEventListener('click', function() {
        resumen = "";
        total = 0;
        resumenCompra.innerHTML = "";
        totalCompra.textContent = "$0";
        nombreProducto.value = "";
    });
});

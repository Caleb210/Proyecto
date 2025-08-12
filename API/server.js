const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const RouterUsuario = require('./routers/UsuarioRourtes');
const RouterEmpleado = require('./routers/EmpleadoRourtes');
const RouterCliente = require('./routers/ClienteRourtes');
const RouterProveedor = require('./routers/ProveedorRourtes');
const RouterReserva = require('./routers/ReservaRourtes');
const RouterVenta = require('./routers/VentaRourtes');
const RouterPedido = require('./routers/PedidoRouters.js');
const RouterDetallesPedido = require('./routers/DetallesPedidosRouters.js');
const RouterMesa = require('./routers/MesaRouters.js');
const RouterCategorias = require('./routers/CategoriasMenuRouter');
const RouterPlatillos = require('./routers/PlatillosRouter.js');
const RouterIngredientes = require('./routers/IngredientesRouter.js');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/proyecto', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(bodyParser.json());

app.use('/api/usuario', RouterUsuario);
app.use('/api/empleado', RouterEmpleado);
app.use('/api/cliente', RouterCliente);
app.use('/api/proveedor', RouterProveedor);
app.use('/api/reserva', RouterReserva);
app.use('/api/venta', RouterVenta);
app.use('/api/pedidos', RouterPedido); 
app.use('/api/detalles_pedido', RouterDetallesPedido);
app.use('/api/mesa', RouterMesa);
app.use('/api/categorias-menu', RouterCategorias);
app.use('/api/platillos', RouterPlatillos);
app.use('/api/ingredientes', RouterIngredientes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo http://localhost:${PORT}`);
});
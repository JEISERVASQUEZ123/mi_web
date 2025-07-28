document.addEventListener('DOMContentLoaded', () => {
  // TODO TU CÓDIGO DENTRO DE ESTE BLOQUE

  const registroForm = document.getElementById('registroForm');
  const loginForm = document.getElementById('loginForm');
  const mensajeRegistro = document.getElementById('mensajeRegistro');
  const mensajeLogin = document.getElementById('mensajeLogin');
  const bienvenidaUsuario = document.getElementById('bienvenidaUsuario');
  const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
  const listaEntradas = document.getElementById('listaEntradas');
  const filtroEvento = document.getElementById('filtroEvento');
  const eventos = document.querySelectorAll('.evento');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const btnModoOscuro = document.getElementById('modoOscuroBtn');

  // Aplicar modo guardado
  aplicarModoGuardado();

  // Mostrar/Ocultar menú en responsive
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // Registrar usuario
  registroForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const clave = document.getElementById('clave').value;

    localStorage.setItem('usuario', JSON.stringify({ nombre, correo, clave }));
    mensajeRegistro.textContent = '✅ Registro exitoso';
    mensajeRegistro.style.color = 'green';
    registroForm.reset();
  });

  // Iniciar sesión
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const loginCorreo = document.getElementById('loginCorreo').value;
    const loginClave = document.getElementById('loginClave').value;

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario && loginCorreo === usuario.correo && loginClave === usuario.clave) {
      localStorage.setItem('sesionActiva', 'true');
      mostrarUsuario(usuario.nombre);
      mensajeLogin.textContent = '✅ Inicio de sesión exitoso';
      mensajeLogin.style.color = 'green';
      loginForm.reset();
    } else {
      mensajeLogin.textContent = '❌ Correo o contraseña incorrectos';
      mensajeLogin.style.color = 'red';
    }
  });

  // Mostrar usuario si está logueado
  if (localStorage.getItem('sesionActiva') === 'true') {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    mostrarUsuario(usuario.nombre);
  }

  // Cerrar sesión
  cerrarSesionBtn.addEventListener('click', () => {
    localStorage.removeItem('sesionActiva');
    bienvenidaUsuario.textContent = '';
    cerrarSesionBtn.style.display = 'none';
    location.reload();
  });

  // Mostrar nombre de usuario
  function mostrarUsuario(nombre) {
    bienvenidaUsuario.textContent = `👤 Bienvenido, ${nombre}`;
    cerrarSesionBtn.style.display = 'inline-block';
  }

  // Comprar entrada
  document.querySelectorAll('.comprarBtn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const evento = btn.parentElement.querySelector('h3').textContent;
      const lugar = btn.parentElement.querySelector('p').textContent;

      const entrada = document.createElement('div');
      entrada.classList.add('entradaItem');
      entrada.innerHTML = `🎟️ ${evento} - ${lugar}`;
      entrada.style.animation = 'fadeIn 0.5s ease-in-out';
      listaEntradas.appendChild(entrada);

      // Mostrar modal
      const modal = document.getElementById('modalConfirmacion');
      const mensaje = document.getElementById('mensajeConfirmacion');
      mensaje.textContent = `Tu entrada para "${evento}" ha sido registrada correctamente.`;
      modal.style.display = 'flex';
    });
  });

  document.getElementById('cerrarModal').addEventListener('click', () => {
    document.getElementById('modalConfirmacion').style.display = 'none';
  });

  // Filtro de eventos
  filtroEvento.addEventListener('input', () => {
    const texto = filtroEvento.value.toLowerCase();
    eventos.forEach((evento) => {
      const titulo = evento.querySelector('h3').textContent.toLowerCase();
      evento.style.display = titulo.includes(texto) ? 'block' : 'none';
    });
  });

  // Modo oscuro
  btnModoOscuro.addEventListener('click', () => {
    document.body.classList.toggle('oscuro');
    const modo = document.body.classList.contains('oscuro') ? 'activo' : 'inactivo';
    localStorage.setItem('modoOscuro', modo);
    btnModoOscuro.textContent = modo === 'activo' ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
  });

  function aplicarModoGuardado() {
    const modoGuardado = localStorage.getItem('modoOscuro');
    if (modoGuardado === 'activo') {
      document.body.classList.add('oscuro');
      btnModoOscuro.textContent = '☀️ Modo Claro';
    } else {
      document.body.classList.remove('oscuro');
      btnModoOscuro.textContent = '🌙 Modo Oscuro';
    }
  }
});

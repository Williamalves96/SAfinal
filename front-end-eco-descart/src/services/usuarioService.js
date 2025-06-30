const USUARIO_KEY = "usuarioLogado";

export const usuarioService = {
  salvarUsuario: (usuario) => {
    localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
  },

  obterUsuario: () => {
    const usuarioJSON = localStorage.getItem(USUARIO_KEY);
    return usuarioJSON ? JSON.parse(usuarioJSON) : null;
  },

  removerUsuario: () => {
    localStorage.removeItem(USUARIO_KEY);
  },

  estaLogado: () => {
    return !!localStorage.getItem(USUARIO_KEY);
  },

  
};

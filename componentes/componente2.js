var componente2 = Vue.component('fercho', {
    template: `
        <h1>hola {{nombre}}</h1>
    `,
    data: function() {
        return {
            nombre: 'fercho la perra gay'
        }
    }
})

export { componente2 }
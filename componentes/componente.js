var componente = Vue.component('daza', {
    template: `
        <h1>hola {{nombre}}</h1>
    `,
    data: function() {
        return {
            nombre: 'daza gay'
        }
    }
})

export { componente }
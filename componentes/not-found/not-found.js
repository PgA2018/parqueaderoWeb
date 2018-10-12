var notFound = Vue.component('not-found', {
    template: `
    <div class="jumbotron">
  <h1 class="text-danger">ERROR 404</h1>
  <p class="lead">página no encontrada</p>
  <hr class="my-4">
  <p>esté seguro que ingresó a una página válida</p>
  <p class="lead">
  <router-link to="/"><a class="btn btn-success">  volver al inicio</input><router-link>
  </p>
</div>`,
    data: function () {
        return {

        }
    }
})



export { notFound }
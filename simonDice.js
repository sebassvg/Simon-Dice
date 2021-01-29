const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 5

class Juego {
    constructor() {
      this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguenteNivel(),500)
    }
    inicializar(){
      this.siguenteNivel = this.siguenteNivel.bind(this)
      this.elegirColor = this.elegirColor.bind(this)
      this.toggleBtnEmpezar() 
        this.nivel = 1
        this.colores = {
          celeste,
          violeta,
          naranja,
          verde
        }
    }
    toggleBtnEmpezar(){
      if(btnEmpezar.classList.contains('hide')){
        btnEmpezar.classList.remove("hide")
      } else{
        btnEmpezar.classList.add('hide')
      }          
       }
    generarSecuencia() {
      this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4)) //primero tienes la cantidad de arrays y su valor (que es 0) 
    }
    siguenteNivel() {
      this.subnivel = 0
      //this.nombreAtributo = 'valor' //Para agregar atributos siempre que queremos se usa esta regla
      this.iluminarSecuencia()
      this.agregarEventosClick()
    }
    trasformarNumeroAColor(numero){
      switch (numero){
        case 0:
          return 'celeste'
        case 1:
          return 'violeta'
        case 2:
          return 'naranja'
        case 3:
          return 'verde'     
      }
    }

    trasformarColorANumero(color){
      switch (color){
        case 'celeste':
          return 0
        case 'violeta':
          return 1
        case 'naranja':
          return 2
        case 'verde':
          return 3 
      }
    }

    iluminarSecuencia(){
      for (var i = 0; i < this.nivel; i++) { //dentro de los ciclos for no es recomendable utilizar var, sino let 
        const color = this.trasformarNumeroAColor(this.secuencia[i])
        setTimeout(() => this.iluminarColor(color), 1000 * i)
      }
    }
    iluminarColor(color){
      this.colores[color].classList.add('light')
      setTimeout(() => this.apagarColor(color), 350)
    }
    apagarColor(color){
      this.colores[color].classList.remove('light')
    }
    agregarEventosClick(){
      this.colores.celeste.addEventListener('click', this.elegirColor)
      this.colores.verde.addEventListener('click', this.elegirColor)
      this.colores.violeta.addEventListener('click', this.elegirColor)
      this.colores.naranja.addEventListener('click', this.elegirColor)

    }
    eliminarEventosClick(){
      this.colores.celeste.removeEventListener('click', this.elegirColor)
      this.colores.verde.removeEventListener('click', this.elegirColor)
      this.colores.violeta.removeEventListener('click', this.elegirColor)
      this.colores.naranja.removeEventListener('click', this.elegirColor)
    }
    elegirColor(ev) { //cuando se agrega manejadores de evento, los métodos que se llaman lo hacen con un parametro que se suele llamvar ev
      const nombreColor = ev.target.dataset.color 
      const numeroColor = this.trasformarColorANumero(nombreColor)
      this.iluminarColor(nombreColor)
      if (numeroColor === this.secuencia[this.subnivel]) {
        this.subnivel++     
         if(this.subnivel === this.nivel) {
           this.nivel++
           this.eliminarEventosClick()
           if(this.nivel === (ULTIMO_NIVEL + 1)) {
             this.ganoElJuego()
           } else {

             setTimeout(this.siguenteNivel, 1500)

           }

         } 
      } else {
        this.perdioElJuego()
      }
    }
    ganoElJuego(){
      swal('Platzi','Felicitaciones, ganaste el juego', 'success')
      .then(this.inicializar)

    }
    perdioElJuego(){
      swal('Platzi','Lo lamento, perdiste :(', 'error')
      .then(() => {
        this.eliminarEventosClick()
        this.inicializar()
      })

    }
}

function empezarJuego() {
  juego = new Juego()
}
<template>
  <img alt="Logo Bienvenida" src="./assets/home.png">
  <h1>Bienvenidos a la pagina de la ESP32</h1>

  <div>
    <h2>Led 1</h2>
    <div>
      <button class="button-4" @click="led_change">
      <p v-if="led_state">Encender</p>
      <p v-else>Apagar</p>
    </button>
    </div>
    <div class="circulo" id="led1"></div>
  </div>

  <div>
    <div><h2>Intensidad del led 2</h2></div>
    <div> <input @input="pwm_function_r" type="range" id="pwm_r" min="0" max="100" step="5"> <label for="pwm">R</label> </div>
    <div> <input @input="pwm_function_g" type="range" id="pwm_g" min="0" max="100" step="5"> <label for="pwm">G</label> </div>
    <div> <input @input="pwm_function_b" type="range" id="pwm_b" min="0" max="100" step="5"> <label for="pwm">B</label> </div>
    <div class="circulo_pwm" id="led2"></div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue' //Cada componente es una pagina y es importada desde la otra ubicacion
import axios from 'axios' //lib to make http requests

export default{
    data(){
      return{
        count : 0,
        led_state : false,
        pwm_fun: 0,
        r : 50,
        g : 50,
        b : 50, 
      }
    },

    // Methods are functions that mutate state and trigger updates.
    // They can be bound as event listeners in templates.
    methods : {
      increment(){
        this.count++
      },

      led_change(){
        let estado = this.led_state ? "1" : "0";
        this.led_state = !this.led_state;
        //execute post request
        axios.post("/api/gpio",estado).then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });

        if(this.led_state)
          document.getElementById("led1").style.backgroundColor = 'red';
        else
          document.getElementById("led1").style.backgroundColor = 'green';
      },

      update_led_rgb(){
        console.log("R:%s G:%s B:%s",this.r,this.g,this.b);
        let pwm_str = "rgb(";
        pwm_str+= this.r.toString();
        pwm_str+= ",";
        pwm_str+= this.g.toString();
        pwm_str+= ",";
        pwm_str+= this.b.toString();
        pwm_str+= ")";
        document.getElementById("led2").style.backgroundColor = pwm_str;
        //Execute post request
        axios.post("/api/rgb_led",{
          red : parseInt(this.r),
          green : parseInt(this.g),
          blue : parseInt(this.b)
        }).then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
      },

      pwm_function_r(){
        this.r = document.getElementById("pwm_r").value;
        this.update_led_rgb();
      },

      pwm_function_g(){
        this.g = document.getElementById("pwm_g").value;
        this.update_led_rgb();
      },

      pwm_function_b(){
        this.b = document.getElementById("pwm_b").value;
        this.update_led_rgb();
      }

    },
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.button-4 {
      appearance: none;
      background-color: #FAFBFC;
      border: 1px solid rgba(27, 31, 35, 0.15);
      border-radius: 6px;
      box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
      box-sizing: border-box;
      color: #24292E;
      cursor: pointer;
      display: block;
      font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      list-style: none;
      padding: 6px 16px;
      position: relative;
      transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      white-space: nowrap;
      word-wrap: break-word;
      margin-left: auto;
      margin-right: auto;
      width: 60%;
  }

  .button-4:hover {
      background-color: #F3F4F6;
      text-decoration: none;
      transition-duration: 0.1s;
  }

  .button-4:disabled {
      background-color: #FAFBFC;
      border-color: rgba(27, 31, 35, 0.15);
      color: #959DA5;
      cursor: default;
  }

  .button-4:active {
      background-color: #EDEFF2;
      box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
      transition: none 0s;
  }

  .button-4:focus {
      outline: 1px transparent;
  }

  .button-4:before {
      display: none;
  }

  .button-4:-webkit-details-marker {
      display: none;
  }

  .circulo{
      background-color: grey;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: block;
      margin-left: auto;
      margin-right: auto;
  }

  .circulo_pwm{
      background-color: grey;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-left: auto;
      margin-right: auto;
  }

  .pwm{
      display: block;
      margin-left: auto;
      margin-right: auto;
  }

  h1 {text-align: center;}
  h2 {text-align: center;}
  h3 {text-align: center;}
  p {text-align: center;}
</style>

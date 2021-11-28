let monitors = document.querySelectorAll(".monitor");
const container = document.querySelector(".container");
const navblock = document.querySelector(".menu");
let isOpenForm = false;
const socket = new WebSocket('ws://localhost:3000')



const addMonitor = (name) => {
  return `  
  <div data-monitor=${name}  class="monitor ${name}">
  <div class="m-head">
    ${name}<input type="button" class="clean-label close" value="x" id="close"></div>
  <div class="m-body">Body</div>
  <div class="m-footer">Footer</div>
</div>`;
};

const formForAddMonitor = () =>{

  return `
  <div class="frontPanel">
  <div class="form_group">
<form name='form'>
  <div class="form_in">
    <div class="column">
      <label for="nameIn" class="mes_text">Название монитора</label>
      <input type="text" class="btn inp" id="nameIn" name="name">
    </div>
        <div class="column">
      <label for="valFirst" class="mes_text" >Валюта 1</label>
      <input type="text" class="btn inp" id="valFirst" name='valFirst'>
    </div>
    <div class="column">
      <label for="valSecond" class="mes_text" >Валюта 2</label>
      <input type="text" class="btn inp" id="valSecond" name='valSecond'>
    </div>
    <div class="column"><button type="submit" class="button">Добавить</button></div>
  </div>
</form>
</div>
</div>
  `
}

function renderMonitor() {
  if (monitors.length < 4) {
    for (let i = 0; i < monitors.length; i++) {
      monitors[i].style.height = "100%";
      monitors[i].style.width = "100%";
    }
    container.style.flexWrap = "nowrap";
  }

  if (monitors.length > 3 && monitors.length < 5) {
    for (let i = 0; i < monitors.length; i++) {
      monitors[i].style.height = "50%";
      monitors[i].style.width = "50%";
    }
    container.style.flexWrap = "wrap";
  } else if (monitors.length > 4 && monitors.length < 7) {
    for (let i = 0; i < monitors.length; i++) {
      monitors[i].style.height = "50%";
      monitors[i].style.width = "33.3333%";
    }
    container.style.flexWrap = "wrap";
  } else if (monitors.length > 6 && monitors.length < 9) {
    for (let i = 0; i < monitors.length; i++) {
      monitors[i].style.height = "50%";
      monitors[i].style.width = "25%";
    }
    container.style.flexWrap = "wrap";
  }
}


if(monitors.length)renderMonitor()

navblock.addEventListener("click", (e) => {
  console.log(e.target);

  if (e.target.id === "main") {
    window.location.pathname = "/";
  }
  if (e.target.id === "signin") {
    window.location.pathname = "/signin";
  }
  if (e.target.id === "signup") {
    window.location.pathname = "/signup";
  }
  if (e.target.id === "exit") {
    window.location.pathname = "/exit";
  }
  if (e.target.id === "lk") {
    window.location.pathname = "/lk";
  }
  if (e.target.id === "add") {
    monitors = document.querySelectorAll(".monitor")
if(monitors.length<8){
  if(!isOpenForm){
    add()
    isOpenForm = true;
  }
}
else{
  alert("максимальное количество мониторов")
}
    
  }
});

container.addEventListener("click", (e) => {
  if (e.target.value === "x") {
    const monik = e.target.closest("[data-monitor]");
    monik.remove();
    monitors = document.querySelectorAll(".monitor");
    renderMonitor();
  }
});

const add = () =>{
  container.insertAdjacentHTML("beforeend",formForAddMonitor());
  const frontPanel = document.querySelector(".frontPanel")
  form = document.forms.form
  form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const inputData = Object.fromEntries(new FormData(form));
    
    frontPanel.remove();
    isOpenForm = false;
    container.insertAdjacentHTML("beforeend",addMonitor(inputData.name));
    monitors = document.querySelectorAll(".monitor")
    renderMonitor()
    const monik = document.querySelector(`.${inputData.name}`)
    console.log("начало работы сокетов");
    socket.send(JSON.stringify(inputData))

    socket.onmessage = function(event){
      const parsed = JSON.parse(event.data)
      console.log(parsed.data);
      monik.querySelector(".m-body").innerHTML = `<div class="binance">
<div>
<h1>ПАРА: ${parsed.data.s}</h1>
<h1>ЦЕНА: ${parsed.data.c}</h1>
<h1>ДРУГАЯ ЦЕНА: ${parsed.data.h}</h1>
<h1>КАКИЕ ТО ЦИФРЫ ${parsed.data}</h1>
</div>
<div class=""graph">
ГРАФИК
</div>
    </div>
    `

    }

    // socket.onopen = function () {
    //   socket.send(
    //     JSON.stringify({
    //       type: 'CHAT_CONNECT',
    //     }),
    //   )
    //   socket.onmessage = function (message) {
    //     console.log("otpavka");
    //     const parsed = JSON.parse(message.data)
    //     console.log('message on front', parsed)
    //     // switch (parsed.type) {
    //     //   case 'NEW_MESSAGE':
    //     //     const { name, message: memberMsg } = parsed.payload
    //     //     const memberMessageStr = `<p><b>${name}:</b> ${memberMsg}</p>`
    //     //     $chat.insertAdjacentHTML('beforeend', memberMessageStr)
    //     //     break
    
    //     //   case 'CHAT_CONNECT':
    //     //     const { name: newMember, id: memberId } = parsed.payload
    
    //     //     const messageStr = `<p>${newMember} joined the chat</p>`
    //     //     $chat.insertAdjacentHTML('beforeend', messageStr)
    
    //     //     console.log(newMember)
    //     //     break
    //     //   default:
    //     //     break
    //     // }
    //   }
    // }



  })

}




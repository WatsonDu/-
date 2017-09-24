let loadMoreButton = document.querySelector('#loadMoreButton')

let album = document.querySelector('album')
let list = document.querySelector('.album>.list')

let li = document.createElement('li')

let div = document.createElement('div')
div.className = 'oneToOne'

let img = document.createElement('img')

let n = 1

function YYY(){
    
    let request = new XMLHttpRequest()
    
    request.open('GET',`./page-${n+1}.html`)
    
    request.onload = function(){
        n += 1

        let response = request.responseText
        
        let data = window.JSON.parse(response)
        console.log(data.content)
        for(let i = 0;i< data.content.length;i++){
            let li =`
            <li>
              <img src="${data.content[i].url}">
              <h3>${data.content[i].title}</h3>
              <p>${data.content[i].text}</p>
            </li>
            ` 
            list.insertAdjacentHTML('beforeend',li);
        }
    
        if(data.hasNextPage === false){
            loadMoreButton.disabled = true
            loadMoreButton.textContent = '没了'
        }
    }
    request.send()
}
loadMoreButton.onclick = YYY
window.onscroll = function(){
  var doc = document.documentElement;
  var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
  var clientHeight = doc.clientHeight
  var viewportOffset = loadMoreButton.getBoundingClientRect();
  var buttonTop = viewportOffset.top;
  if(buttonTop > clientHeight - 50){

  }else{
      YYY()
  }
}

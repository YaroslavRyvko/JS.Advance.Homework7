let searchInput = document.querySelector('.searchInput');
let searchBtn = document.querySelector('.searchBtn');
let main = document.querySelector('main');

searchBtn.addEventListener('click', () => {
    getData()
        .then(data => render(data))
        .catch(err => console.log('Movie not Found'))
})

async function getData() {
    let searchValue = searchInput.value;
    const response = await fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=9a7c54ab`);
    const body = await response.json();
    return body;
}

function render(data) {
    main.innerHTML = " ";
    for (let i = 0; i < 8; i++) {
        getData2()
            .then(data2 => render2(data2))
            .catch(err => console.log('Movie not Found'));
        async function getData2() {
            let response = await fetch(`http://www.omdbapi.com/?i=${data.Search[i].imdbID}&apikey=9a7c54ab`);
            let body = await response.json();
            return body;
        }

        function render2(data2) {
            let r = "";
            for (let j = 0; j < data2.Ratings.length; j++) {
                r += `${data2.Ratings[j].Source} ${data2.Ratings[j].Value} <br>`;
            }
            main.innerHTML +=
                `
         <div class="card">
            <img src="${data.Search[i].Poster}" class="card-img-top" alt="...">
              <div class="card-body">
                  <div class="title">
                      <h5 class="card-title">${data.Search[i].Title}</h5>
                  </div>
                  <p class="card-text">${data.Search[i].Type}</p>
                  <p class="card-text">${data.Search[i].Year}</p>
                  <input type="button" class="btn btn-success detailsBtn" value="More details"data-bs-toggle="modal" data-bs-target="#q${i}">
                      </div>
                      </div>
                      <div class="modal fade" id="q${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                        <div class="modal-content">
                         <div class="modal-body">
                             <div class="container">
                                 <div class="detailsImage" style="background-image:url(${data2.Poster})">
                                 </div>
                                 <div class="detailsInfo">
                                     <div class="detailsTitle">${data2.Title}</div>
                                     <div class="detailsText">
                                         <p class="style_p">${data2.Rated} ${data2.Year} ${data2.Genre}</p>
                                         <p>${data2.Plot}</p>
                                         <p><b>Written by: </b>${data2.Writer}</p>
                                         <p><b>Directory by: </b>${data2.Director}</p>
                                         <p><b>Starring: </b>${data2.Actors}</p>
                                         <p><b>BoxOffice: </b>${data2.BoxOffice}</p>
                                         <p><b>Awards: </b>${data2.Awards}</p>
                                         <p><b>Ratings:</b><br>${r}                           
                                         </p>
                                     </div>
                                 </div>
                             </div>
                         </div>
                        </div>                
                      </div>`
        }
    }
}

const resetBtn = document.querySelector('.resetBtn');
searchInput.addEventListener('focus', () => {
    resetBtn.style.display = 'block';
});
searchInput.addEventListener('blur', () => {
    resetBtn.style.display = 'none';
});
resetBtn.addEventListener('mousedown', () => {
    searchInput.value = '';
})
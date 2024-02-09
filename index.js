
const btnsearchEl=document.getElementById("get-results");
const gotomywatch=document.getElementById("my-watchlist");
const divresults=document.getElementById("result-movies");
let mywatchlist=[];

//localStorage.clear();


btnsearchEl.addEventListener("click", function(e)
{
    localStorage.clear();
   let searchtext=document.getElementById("search-text");
    //console.log(searchtext.value);
    
    let myurl=`https://www.omdbapi.com/?apikey=58f96bc1&s=${searchtext.value}`;
    //console.log(myurl);
      let html='';
    fetch(myurl)
        .then(response=>response.json())
        .then(data=>
        {
            let mitems=data.Search;
          
            mitems.map((item)=>{
                let itemurl=`https://www.omdbapi.com/?apikey=58f96bc1&i=${item.imdbID}`;
                //console.log("1",html);
                fetch(itemurl)
                    .then(response=>response.json())
                    .then(itemdata=>{
                        divresults.innerHTML+=
                        `   <section class="movie-item">
                                <div id="img-div">
                                    <img src="${itemdata.Poster}"/>
                                </div>
                                <div id="movieinfo">
                                    <div class="movie-info1">
                                        <h5>${itemdata.Title}</h5>
                                        <span>*${itemdata.imdbRating} </span>
                                    </div>
                                    <div class="movie-info2">
                                        <p>${itemdata.Runtime}</p>
                                        <p>${itemdata.Genre}</p>
                                        <div id="watchgrp-${item.imdbID}">
                                            <button data-movieid=${item.imdbID} data-btntype="add">+</button>
                                            <span>Watchlist</span>
                                        </div>
                                        <div class="divdisplay" id="removegrp-${item.imdbID}">
                                            <button data-movieid=${item.imdbID} data-btntype="remove">-</button>
                                            <span>Remove</span>
                                        </div>
                                    </div>
                                    <div class="movie-info3">
                                        <p>${itemdata.Plot}</p>
                                    </div>
                                </div>
                            </section>
                          
                            `
                    })
              //  console.log("2",html);
            })
      
        });
});

document.addEventListener("click", function(e){
    
    if(e.target.dataset.movieid && e.target.dataset.btntype==="add"){
        //console.log("add",e.target.dataset.movieid);
        mywatchlist.push(e.target.dataset.movieid);
        //Visibility
        let watchdivEl=document.getElementById(`watchgrp-${e.target.dataset.movieid}`);
        watchdivEl.style.display='none';
        
        let removedivEl=document.getElementById(`removegrp-${e.target.dataset.movieid}`);
        removedivEl.classList.toggle("divdisplay");
        
        //console.log("Array",mywatchlist);
    }
    
    if(e.target.dataset.movieid && e.target.dataset.btntype==="remove"){
        //console.log("remove",e.target.dataset.movieid);
        mywatchlist =mywatchlist.filter(function(item){
            return item!= e.target.dataset.movieid;
        } );
        //Visibility
        let watchdivEl=document.getElementById(`watchgrp-${e.target.dataset.movieid}`);
        watchdivEl.style.display='block';
        
        let removedivEl=document.getElementById(`removegrp-${e.target.dataset.movieid}`);
        removedivEl.classList.toggle("divdisplay");
        //console.log("Array",mywatchlist);
    }
    
    if(e.target.dataset.movieid && e.target.dataset.btntype==="removefromlocal"){
        //console.log("remove from local",e.target.dataset.movieid);
        let retrievedlocal=[];
        retrievedlocal=JSON.parse(localStorage.getItem("watchlist"));
        
        retrievedlocal =retrievedlocal.filter(function(item){
            return item!= e.target.dataset.movieid;
        } );
        localStorage.setItem("watchlist",JSON.stringify(retrievedlocal))
        //console.log("localstorage",retrievedlocal);
        document.getElementById("my-movies").innerHTML='';
        GetMywatchlist();
    }
    
    if(e.target.id==="my-watchlist"){
       // console.log(e.target.id);
       // localStorage.setItem("local-watchlist",mywatchlist)
        
        let searchdiv=document.getElementById("div-search-movies");
        //console.log(searchdiv);
        searchdiv.style.display='none';
        
        let mywatchdiv=document.getElementById("div-watch-list");
        mywatchdiv.classList.toggle("mywatchdisplay");
        
        GetMywatchlist();
    }
    
    if(e.target.id==="search-movies"){
        e.preventDefault();
         let searchdiv=document.getElementById("div-search-movies");
        //console.log(searchdiv);
        searchdiv.style.display='block';
        
        let mywatchdiv=document.getElementById("div-watch-list");
        mywatchdiv.classList.toggle("mywatchdisplay");
    }
})

function GetMywatchlist()
{
    let retrievedlocal=[];
    retrievedlocal=JSON.parse(localStorage.getItem("watchlist"));
   // console.log("Retrieved",retrievedlocal);
    
    
    let fillwatchlistDiv=document.getElementById("my-movies");
    for (let i=0; i<retrievedlocal.length; i++ )
    {
        let itemurl=`https://www.omdbapi.com/?apikey=58f96bc1&i=${retrievedlocal[i]}`;
                //console.log(itemurl);
                fetch(itemurl)
                    .then(response=>response.json())
                    .then(itemdata=>
                    {
                        fillwatchlistDiv.innerHTML+=
                        `   <section class="movie-item">
                                <div id="img-div">
                                    <img src="${itemdata.Poster}"/>
                                </div>
                                <div id="movieinfo">
                                    <div class="movie-info1">
                                        <h5>${itemdata.Title}</h5>
                                        <span>*${itemdata.imdbRating} </span>
                                    </div>
                                    <div class="movie-info2">
                                        <p>${itemdata.Runtime}</p>
                                        <p>${itemdata.Genre}</p>
                                       
                                        <div id="removemywatch-${retrievedlocal[i]}">
                                            <button data-movieid=${retrievedlocal[i]} data-btntype="removefromlocal">-</button>
                                            <span>Remove</span>
                                        </div>
                                    </div>
                                    <div class="movie-info3">
                                        <p>${itemdata.Plot}</p>
                                    </div>
                                </div>
                            </section>
                            `
                      });
    }
    
}

gotomywatch.addEventListener("click",function(e){
    e.preventDefault();
    //console.log("Hello");
    if(mywatchlist){
        localStorage.setItem("watchlist",JSON.stringify(mywatchlist));
       // console.log("watchlist",localStorage.getItem("watchlist"));
    }
    
})

    
    
    //http://www.omdbapi.com/?t=blade+runner
    /*
    <section class="movie-item">
            <div id="img-div">
                <img src="images/poster.jpg"/>
            </div>
            <div id="movieinfo">
                    <div class="movie-info1">
                        <h5>Blade Runner</h5>
                        <span>* 8.1 </span>
                    </div>
                    <div class="movie-info2">
                        <p>117 min</p>
                        <p>Action, Drama, Sci-fic </p>
                        <div>
                            <button>+</button>
                            <span>Watchlist</span>
                        </div>
                    </div>
                    <div class="movie-info3">
                        <p>A blade runner must pursue and terminate four replicats who stole a ship in space, and have returned to earth to find their creator</p>
                    </div>
            </div>
        </section>
        
    */
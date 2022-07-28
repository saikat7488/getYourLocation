const locationDetect = document.getElementById("locationDetect");


window.onload = function(){
    locationDetect.addEventListener("click", function(){
       if(navigator.geolocation){
        locationDetect.innerHTML=`Allow to detect your location`;
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
       }else{
          locationDetect.innerHTML=`Try With Chrome browser`;
       }
    })
}

function onSuccess(currentLocation){
    locationDetect.innerHTML=`Detecting your Location.....`;
    let {latitude, longitude} = currentLocation.coords;
    let url =`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=408b9751c5204f6daa8e40ec7593cc92`;
    console.log(url);
    fetch(url)
    .then((res) => {
        if(!res.ok){
            const errorMessage = `Error : ${res.status}`;
            throw new Error(errorMessage);
        }
        return res.json();
    })
    .then((data) => {
        //Output show in console allso....
        console.table(data.results[0].components);

        let {road, city, country, state, state_code, state_district, suburb} =  data.results[0].components;
        locationDetect.innerHTML=`${road}, ${suburb}, ${state_district}, ${state}, ${city} ${country}.`;
    })
    .catch((error) => {
       locationDetect.innerHTML= `${error}`;
    })
}

function onError(error){
    if(error.code == 1){
        locationDetect.innerHTML =`User denied Geolocation`;
    }else if(error.code == 2){
        locationDetect.innerHTML =`User denied Geolocation`;
    }else{
        locationDetect.innerHTML =`Error detcet from Client Side`;
    }
    locationDetect.setAttribute("disabled", true);
}
$(document).ready( function(){
	//efecto splash
	$('#containerSplash').hide(8000);
	$('.init').show(500);
	//$('.content').hide() //esconder el content

	$('.sectn-movie').hide();//esconder sección perfil película en sí
	$('.sectn-profile').hide();//esconder sección perfil
  $('.sectn-contacts').hide();//esconder seccion amigos
  $('.sectn-add-contacts').hide();//esconder seccion agregar amigos
});//final funcion.ready...no tocar*/

$('#profile').click( function(){
	$('.sectn-profile').show();
	$('.sectn-pop-movies').hide();
	$('.sectn-movie').hide();
  $('.sectn-contacts').hide();
  $('.sectn-add-contacts').hide();
});//final función.click menu perfil nav...no tocar

$('#logo-home').click( function(){
	$('.sectn-pop-movies').show();
	$('.sectn-profile').hide();
	$('.sectn-movie').hide();
  $('.sectn-contacts').hide();
  $('.sectn-add-contacts').hide();
});//final función.click logo-home header ...no tocar

$('#logo-user').click( function(){
	$('.sectn-profile').show();
	$('.sectn-pop-movies').hide();
	$('.sectn-movie').hide();
  $('.sectn-contacts').hide();
  $('.sectn-add-contacts').hide();
});//final función.click logo-user header ...no tocar

$('.img-pop-movie').click( function(){
	$('.sectn-movie').show();
	$('.sectn-pop-movies').hide();
	$('.sectn-profile').hide();
  $('.sectn-contacts').hide();
  $('.sectn-add-contacts').hide();
});//final función.click pop movie ...no tocar

$('.contacts').click( function(){
  $('.sectn-contacts').show();
  $('.sectn-pop-movies').hide();
  $('.sectn-profile').hide();
  $('.sectn-movie').hide();
  $('.sectn-add-contacts').hide();
});//final función.click menu amigos nav ...no tocar

$('.btn-search-friends').click( function(){//para buscar amigos
  $('.sectn-add-contacts').show();
  $('.sectn-pop-movies').hide();
  $('.sectn-profile').hide();
  $('.sectn-movie').hide();
  $('.sectn-contacts').hide();
});//final función.click boton buscar amigos nav ...no tocar

//Al hacer click en el boton de registro con google:
document.getElementById('btnsignUp').addEventListener('click',GoogleSignUp, false);
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCdK7laKVDh6CC4E9yNT_YEHu1wL5JO5-8",
  authDomain: "hackathon-32c71.firebaseapp.com",
  databaseURL: "https://hackathon-32c71.firebaseio.com",
  projectId: "hackathon-32c71",
  storageBucket: "hackathon-32c71.appspot.com",
  messagingSenderId: "194945642297"
};
firebase.initializeApp(config);

//función de ingreso con google
var token = 'none';
var user = 'none';
var email = 'none';
function GoogleSignUp(){
  if (!firebase.auth().currentUser){  //para saber si el usuario se ha conectado
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      token = result.credential.accessToken;
      user = result.user;
			email = user.email;
      $('.init').hide() && $('.content').show();
			//agregar la imagen de perfil del usuario al header
			$('#logo-user').append(
				'<img class="img-responsive img-rounded pull-right img img-logo" alt="Responsive image" src="'+ user.photoURL +'">'
			)
      //sacar el nombre de usuario
			console.log(email);
      //console.log(user.displayName);
      //sacar la foto de usuario
      //console.log(user.photoURL);
    }).catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      var errorEmail = error.email;
      var credencial = error.credencial;
      //console.log(errorCode);
      if(errorCode === 'auth/account-exists-with-different-credential'){
        alert('Es el mismo usuario');
      }
    });
  }else{
    firebase.auth().signOut();
  }
}
//función para usar la API de imbd
function apiCall(movie){
	$.getJSON('https://www.omdbapi.com/?apikey=3a181f1c&t=' + encodeURI(movie)).then(function(response){
    console.log(response);
    if(response.Title != undefined){
        $('.sectn-movie').html(''); //limpiamos el contenedor
        //dentro de acá debo sacar todos los objetos
        $('.sectn-movie').append(
					'<div class="container-fluid">' +
					'<div class="row">' +
					'<div class="col col-xs-12 col-sm-12 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">' +
          '<img class="img-responsive img-thumbnail center-block img img-movie" src=' + response.Poster + '>' +
					'<h4 class="text-center"id="rating">' + response.Title +'</h4>' +
					'<h5 class="text-center"><strong>' + response.Year + '</strong></h5>' +
					'<h5 class="text-center"><strong>Puntuación de la película: </strong>' + response.imdbRating + '</h5>' +
					'<p class="text-center">' + response.Plot + '</p>' +
					'<button class="btn btn-default center-block btn-movie" type="submit"><strong>Agregrar a favoritas</strong></button>' +
					'<br>' +
					'<br>' +
					'<br>' +
					'</div>' +
					'</div>' +
					'</div>'
          )
      }
      //guardar las peliculas vistas por el usuario en firebase
      $('.btn-movie').click(function(){
          movieData.push({
						title:response.Title,
						year: response.Year,
						plot:response.Plot,
            posterMovie:response.Poster,
            ratingImdb:response.imdbRating,
          	userID:user.email,
            //user:user.displayName,
            //profile:user.photoURL,
            idImdb: response.imdbID
          })
      });
    })
}
//hago click en el buscador de peliculas
  $('#submit-movie').click(function(){
    var movieSearch = $('#searching').val();
    apiCall(movieSearch);
		$('.sectn-movie').show();
		$('.sectn-pop-movies').hide();
		$('.sectn-profile').hide();
    //console.log(apiCall(movieSearch));
  });
//guardar en una variable la data de firebase
var movieData = firebase.database().ref('movies');
//construir el perfil de usuario
$('#logo-user').click(function(){
	$('.sectn-profile').html(''); //limpiamos el contenedor
	$('.sectn-profile').append(
		'<div class="container-fluid">' +
		'<div class="row">' +
		'<div class="col col-xs-12 col-sm-12 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">' +
		'<img class="img-responsive img-rounded center-block img-profile" src="' + user.photoURL + '">' +
		'<h4 class="text-center"><strong>' + user.displayName + '</strong></h4>' +
		'<h5 class="text-center movie-cont"><strong>Películas vistas: </strong></h5>' +
		'</div>' +
		'</div>' +
		'<div class="row">' +
		'<div class="col col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
		'<h4 class="text-center"><strong>Tus películas favoritas</strong></h4>' +
		'</div>' +
		'</div>' +
		'<div class="row movie-profile">' +
		'</div>' +
		'</div>'
	)
	movieData.orderByChild("userID").equalTo(user.email).on("value", function(snapshot){
		var cont = 0;
		snapshot.forEach(function(e){
			cont ++;
			var Objeto = e.val();
			if(Objeto!=null){
				$('.movie-profile').append(
					'<div class="col col-xs-6 col-sm-6 col-md-3 col-lg-3">' +
					'<a href="#"><img class="img-responsive img-rounded pull-left img img-profile-movie" name="'+ Objeto.idImdb +'" src="'+ Objeto.posterMovie +'"></a>' +
					'</div>'
			)
			}
		});
		$('.movie-cont').append(
			cont
		)
		$('.img-profile-movie').click(function(){
		console.log('hola');
		var imgVal = $(this).attr('name');
		console.log(imgVal);
		$('.sectn-movie').show();
		$('.sectn-pop-movies').hide();
		$('.sectn-profile').hide();
		$('.sectn-movie').html(''); //limpiamos el contenedor
		//dentro de acá debo sacar todos los objetos
		movieData.orderByChild("idImdb").equalTo(imgVal).on("value", function(snapshot){
			snapshot.forEach(function(e){
				var Objeto = e.val();
				if(Objeto!=null){
					$('.sectn-movie').append(
						'<div class="container-fluid">' +
						'<div class="row">' +
						'<div class="col col-xs-12 col-sm-12 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">' +
						'<img class="img-responsive img-thumbnail center-block img img-movie" src=' + Objeto.posterMovie + '>' +
						'<h4 class="text-center">' +  Objeto.title +'</h4>' +
						'<h5 class="text-center"><strong>' +  Objeto.year + '</strong></h5>' +
						'<h5 class="text-center"><strong>Puntuación de la película: </strong>' +  Objeto.ratingImdb + '</h5>' +
						'<p class="text-center">' +  Objeto.plot + '</p>' +
						'<br>' +
						'<br>' +
						'<br>' +
						'</div>' +
						'</div>' +
						'</div>'
						)
				}
			});
		});
	});
})
})

$('.btn-profile').click(function(){

});

/* Efecto 2

$(function(){
  setTimeout(function() {
    $('#containerSplash').fadeOut(5000);
  }, 500);
});

$(function(){
   setTimeout(function() {
    $('.init').removeClass('hidden');
  }, 2000);
});*/

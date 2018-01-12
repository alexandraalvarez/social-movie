$(document).ready( function(){
	firebase.auth().signOut();
	 /* Efecto splash */
$(function(){
   setTimeout(function() {
     $('#containerSplash').fadeOut(5000);
   }, 500);
  });
 
 $(function(){
    setTimeout(function() {
     $('.init').removeClass('hidden');
   }, 2000);
 }); 

	$('.sectn-movie').hide();//esconder sección perfil película en sí
	$('.sectn-profile').hide();//esconder sección perfil
  $('.sectn-contacts').hide();//esconder seccion amigos
  $('.sectn-add-contacts').hide();//esconder seccion agregar amigos
});//final funcion.ready...no tocar*/

$('.profile').click( function(){
	$('.sectn-profile').show();
	$('.sectn-pop-movies').hide();
	$('.sectn-movie').hide();
  $('.sectn-contacts').hide();
  $('.sectn-add-contacts').hide();
});//final función.click menu perfil nav...no tocar

$('.logo-home-headr').click( function(){
	$('.sectn-pop-movies').show();
	$('.sectn-profile').hide();
	$('.sectn-movie').hide();
  $('.sectn-contacts').hide();
  $('.sectn-add-contacts').hide();
});//final función.click logo-home header ...no tocar

$('.logo-user').click( function(){
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
//guardar los usuarios que se registren
var userData = firebase.database().ref('users');
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
			$('.logo-user').append(
				'<img class="img-responsive img-rounded pull-right img img-logo" alt="Responsive image" src="'+ user.photoURL +'">'
			)
      //guardar el nombre de usuario en firebase
			console.log(email);
			userData.orderByChild("email").equalTo(user.email).on("value", function(snapshot){
				console.log(snapshot.val());
					if(snapshot.val()===null){
						console.log("Nuevo Usuario");
						userData.push({
							photo: user.photoURL,
							name: user.displayName,
							email: user.email
						});
					}else{
						console.log("Usuario Existente");
					}
			});
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
//pantalla de películas populares
$('#btnsignUp').click(function(){
	$('.movies-pop').html('');
	movieData.once('value', function(snapshot){
		var repit = false;
		var array = [];
    snapshot.forEach(function(e){
    var Objeto = e.val();
    console.log(Objeto);
		var imbdRating = parseInt(Objeto.ratingImdb);
		//console.log(imbdRating);
		for (var i = 0; i< array.length; i++){
			if (array[i] === Objeto.idImdb){
				repit = true;
			}
		}
    if(imbdRating >= 7 && repit ===false){
					$('.movies-pop').append(
						'<div class="col col-xs-6 col-sm-6 col-md-3 col-lg-3">' +
						'<a href="#"><img class="img-responsive img-rounded pull-left img img-home-movie" name="'+ Objeto.idImdb +'" src="'+ Objeto.posterMovie +'"></a>' +
						'</div>'
					)
				}
			array.push(Objeto.idImdb);
			});
			$('.img-home-movie').click(function(){
				var imgVal = $(this).attr('name');
				//console.log(imgVal);
				$('.sectn-movie').show();
				$('.sectn-pop-movies').hide();
				$('.sectn-profile').hide();
				$('.sectn-movie').html(''); //limpiamos el contenedor
				//dentro de acá debo sacar todos los objetos
				var onlyOne = false;
				var objetoTrue = null;
				movieData.orderByChild("userID").equalTo(user.email).on("value", function(snapshot){
					snapshot.forEach(function(e){
					var Objeto = e.val();
					console.log(Objeto.idImdb);
					console.log(imgVal);
					if(Objeto.idImdb === imgVal){
						console.log("es trurr");
						onlyOne = true;
						objetoTrue = Objeto;
					}
					});
					if(onlyOne === true){
						$('.sectn-movie').append(
							'<div class="container-fluid">' +
							'<div class="row">' +
							'<div class="col col-xs-12 col-sm-12 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">' +
							'<img class="img-responsive img-thumbnail center-block img img-movie" src=' + objetoTrue.posterMovie + '>' +
							'<h4 class="text-center">' +  objetoTrue.title +'</h4>' +
							'<h5 class="text-center"><strong>' +  objetoTrue.year + '</strong></h5>' +
							'<h5 class="text-center"><strong>Puntuación de la película: </strong>' +  objetoTrue.ratingImdb + '</h5>' +
							'<p class="text-center">' +  objetoTrue.plot + '</p>' +
							'</div>' +
							'</div>' +
							'</div>'
							)
					} else{
						movieData.orderByChild("idImdb").equalTo(imgVal).once("value", function(snapshot){
							snapshot.forEach(function(e){
							objetoTrue = e.val();
							})
						$('.sectn-movie').append(
							'<div class="container-fluid">' +
							'<div class="row">' +
							'<div class="col col-xs-12 col-sm-12 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">' +
							'<img class="img-responsive img-thumbnail center-block img img-movie" src=' + objetoTrue.posterMovie + '>' +
							'<h4 class="text-center">' +  objetoTrue.title +'</h4>' +
							'<h5 class="text-center"><strong>' +  objetoTrue.year + '</strong></h5>' +
							'<h5 class="text-center"><strong>Puntuación de la película: </strong>' +  objetoTrue.ratingImdb + '</h5>' +
							'<p class="text-center">' +  objetoTrue.plot + '</p>' +
							'<button class="btn btn-default center-block btn-movie" type="submit"><strong>Agregrar a favoritas</strong></button>' +
							'</div>' +
							'</div>' +
							'</div>'
						)
						//guardar las peliculas vistas por el usuario en firebase
						$('.btn-movie').click(function(){
							movieData.push({
								title:objetoTrue.title,
								year:  objetoTrue.year,
								plot: objetoTrue.plot,
								posterMovie:objetoTrue.posterMovie,
								ratingImdb:objetoTrue.ratingImdb,
								userID:user.email,
								//user:user.displayName,
								//profile:user.photoURL,
								idImdb: imgVal
							})
						});
					})
				}
			});
			});
		})
  })
//guardar en una variable la data de firebase
var movieData = firebase.database().ref('movies');
//función para usar la API de imbd
function apiCall(movie){
	$.getJSON('https://www.omdbapi.com/?apikey=3a181f1c&t=' + encodeURI(movie)).then(function(response){
    //poner la película en la página en donde se muestra sola
		var onlyOne = false;
		movieData.on('value', function(snapshot){
	    snapshot.forEach(function(e){
	    var Objeto = e.val();
			if(Objeto.idImdb === response.imdbID){
				onlyOne = true;
			}
			if(onlyOne === true){
				//la película ya está registrada
				$('.sectn-movie').html(''); //limpiamos el contenedor
				$('.sectn-movie').append(
					'<div class="container-fluid">' +
					'<div class="row">' +
					'<div class="col col-xs-12 col-sm-12 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">' +
					'<img class="img-responsive img-thumbnail center-block img img-movie" src=' + response.Poster + '>' +
					'<h4 class="text-center"id="rating">' + response.Title +'</h4>' +
					'<h5 class="text-center"><strong>' + response.Year + '</strong></h5>' +
					'<h5 class="text-center"><strong>Puntuación de la película: </strong>' + response.imdbRating + '</h5>' +
					'<p class="text-center">' + response.Plot + '</p>' +
					//'<button class="btn btn-default center-block btn-movie" type="submit"><strong>Agregrar a favoritas</strong></button>' +
					'</div>' +
					'</div>' +
					'</div>'
					)
			} else {
				//película no registrada
				$('.sectn-movie').html(''); //limpiamos el contenedor
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
					'</div>' +
					'</div>' +
					'</div>'
					)
			}
			});
		});

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
		console.log(movieSearch);
    apiCall(movieSearch);
		$('.sectn-movie').show();
		$('.sectn-pop-movies').hide();
		$('.sectn-profile').hide();
    //console.log(apiCall(movieSearch));
  });
	//hago click en el buscador de peliculas
	  $('#search2').click(function(){
	    var movieSearch = $('#searching2').val();
			console.log(movieSearch);
	    apiCall(movieSearch);
			$('.sectn-movie').show();
			$('.sectn-pop-movies').hide();
			$('.sectn-profile').hide();
	    //console.log(apiCall(movieSearch));
	  });


//construir el perfil de usuario
$('.logo-user').click(function(){
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
		var imgVal = $(this).attr('name');
		console.log(imgVal);
		$('.sectn-movie').show();
		$('.sectn-pop-movies').hide();
		$('.sectn-profile').hide();
		$('.sectn-movie').html(''); //limpiamos el contenedor
		//dentro de acá debo sacar todos los objetos
		var Objeto;
		movieData.orderByChild("idImdb").equalTo(imgVal).on("value", function(snapshot){
			snapshot.forEach(function(e){
				Objeto = e.val();
			});
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
					'</div>' +
					'</div>' +
					'</div>'
					)
			}
		});
	});
})
})
//buscar Amigos
/*  $('#search-friends').click(function(){
		$('#search-friends').html('');
    var friendSearch = $('#friends').val();
		//console.log(friendSearch);
		userData.orderByChild("name").equalTo(friendSearch).on("value", function(snapshot){
			snapshot.forEach(function(e){
				Objeto = e.val();
				$('.section-friend').append(
					'<div class="row">' +
					'<div class="col-xs-offset-1 col-sm-offset-1 col-xs-10 col-sm-10 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10 col-add-contacts">' +
					'<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-add">' +
					'<a href="#"><img class="img-responsive img-rounded center-block img img-add-contacts" src="'+ Objeto.photo +'"></a>' +
					'</div>' +
					'<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">' +
					'<a href="#" class="text-center"><h4>'+ Objeto.name +'</h4></a>' +
					'</div>' +
					'<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-add">' +
					'<button class="btn btn-default center-block btn-profile" type="submit"><strong><span class="hidden-xs">Agregar a mis</span><span class="hidden-sm hidden-md hidden-lg"><i class="fa fa-plus" aria-hidden="true"></i></span> amigos</strong></button>' +
					'</div>' +
					'</div>' +
					'</div>'
				)
			});
    });
  }); */
//salir de la sesión
$('.logout').click(function(){
	firebase.auth().signOut();
	$('.init').show();
	$('.content').hide();
})

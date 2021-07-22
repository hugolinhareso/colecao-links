/** Animation 2.0 */

//Primeira animação
function first_animation() {
  //Tempo de duração da animação
  timing = 1000;
  /** CODE ANIMATION HERE */

  setTimeout(function () {
    //Destrava o scroll da tela
    document.documentElement.style.overflow = 'auto';
    //Inicia animações regulares
    regular_animation_start();
  }, timing + 300);
}

//Animações de entrada dos itens
function regular_animation_start() {
  loading_animations();
  //Executa animação conforme scroll a tela
  if ($('.anime-start').length != 0) {
    $(window).scroll(function () {
      if ($('.anime-start').length != 0) {
        var window_position = $(window).height() + $(window).scrollTop();
        var anime_start = $('.anime-start').eq(0);
        var anime_position = (anime_start.offset().top + anime_start.height() / 2);

        if (window_position > anime_position) {
          //Executa animação
          do_animation(anime_start);
        }
      }
    });

    $('main').scroll(function () {
      if ($('.anime-start').length != 0) {
        var window_position = $(window).height() + $(window).scrollTop();
        var anime_start = $('.anime-start').eq(0);
        var anime_position = (anime_start.offset().top + anime_start.height() / 2);

        if (window_position > anime_position) {
          //Executa animação
          do_animation(anime_start);
        }
      }
    });
  }
}



//Executa animação dos itens na tela
function loading_animations() {
  $(document).ready(function () {
    var window_position = $(window).height() + $(window).scrollTop();
    var animation_length = $('.anime-start').length;

    //Garante que todos os itens que já foram scrolados sejam animados
    for (var c = 0; c < animation_length; c++) {
      var anime_start = $('.anime-start').eq(0);
      var anime_position = (anime_start.offset().top + anime_start.height() / 2);
      if (window_position > anime_position) {
        //Executa animação
        do_animation(anime_start);
      } else { break }
    }
  });
}



//Executa animações
function do_animation(anime_start) {
  var animation = [];
  var animations = anime_start.find('.anime');
  var time_transition = animations.css('transition').replace('all ', '').replace('s ease 0s', '') * 1000;
  var time_transition = time_transition * 0.5;
  var timing = time_transition;

  //Cria vetor com os itens a serem animados
  animations.each(function () { animation.push($(this)) });

  //Ordena o Vetor a partir da ordem de animação setada nos itens
  animation = bubbleSortByAttr(animation, 'attr', 'data-anime-order');

  //Percorre todos os elementos do vetor (já ordenado)
  for (var i = 0; i < animation.length; i++) {
    //Pega order do elemento vigente
    var order = animation[i].attr('data-anime-order');
    var next_order = animation[i + 1] != undefined ? animation[i + 1].attr('data-anime-order') : null;
    //Evita que o time seja incrementado mais de uma vez por ordem igual
    next_order == order ? i++ : null;
    //Sendo o primeiro elemento executa
    if (order == 1) {
      //Percorre todo o vetor em busca de itens de mesma ordem
      for (var j = 0; j < animation.length; j++) {
        if (animation[j].attr('data-anime-order') == order) {
          animation[j].removeAttr('data-anime-type');
        }
      }

    } else {
      //Percorre todo o vetor em busca de itens de mesma ordem
      for (var j = 0; j < animation.length; j++) {
        if (animation[j].attr('data-anime-order') == order) {
          //Atrasa a execução da animação de acordo com a ordem                        
          doSetTimeout(animation[j], timing);
        }
      }

      //Incrementa tempo de transição 
      timing += time_transition;
    }
  }

  //Remove as classes e atributos referentes a animação
  anime_start.removeClass('anime-start');

  setTimeout(function () {
    animations.removeClass('anime');
    animations.removeAttr('data-anime-order');
  }, timing + time_transition);
}

//Possibilita setTimeout quando em loop
function doSetTimeout(arr, time) {
  setTimeout(function () {
    arr.removeAttr('data-anime-type');
  }, time);
}

first_animation();

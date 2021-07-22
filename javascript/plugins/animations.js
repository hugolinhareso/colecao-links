/** Animation 2.0 */

//Primeira animação
function first_animation() {
  regular_animation_start();
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

    if ($('.anime-start').length != 0) {
      var window_position = $(window).height() + $(window).scrollTop();
      var anime_start = $('.anime-start').eq(0);
      var anime_position = (anime_start.offset().top + anime_start.height() / 2);

      if (window_position > anime_position) {
        do_animation(anime_start);
      }
    }

    $('main').scroll(function () {
      if ($('.anime-start').length != 0) {
        var window_position = $(window).height() + $(window).scrollTop();
        var anime_start = $('.anime-start').eq(0);
        var anime_position = (anime_start.offset().top + anime_start.height() / 2);

        if (window_position > anime_position) {
          do_animation(anime_start);
        }
      }
    });
  }
}



function loading_animations() {
  $(document).ready(function () {
    var window_position = $(window).height() + $(window).scrollTop();
    var animation_length = $('.anime-start').length;

    for (var c = 0; c < animation_length; c++) {
      var anime_start = $('.anime-start').eq(0);
      var anime_position = (anime_start.offset().top + anime_start.height() / 2);
      if (window_position > anime_position) {
        do_animation(anime_start);
      } else { break }
    }
  });
}



function do_animation(anime_start) {
  var animation = [];
  var animations = anime_start.find('.anime');
  var time_transition = animations.css('transition').replace('all ', '').replace('s ease 0s', '') * 1000;
  var time_transition = time_transition * 0.5;
  var timing = time_transition;

  animations.each(function () { animation.push($(this)) });
  animation = bubbleSortByAttr(animation, 'attr', 'data-anime-order');

  for (var i = 0; i < animation.length; i++) {
    var order = animation[i].attr('data-anime-order');
    var next_order = animation[i + 1] != undefined ? animation[i + 1].attr('data-anime-order') : null;
    next_order == order ? i++ : null;
    if (order == 1) {
      for (var j = 0; j < animation.length; j++) {
        if (animation[j].attr('data-anime-order') == order) {
          animation[j].removeAttr('data-anime-type');
        }
      }

    } else {
      for (var j = 0; j < animation.length; j++) {
        if (animation[j].attr('data-anime-order') == order) {
          doSetTimeout(animation[j], timing);
        }
      }

      timing += time_transition;
    }
  }

  anime_start.removeClass('anime-start');

  setTimeout(function () {
    animations.removeClass('anime');
    animations.removeAttr('data-anime-order');
  }, timing + time_transition);
}

function doSetTimeout(arr, time) {
  setTimeout(function () {
    arr.removeAttr('data-anime-type');
  }, time);
}

first_animation();

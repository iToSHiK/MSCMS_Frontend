<?php if(isset($_GET["ref"])) setcookie("ref", $_GET["ref"], time()+259200); ?>
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
<meta charset="utf-8">
<meta name="author" content="MineStoreCMS Development Team">
<title>{{ $site_name }}</title>
<meta property="og:title" content="{{ $site_name }}"/>
<meta property="og:image" content="{{ asset('/assets/img/banner.png') }}"/>
<meta property="og:description" content="{{ $site_desc }}"/>
<meta name="description" content="{{ $site_desc }}">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="stylesheet" href="{{ asset('/assets/main.min.css?v7') }}">
<link rel="stylesheet" href="{{ asset('/css/flag-icon.min.css?v7') }}">
<script src="https://kit.fontawesome.com/ced04e20c5.js" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css" crossorigin="anonymous">
<link rel="stylesheet" href="{{ asset('libs/loading-bar/loading-bar.min.css') }}">
<link rel="stylesheet" href="{{ asset('libs/hover/hover-min.css') }}">
<link rel="shortcut icon" href="{{ asset('/assets/img/favicon.png') }}" type="image/png">
<link rel="stylesheet" href="https://cdn.materialdesignicons.com/3.5.95/css/materialdesignicons.min.css"/>
<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
<script src="http://threejs.org/examples/js/libs/stats.min.js"></script>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,500,600,700,700i,800&display=swap"/>
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"/>
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/monokai-sublime.min.css"/>
<link rel="stylesheet" href="//cdn.quilljs.com/1.3.6/quill.snow.css"/>
</head>
<body>
<div class="loaderArea">
   <div class="load">
  <hr/><hr/><hr/><hr/>
</div>
</div>
<div id="app">
<app></app>
</div>
</body>
<script>const locale = "{{ App::getLocale() }}";</script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
<script src="{{ mix('js/all.js') }}?v={{time()}}"></script>
<script src="{{ asset('js/common.js?v27') }}"></script>
<script>
  $(window).on('load', function () {
    $preloader = $('.loaderArea'),
      $loader = $preloader.find('.load');
    $loader.fadeOut();
    $preloader.delay(350).fadeOut('slow');
  });
</script>
<script>
particlesJS("particles-header", {"particles":{"number":{"value":400,"density":{"enable":true,"value_area":800}},"color":{"value":"#fff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.31,"random":true,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":false,"distance":500,"color":"#ffffff","opacity":0.4,"width":2},"move":{"enable":true,"speed":4,"direction":"top","random":true,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false,"mode":"14806"},"onclick":{"enable":false,"mode":"repulse"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":0.5}},"bubble":{"distance":400,"size":4,"duration":0.3,"opacity":1,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});
</script>
</html>
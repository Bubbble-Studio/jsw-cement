$(document).ready(function(){
   
    var pdf_link="";
    $('.download_cta').click(function(e){
        e.preventDefault();
         pdf_link=$(this).attr('href');
        $('#pdfFormModal').modal('show')
        console.log('brochure click '+pdf_link);
    })
    $(".download_form_submit").on("click", function (e) {
    var form = $(".needs-validation")[0];
    var isValid = form.checkValidity();
    if (!isValid) {
        e.preventDefault();
        e.stopPropagation();
    }
    form.classList.add('was-validated');
    
    if (isValid) {
        e.preventDefault();
    e.stopPropagation();
    var pdf_link2=encodeURIComponent(pdf_link);
    var download_name=$('[name="download_name"]').val();
    var download_mobile=$('[name="download_mobile"]').val();
    var download_profession=$('[name="download_profession"]').val();
    var download_state=$('[name="download_state"]').val();
    $('.submitBtProcess').html('<span style="border:2px solid #004085; color:#004085; padding:3px 8px">Processing details. Please wait...</span>')
    $.ajax({
        type: 'POST',
        url: 'process_download.php',
        data: 'download_name=' + download_name + '&download_mobile=' + download_mobile + '&download_profession=' + download_profession+ '&download_state=' + download_state+'&download_file='+pdf_link2,
        success: function(data) {
            console.log(data);
            $('.submitBt').prop('disabled', false);;
            $('.submitBtProcess').html('<span style="border:2px solid #28a745; color:#28a745; padding:3px 8px">Details submitted. File download will start now.</span>')
            
            window.open('https://www.jswcement.in/'+pdf_link, '_blank');
            setTimeout(function() {
                $('.submitBtProcess').html('');
            }, 2000);
            //$('input[type="text"]').val('')
            $('#pdfFormModal').modal('hide')
        }
    })
    }
    return false; // For testing only to stay on this page
});
    

    $('body').on('click','#ham-menu',function(){
        $('.header-full-wrp .main-nav').css('right', '0%');
    });

    $('body').on('click','#close-menu',function(){
        $('.header-full-wrp .main-nav').css('right', '-100%');
        $('.main-nav-links .links-drop .mega-menu-card').removeClass('mob-drop-card');
    });
    
    $('body').on('click','.main-nav-links .links-drop a',function(){
        $(this).parent().find('.mega-menu-card').addClass('mob-drop-card');
    });


    $('body').on('click','.drop-cap-card',function(){
        $('.drop-lvl2').slideUp('slow');
        $('.main-nav-links .links-drop .mega-menu-card').removeClass('mob-drop-card');
    });

    $('body').on('click','.header-full-wrp .main-nav ul.main-nav-links li.links-drop .mega-menu-card .drop-lvl1 li.cvr-lvl2 a.link-cvr-lvl2',function(){
        $('.drop-lvl2').slideUp('slow');
        $(this).parent().find('.drop-lvl2').slideDown('slow');

    });
    

    $(".main-nav-links li.links-drop").hoverIntent({
        sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)    
        interval: 200, // number = milliseconds for onMouseOver polling interval    
        timeout: 100, // number = milliseconds delay before onMouseOut    
        over:function(){
           $(this).find('.mega-menu-card').addClass('hover')
        },
        out: function(){
            $(".mega-menu-card").removeClass("hover");
        }
    });
    
    
    $(".drop-lvl1 li.cvr-lvl2").hoverIntent({
        sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)    
        interval: 200, // number = milliseconds for onMouseOver polling interval    
        timeout: 100, // number = milliseconds delay before onMouseOut    
        over:function(){
           $(this).addClass('act')
        },
        out: function(){
            $(".drop-lvl1 li.cvr-lvl2").removeClass("act");
        }
    });


    

    var header = $(".header-full-wrp");         

    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            header.addClass("scrolled");
        } else {
            header.removeClass("scrolled");
        }
    });       

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.header-full-wrp').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.header-full-wrp').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.header-full-wrp').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}



var btn = $('#backtop-button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});



    
});




$(window).on('load', function () {
        // page is fully loaded, including all frames, objects and images
       
        common_cta();

        $('.tabs li').click(function(){

            setTimeout(function(){ common_cta(); }, 500);
            
        })
       
       function common_cta(){
        var maxWidth = 0;

        $(".common-cta").each(function() {
            console.log($(this).text()+' '+$(this).outerWidth())
           if ($(this).outerWidth() > maxWidth) {
             maxWidth = $(this).outerWidth();
             $(this).outerWidth(maxWidth);
             maxWidth = 0;
          }
          
        });

    }


    });
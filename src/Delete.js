/*$(function() { bu daha güzel
    // prob a better way
    $('.swipeable .inner').each(function(e) {
        var snapper = new Snap({
            element: this,
            maxPosition: 100,
            minPosition: -100,
            disable: 'left'
        });
    });

    $('.delete').on('click', function(e){
        $(this).parent().slideToggle(100);
    });
});
*/


/*
$(function(){

      var $item = $( '.item' ),
          $dragger = $item.find('p' ),
          $trash = $( '.trash' );

      $dragger.on( 'dblclick', function ( e ) {
        e.preventDefault();
        var $this = $( this ),
            $parent = $this.parent();

        ( $parent.hasClass( 'active' ) ) ? $parent.removeClass('active' ).addClass('completed') : $parent.removeClass('completed' ).addClass('active');

      } );

      var gridWidth = 60;
      Draggable.create( $dragger, {
        type           : "x",
        edgeResistance : 0.65,
        bounds : {minX:0, maxX:40},
        lockAxis       : true,
        throwProps     : true,
        snap: function(endValue) {
          var step = 40;
          return Math.round( endValue / step) * step;
        }
      } );

      $trash.on('click', function(){
        console.log( 'i will be removed soon!!' );
      });

    });
 */
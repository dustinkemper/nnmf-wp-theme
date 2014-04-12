<?php
/**
* @package   yoo_frequency
* @author    YOOtheme http://www.yootheme.com
* @copyright Copyright (C) YOOtheme GmbH
* @license   http://www.gnu.org/licenses/gpl.html GNU/GPL
*/

// check compatibility
if (version_compare(PHP_VERSION, '5.3', '>=')) {

    // bootstrap warp
    require(__DIR__.'/warp.php');
}

function insert_image_src_rel_in_head() {
  global $post;
  if ( !is_singular()) //if it is not a post or a page
    return;
  if(!has_post_thumbnail( $post->ID )) { //the post does not have featured image, use a default image
    $default_image="http://northernnights.org/wp-content/themes/yoo_frequency_wp/images/NNMF/nnmf-default-post.jpg"; 
  }
  else{
    $thumbnail_src = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'medium' );
    echo '<meta property="og:image" content="' . esc_attr( $thumbnail_src[0] ) . '"/>';
  }
  echo "
";
}
add_action( 'wp_head', 'insert_image_src_rel_in_head', 5 );
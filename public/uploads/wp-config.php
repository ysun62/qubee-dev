<?php
define('WP_AUTO_UPDATE_CORE', 'minor');// This setting is required to make sure that WordPress updates can be properly managed in WordPress Toolkit. Remove this line if this WordPress website is not managed by WordPress Toolkit anymore.
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wp_z5f4o' );

/** MySQL database username */
define( 'DB_USER', 'wp_9x4ne' );

/** MySQL database password */
define( 'DB_PASSWORD', '!5Mh0Ea2wJ' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost:3306' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', 'ua2VI6WWBusv4a3/b4X4x4v_1CbFj8B62;p9vV74;48|sx4rkr@hyg@X:AjT1I2[');
define('SECURE_AUTH_KEY', 'w([5e)0*1R1FF)1|TjF|kBz#6q4D%;I85wV7@HK!Y3#6j1-T19UCTg_O0x%irEZ5');
define('LOGGED_IN_KEY', '2ZDCNADc1-(7[NmFQ8%U#5m@4[JZDic5k|&]3*v!]t-1KR7&3WoY!)X43n;kDC8d');
define('NONCE_KEY', '-&P8V)Ms@jfj!K@[lfYJ(2@6B!4gZL[mx]N/BFZd5Q~sUGV_@gzm;d!086JsKQKC');
define('AUTH_SALT', ']d0WW3o&[L(Ioo4]57K;R~1)UdD+Y9pbI]N~F6([F0:yAT*62/jqd|t42-/@]+~&');
define('SECURE_AUTH_SALT', '90L)cKJTjV[!_gpN~!Rz+p(HDi301+)%41x+mY&1/kb[pN4rTUqQzUN;*8rA~vh@');
define('LOGGED_IN_SALT', '15I9kuDE+;uOP!93ymm/mS]H7hY(Dk6/]3W#V1uK~/o10797l6%WU6/bR;5+jG4%');
define('NONCE_SALT', 'jdA(9SK/K0zIg]o_v|aY66_5@&b&!njiqG0+e(&(94K:B]S3K%6DhU5(:~Nd45Ai');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = '05lX21K_';


define('WP_ALLOW_MULTISITE', true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

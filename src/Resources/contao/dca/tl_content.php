<?php

/**
 * Leaflet maps for Contao CMS.
 *
 * @package    contao-leaflet-maps
 * @author     David Molineus <david.molineus@netzmacht.de>
 * @copyright  2016-2017 netzmacht David Molineus. All rights reserved.
 * @license    LGPL-3.0 https://github.com/netzmacht/contao-leaflet-maps/blob/master/LICENSE
 * @filesource
 */

$GLOBALS['TL_DCA']['tl_content']['metapalettes']['leaflet'] = array(
    'type'      => array('type', 'headline'),
    'leaflet'   => array('leaflet_map', 'leaflet_mapId', 'leaflet_width', 'leaflet_height', 'leaflet_template'),
    'templates' => array(':hide', 'customTpl'),
    'protected' => array(':hide', 'protected'),
    'expert'    => array(':hide', 'guests', 'cssID', 'space'),
    'invisible' => array(':hide', 'invisible', 'start', 'start')
);

$GLOBALS['TL_DCA']['tl_content']['fields']['leaflet_map'] = array(
    'label'            => &$GLOBALS['TL_LANG']['tl_content']['leaflet_map'],
    'inputType'        => 'select',
    'exclude'          => true,
    'options_callback' => ['netzmacht.contao_leaflet_maps.listeners.dca.frontend_integration', 'getMaps'],
    'wizard'           => array(
        ['netzmacht.contao_leaflet_maps.listeners.dca.frontend_integration', 'getEditMapLink'],
    ),
    'eval'             => array(
        'tl_class' => 'w50 wizard',
        'chosen'   => true,
    ),
    'sql'              => "int(10) unsigned NOT NULL default '0'"
);

$GLOBALS['TL_DCA']['tl_content']['fields']['leaflet_mapId'] = array(
    'label'            => &$GLOBALS['TL_LANG']['tl_content']['leaflet_mapId'],
    'inputType'        => 'text',
    'exclude'          => true,
    'eval'             => array(
        'tl_class'  => 'w50',
        'chosen'    => true,
        'maxlength' => 16,
    ),
    'sql'              => "varchar(16) NOT NULL default ''"
);

$GLOBALS['TL_DCA']['tl_content']['fields']['leaflet_width'] = array(
    'label'     => &$GLOBALS['TL_LANG']['tl_content']['leaflet_width'],
    'inputType' => 'inputUnit',
    'options'   => array('px', '%', 'em', 'pt', 'pc', 'in', 'cm', 'mm'),
    'search'    => false,
    'exclude'   => true,
    'eval'      => array('rgxp' => 'digit', 'tl_class' => 'clr w50'),
    'sql'       => "varchar(64) NOT NULL default ''"
);


$GLOBALS['TL_DCA']['tl_content']['fields']['leaflet_height'] = array(
    'label'     => &$GLOBALS['TL_LANG']['tl_content']['leaflet_height'],
    'inputType' => 'inputUnit',
    'options'   => array('px', '%', 'em', 'pt', 'pc', 'in', 'cm', 'mm'),
    'search'    => false,
    'exclude'   => true,
    'eval'      => array('rgxp' => 'digit', 'tl_class' => 'w50'),
    'sql'       => "varchar(64) NOT NULL default ''"
);

$GLOBALS['TL_DCA']['tl_content']['fields']['leaflet_template'] = array(
    'label'            => &$GLOBALS['TL_LANG']['tl_content']['leaflet_template'],
    'inputType'        => 'select',
    'exclude'          => true,
    'options_callback' => \Netzmacht\Contao\Toolkit\Dca\Callback\CallbackFactory::getTemplates('leaflet_map_js'),
    'eval'             => array(
        'tl_class' => 'w50',
        'chosen'   => true,
    ),
    'sql'              => "varchar(64) NOT NULL default ''"
);

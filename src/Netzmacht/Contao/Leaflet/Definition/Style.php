<?php

/**
 * @package    dev
 * @author     David Molineus <david.molineus@netzmacht.de>
 * @copyright  2015 netzmacht creative David Molineus
 * @license    LGPL 3.0
 * @filesource
 *
 */

namespace Netzmacht\Contao\Leaflet\Definition;

use Netzmacht\LeafletPHP\Definition;
use Netzmacht\LeafletPHP\Definition\Vector\Path;

/**
 * Interface Style describes a style definition.
 *
 * @package Netzmacht\Contao\Leaflet\Definition
 */
interface Style extends Definition
{
    /**
     * Apply style to a given vector.
     *
     * @param Path $vector The vector path.
     *
     * @return $this
     */
    public function apply(Path $vector);
}

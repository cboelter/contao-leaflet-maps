<?php

/**
 * Leaflet maps for Contao CMS.
 *
 * @package    contao-leaflet-maps
 * @author     David Molineus <david.molineus@netzmacht.de>
 * @copyright  2014-2017 netzmacht David Molineus. All rights reserved.
 * @license    LGPL-3.0 https://github.com/netzmacht/contao-leaflet-maps/blob/master/LICENSE
 * @filesource
 */

declare(strict_types=1);

namespace Netzmacht\Contao\Leaflet\Listener;

use Contao\FilesModel;
use Contao\Model;
use Contao\StringUtil;
use Netzmacht\Contao\Leaflet\Event\ConvertToGeoJsonEvent;
use Netzmacht\Contao\Leaflet\Model\LayerModel;
use Netzmacht\Contao\Toolkit\Data\Model\RepositoryManager;
use Netzmacht\LeafletPHP\Definition as LeafletDefinition;
use Netzmacht\LeafletPHP\Definition\HasPopup;
use Netzmacht\LeafletPHP\Definition\UI\Marker;
use Netzmacht\LeafletPHP\Definition\Vector;
use Netzmacht\LeafletPHP\Definition\Vector\Circle;
use Netzmacht\LeafletPHP\Definition\Vector\CircleMarker;
use Netzmacht\LeafletPHP\Value\GeoJson\Feature;
use Netzmacht\LeafletPHP\Value\GeoJson\GeoJsonObject;

/**
 * Class GeoJsonSubscriber provides subscribers when a definition is converted to a geo json feature.
 *
 * @package Netzmacht\Contao\Leaflet\Subscriber
 */
final class GeoJsonListener
{
    /**
     * Property mapping between models and features.
     *
     * @var array
     */
    private $featureModelProperties;

    /**
     * Repository manager.
     *
     * @var RepositoryManager
     */
    private $repositoryManager;

    /**
     * GeoJsonSubscriber constructor.
     *
     * @param RepositoryManager $repositoryManager      Repository manager.
     * @param array             $featureModelProperties Property mapping between models and features.
     */
    public function __construct(RepositoryManager $repositoryManager, array $featureModelProperties)
    {
        $this->repositoryManager      = $repositoryManager;
        $this->featureModelProperties = $featureModelProperties;
    }

    /**
     * Handle the event.
     *
     * @param ConvertToGeoJsonEvent $event The event.
     *
     * @return void
     */
    public function handle(ConvertToGeoJsonEvent $event)
    {
        $feature    = $event->getGeoJson();
        $definition = $event->getDefinition();
        $model      = $event->getModel();

        $this->addPopup($feature, $definition);
        $this->enrichObjects($feature, $definition, $model);
        $this->enrichCircle($feature, $definition);
        $this->setModelData($feature, $model);
    }

    /**
     * Add popup property for definitions with an popup.
     *
     * @param GeoJsonObject     $feature    The geojson feature object.
     * @param LeafletDefinition $definition The definition.
     *
     * @return void
     */
    public function addPopup(GeoJsonObject $feature, LeafletDefinition $definition)
    {
        if ($definition instanceof HasPopup && $feature instanceof Feature) {
            if ($definition->getPopup()) {
                $feature->setProperty('popup', $definition->getPopup());
            }

            if ($definition->getPopupContent()) {
                $feature->setProperty('popupContent', $definition->getPopupContent());
            }

            if ($definition->getPopupOptions()) {
                $feature->setProperty('popupOptions', $definition->getPopupOptions());
            }
        }
    }

    /**
     * Enrich map object with feature data and bounds information.
     *
     * @param GeoJsonObject     $feature    The geojson feature object.
     * @param LeafletDefinition $definition The definition.
     * @param Model|object      $model      The data model.
     *
     * @return void
     */
    public function enrichObjects(GeoJsonObject $feature, LeafletDefinition $definition, $model)
    {
        if (($definition instanceof Marker || $definition instanceof Vector)
            && $model instanceof Model && $feature instanceof Feature) {
            $this->setDataProperty($model, $feature);
            $this->setBoundsInformation($model, $feature);
        }
    }

    /**
     * Enrich the the circle with constructor arguments.
     *
     * @param GeoJsonObject     $feature    The geojson feature object.
     * @param LeafletDefinition $definition The definition.
     *
     * @return void
     */
    public function enrichCircle(GeoJsonObject $feature, LeafletDefinition $definition)
    {
        if ($definition instanceof Circle && !$definition instanceof CircleMarker && $feature instanceof Feature) {
            $feature->setProperty('arguments', [$definition->getLatLng(), $definition->getRadius()]);
        }
    }

    /**
     * Pass configured properties on an model to  the properties.model key.
     *
     * @param GeoJsonObject $feature The geojson feature object.
     * @param Model|object  $model   The data model.
     *
     * @return void
     */
    public function setModelData(GeoJsonObject $feature, $model)
    {
        if (!$model instanceof Model || !$feature instanceof Feature
            || empty($this->featureModelProperties[$model->getTable()])) {
            return;
        }

        $mapping = $this->featureModelProperties[$model->getTable()];
        $data    = (array) $feature->getProperty('model');

        foreach ((array) $mapping as $property) {
            $value = $this->parseModelValue($model, $property);

            // Important: Do not combine with line above as the property can be modified if it's an array.
            $data[$property] = $value;
        }

        $feature->setProperty('model', $data);
    }

    /**
     * Parse the model value based on the config.
     *
     * @param Model $model    The model.
     * @param mixed $property The property config.
     *
     * @return array|mixed|null
     */
    private function parseModelValue(Model $model, &$property)
    {
        if (is_array($property)) {
            [$property, $type] = $property;
            $value             = $model->$property;

            switch ($type) {
                case 'array':
                case 'object':
                    $value = StringUtil::deserialize($value, true);
                    break;

                case 'file':
                    $repository = $this->repositoryManager->getRepository(FilesModel::class);
                    $file       = $repository->findByUuid($value);
                    $value      = $file->path;
                    break;

                case 'files':
                    $repository = $this->repositoryManager->getRepository(FilesModel::class);
                    $collection = $repository->findMultipleByUuids(StringUtil::deserialize($value, true));

                    if ($collection) {
                        $value = $collection->fetchEach('path');
                    } else {
                        $value = [];
                    }
                    break;

                default:
                    $value = null;
            }
        } else {
            $value = $model->$property;
        }

        return $value;
    }

    /**
     * Set the bounds information.
     *
     * @param \Model  $model   The model.
     * @param Feature $feature The feature.
     *
     * @return void
     */
    protected function setBoundsInformation($model, $feature)
    {
        if ($model->ignoreForBounds) {
            $feature->setProperty('ignoreForBounds', true);
        } else {
            $repository = $this->repositoryManager->getRepository(LayerModel::class);
            $parent     = $repository->find((int) $model->pid);

            if ($parent && $parent->boundsMode !== 'extend') {
                $feature->setProperty('ignoreForBounds', true);
            }
        }
    }

    /**
     * Set the data property.
     *
     * @param \Model  $model   The model.
     * @param Feature $feature The feature.
     *
     * @return void
     */
    protected function setDataProperty($model, $feature)
    {
        if ($model->featureData) {
            $feature->setProperty('data', json_decode($model->featureData, true));
        }
    }
}

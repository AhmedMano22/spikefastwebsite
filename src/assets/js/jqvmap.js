$(function(e){
  'use strict'

	//world map
	if ($('#world-map-gdp').length ){

		$('#world-map-gdp').vectorMap({
			map: 'world_en',
			backgroundColor: null,
			color: '#ffffff',
			hoverOpacity: 0.7,
			selectedColor: '#9d4edd',
			enableZoom: true,
			showTooltip: true,
			values: sample_data,
			scaleColors: ['#9d4edd', '#4801ff'],
			normalizeFunction: 'polynomial'
		});

	}

	//us map
	if ($('#usa_map').length ){

		$('#usa_map').vectorMap({
			map: 'usa_en',
			backgroundColor: null,
			color: '#ffffff',
			hoverOpacity: 0.7,
			selectedColor: '#9d4edd',
			enableZoom: true,
			showTooltip: true,
			values: sample_data,
			scaleColors: ['#9d4edd', '#4801ff'],
			normalizeFunction: 'polynomial'
		});

	}
	if ($('#german').length ){
		$('#german').vectorMap({
			map : 'germany_en',
			backgroundColor: null,
			color: '#ffffff',
			hoverOpacity: 0.7,
			selectedColor: '#9d4edd',
			enableZoom: true,
			showTooltip: true,
			values: sample_data,
			scaleColors: ['#9d4edd', '#4801ff'],
			normalizeFunction: 'polynomial'
		});
	}
	if ($('#russia').length ){
		$('#russia').vectorMap({
			map : 'russia_en',
			backgroundColor: null,
			color: '#ffffff',
			hoverOpacity: 0.7,
			selectedColor: '#9d4edd',
			enableZoom: true,
			showTooltip: true,
			values: sample_data,
		});
	}

});
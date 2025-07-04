<?php

/**
 * @file plugins/themes/baseOjsTheme/BaseOjsThemePlugin.php
 *
 * Copyright (c) 2014-2023 Simon Fraser University
 * Copyright (c) 2003-2023 John Willinsky
 * Distributed under the GNU GPL v3. For full terms see the file docs/COPYING.
 *
 * @class BaseOjsThemePlugin
 * @ingroup plugins_themes_baseOjsTheme
 * @brief Wrapper for baseOjsTheme
 */

import('lib.pkp.classes.plugins.ThemePlugin');

class BaseOjsThemePlugin extends ThemePlugin
{
	public function init()
	{
		$request = Application::get()->getRequest();
		$locale = AppLocale::getLocale();

		// Determinar la ruta para los iconos de Bootstrap
		$iconFontPath = $request->getBaseUrl() . '/' . $this->getPluginPath() . '/bootstrap/fonts/';

		// Cargar Bootstrap 3 CSS
		$this->addStyle('bootstrap', 'styles/bootstrap.less');
		$this->modifyStyle('bootstrap', ['addLessVariables' => '@icon-font-path:"' . $iconFontPath . '";']);

		// Soporte para RTL
		if (AppLocale::getLocaleDirection($locale) === 'rtl') {
			$this->addStyle('bootstrap-rtl', 'styles/bootstrap-rtl.min.css');
		}

		// Cargar estilos personalizados
		$this->addStyle('styles', 'styles/styles.css');

		// Cargar jQuery y jQuery UI
		$min = Config::getVar('general', 'enable_minified') ? '.min' : '';
		$jquery = $request->getBaseUrl() . '/lib/pkp/lib/vendor/components/jquery/jquery' . $min . '.js';
		$jqueryUI = $request->getBaseUrl() . '/lib/pkp/lib/vendor/components/jqueryui/jquery-ui' . $min . '.js';
		$this->addScript('jQuery', $jquery, ['baseUrl' => '']);
		$this->addScript('jQueryUI', $jqueryUI, ['baseUrl' => '']);

		// Cargar Bootstrap 3 JS
		$this->addScript('bootstrap', 'bootstrap/js/bootstrap.min.js');

		// Cargar FontAwesome
		$this->addStyle(
			'fontAwesome',
			$request->getBaseUrl() . '/lib/pkp/styles/fontawesome/fontawesome.css',
			['baseUrl' => '']
		);

		// Añadir áreas de menú
		$this->addMenuArea(['primary', 'user']);
	}

	public function getDisplayName()
	{
		return __('plugins.themes.baseOjsTheme.name');
	}

	public function getDescription()
	{
		return __('plugins.themes.baseOjsTheme.description');
	}
}

if (!PKP_STRICT_MODE) {
	class_alias('\APP\plugins\themes\baseOjsTheme\BaseOjsThemePlugin', '\BaseOjsThemePlugin');
}
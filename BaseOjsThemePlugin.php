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


		// Soporte para RTL
		if (AppLocale::getLocaleDirection($locale) === 'rtl') {
			$this->addStyle('bootstrap-rtl', 'styles/bootstrap-rtl.min.css');
		}


		// Cargar Bootstrap 3 CSS
		$this->addStyle('bootstrap', 'dependencies/bootstrap/css/bootstrap.min.css');
		// Cargar estilos personalizados
		$this->addStyle('styles', 'styles/styles.css');
		// Cargar Bootstrap 3 JS
		$this->addScript('bootstrap', 'dependencies/bootstrap/js/bootstrap.min.js');

		// Cargar FontAwesome
		$this->addStyle(
			'fontAwesome',
			$request->getBaseUrl() . '/lib/pkp/styles/fontawesome/fontawesome.css',
			['baseUrl' => '']
		);


		$this->addScript(
			'scripts',
			'js/script.js'
		);

		$this->addScript(
			'scripts_html',
			'js/html_view.js'
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
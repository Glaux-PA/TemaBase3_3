function iframeLoaded(iframeVisor) {
	if(document.getElementById('sidebar_toc')) return;
    if(!iframeVisor) return;
	if(!iframeVisor.contentDocument.head) return;

	const sidebar = document.getElementById('sidebarHTMLViewer');
    
	if (iframeVisor) {

		function borrarEstilos() {
			let firstDiv = document.querySelector('[style]');
			if (firstDiv) {
				firstDiv.removeAttribute("style");
			};
		}

		function cargarToc() {
			const toc = document.createElement("div");
			toc.classList.add('pkp_block');
			toc.id = "sidebar_toc";
			const toc_h2 = document.createElement("h2");
			toc_h2.innerText = "TOC";
			toc_h2.classList.add('title');
			toc.appendChild(toc_h2);
			const content = document.createElement("div");
			content.classList.add('content');

			const toc_ul = document.createElement("ul");

			const secciones = iframeVisor.contentDocument.querySelectorAll('.h3');
			
			for (let i = 0; i < secciones.length; i++) {
				const toc_li = document.createElement("li");
				const toc_link = document.createElement("a");
				toc_link.setAttribute("href", '#' );
				toc_link.setAttribute("data-href", '#' + secciones[i].id);
				toc_link.setAttribute("target", "htmlFrame");
				toc_link.innerText = secciones[i].innerText;
				toc_link.addEventListener('click', (e) => {
					e.preventDefault();
					secciones[i].scrollIntoView({ behavior: "smooth" });
				});
				toc_li.appendChild(toc_link);
				toc_ul.appendChild(toc_li);
			}


			if (secciones.length > 0) {
				content.appendChild(toc_ul);
				toc.appendChild(content);

				sidebar.appendChild(toc);
			}
		}
        

		function goToIframeAnchor(anchor) {
			iframeVisor.contentDocument.querySelector(anchor).scrollIntoView({ behavior: "smooth" });
		}
        
        
		function modificarEnlaces() {
			const enlaces = iframeVisor.contentDocument.querySelectorAll('a');
			for (const enlace of enlaces) {
				const url = enlace.getAttribute('href'); //enlace.href no funciona porque coge la url de la página
				if (url && url[0] === '#') {
					enlace.addEventListener('click', (e) => {
						e.preventDefault();
						goToIframeAnchor(url);
					});
				} else {
					enlace.target = "_blank";
				}
			}
		}
        

        
		document.addEventListener('scroll', function () {
			let ultimaSeccionVisible = null;
			const secciones = iframeVisor.contentDocument.querySelectorAll('.h2');

			for (let seccion of secciones) {

				if (seccion.offsetTop > window.pageYOffset) {

					break;
				}
				ultimaSeccionVisible = seccion;
			}
			if (ultimaSeccionVisible) {
				const toc = document.getElementById('sidebar_toc');
				const actualAntes = toc.querySelector('.actual');
				if (actualAntes) {
					actualAntes.classList.remove('actual')
				}
				actual = toc.querySelector('li [data-href="#' + ultimaSeccionVisible.id + '"]');

				actual.classList.add('actual');
			}
		});
        
        
		function elementsViewer() {

			if (iframeVisor) {
				const iframeDocument = iframeVisor.contentDocument;

				//Figures
				const figures = iframeDocument.getElementsByTagName('figure');

				if (figures.length) {
					const sidebarFigures = document.createElement('div');
					sidebarFigures.id = 'sidebar_figures';
					sidebarFigures.classList.add('pkp_block');

					const figures_h3 = document.createElement("h3");
					figures_h3.innerText = "Figuras";
					figures_h3.classList.add('title');
					sidebarFigures.appendChild(figures_h3);

					const content = document.createElement("div");
					content.classList.add('content');
					sidebarFigures.append(content);

					const figuresUl = document.createElement('ul');
					content.append(figuresUl);

					for (const figure of figures) {
						const cloneFigure = figure.cloneNode(true);
						const liFigure = document.createElement('li');
						liFigure.append(cloneFigure.querySelector('img'));
						liFigure.addEventListener('click', () => {
							figure.scrollIntoView({ behavior: "smooth" })
						});
						figuresUl.append(liFigure);
					}

					sidebar.append(sidebarFigures);
				}
                
                //Tables
				const tables = iframeDocument.getElementsByClassName('table');

				if (tables.length) {
					const sidebarTables = document.createElement('div');
					sidebarTables.id = 'sidebar_tables';
					sidebarTables.classList.add('pkp_block');

					const tables_h3 = document.createElement("h3");
					tables_h3.innerText = "Tablas";
					tables_h3.classList.add('title');
					sidebarTables.appendChild(tables_h3);

					const content = document.createElement("div");
					content.classList.add('content');
					sidebarTables.append(content);

					const tablesUl = document.createElement('ul');
					content.append(tablesUl);

					for (const table of tables) {
						const cloneTable = table.cloneNode(true);
						const liTable = document.createElement('li');
						liTable.append(cloneTable.querySelector('.tit-table'));
						liTable.addEventListener('click', () => {
							table.scrollIntoView({ behavior: "smooth" })
						});
						tablesUl.append(liTable);
					}

					sidebar.append(sidebarTables);
				}

			}
		}
        
        /*
		function mostrarOverlay(contenido) {
			const overlay = document.createElement('div');
			overlay.classList.add('htmlViewerOverlay');
			const elementCloned = contenido.cloneNode(true);
			const links = elementCloned.getElementsByTagName('a');
			for (const link of links) {
				link.removeAttribute('href');
			}
			overlay.append(elementCloned);

			const cerrar = document.createElement('div');
			cerrar.classList.add('cerrar_overlay');
			cerrar.innerText = 'X';

			cerrar.addEventListener('click', function () {
				this.parentNode.remove();
			});

			overlay.append(cerrar);

			document.body.append(overlay)
		}
        */
        
		function modIframe() {

			const link = document.createElement("link");
			link.href = pluginUrl + "/scss/pages/html_iframe.scss";
			link.rel = "stylesheet";
			iframeVisor.contentDocument.head.append(link);
			iframeVisor.style.height = 250 + (iframeVisor.contentWindow.document.body.offsetHeight) + 'px';
			setTimeout(() => {
				iframeVisor.style.height = 250 + (iframeVisor.contentWindow.document.body.offsetHeight) + 'px';
			}, 1000);
			setTimeout(() => {
				iframeVisor.style.height = 250 + (iframeVisor.contentWindow.document.body.offsetHeight) + 'px';
			}, 3000);

		}

        borrarEstilos();
		elementsViewer();
		cargarToc();
		modificarEnlaces();
		modIframe();
	}
}


document.addEventListener("DOMContentLoaded", () => {
	const iframe = document.querySelector('#htmlContainer iframe');
    if(!iframe) return;
	iframeLoaded(iframe);
	iframe.contentDocument.addEventListener("DOMContentLoaded", () => {
		iframeLoaded(iframe);
	});
});

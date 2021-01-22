import 'normalize.css'
import '@/sass/style.sass'
import $ from 'jquery'

window.$ = window.jQuery = require('jquery')
window.isotope = require('isotope-layout/dist/isotope.pkgd')
import 'jquery-parallax.js'
import {tns} from 'tiny-slider/src/tiny-slider'
import 'tiny-slider/dist/tiny-slider.css'
import products from '@/js/products'
import 'animate.css'

$(function() {
	toggleNav()
	const $container = $('.portfolio__grid')

	$container.isotope({
		itemSelector: '.portfolio__item',
		masonry: {
			columnWidth: $container.width() / 3
		},
		transitionDuration: '0.7s'
	})

	$(window).resize(function() {
		$container.isotope({
			masonry: {
				columnWidth: $container.width() / 3
			}
		})
	})
	$(window).scroll(() => {
		toggleNav()
		computeAnimation()
	})

	$('.portfolio__tab').click(function(e) {
		$('.portfolio__tab').removeClass('portfolio__tab_active')
		$(this).addClass('portfolio__tab_active')
		const selector = $(this).attr('data-filter')

		$('.portfolio__grid').isotope({filter: selector})
	})
	$('.portfolio__tab').eq(0).trigger('click')

	const skillsSlider = tns({
		container: '.skills__slider',
		items: 3,
		autoplay: true,
		center: true,
		autoplayButtonOutput: false,
		nav: true,
		loop: false,
		controlsText: [
			'<img src="images/arrow.png" class="arrow arrow_prev">',
			'<img src="images/arrow.png" class="arrow arrow_next">'
		],
		onInit: toggleCanterClass
	})

	skillsSlider.events.on('indexChanged', toggleCanterClass)

	$('.scrollToId').click(function(e) {
		scrollToId(this)
	})
	$('.portfolio__item').click(function(e) {
		const work = $(this).attr('data-portfolio')
		visualWork(work)
		showModal()
	})
	$('.bg, .modal__times').click(function(e) {
		if (!$(e.target).closest('.modal').length || $(e.target).hasClass('modal__times')) {
			$('.modal').removeClass('modal_active')
			setTimeout(() => {
				$('.bg').hide()
			}, 320)
			$('.bg').removeClass('bg_active')
			setTimeout(() => {
				$('.bg').hide()
			}, 340)
			$('#modal-image').hide()
			$('#modal-loading').show()
		}
	})
})

function toggleCanterClass(info) {
	const slides = $('.skills__item')
	slides.removeClass('skills__item_center')
	slides.eq(info.index).addClass('skills__item_center')
}

function scrollToId(el) {
	const href = $(el).attr('data-href')
	const position = $(href).offset().top - $('.nav').innerHeight()
	$('html, body').animate({scrollTop: position + 'px'})
	if ($(el).hasClass('btn')) {
		$('.main__form .input[type="name"]').focus()
	}
}

function toggleNav() {
	if ($(window).scrollTop() > $('.nav').outerHeight() - $('.nav .container').innerHeight() - 20) {
		$('.nav').addClass('nav_fixed')
	} else {
		$('.nav').removeClass('nav_fixed')
	}
}

function visualWork(work) {
	$('#modal-price').show()
	$('#modal-time').show()
	$('#modal-image').attr('src', 'images/works/' + products[work].image).on('load', () => {
		$('#modal-image').show()
		$('#modal-loading').hide()
	})
	$('#modal-name').text(products[work].name)
	$('#modal-target').html('<span>Задача: </span>' + products[work].target)
	if (products[work].price) $('#modal-price span').text(products[work].price + ' руб.')
	else $('#modal-price').hide()
	if (products[work].time) $('#modal-time span').text(products[work].time + ' дн.')
	else $('#modal-time').hide()
}

function showModal() {
	$('.bg').show()
	setTimeout(() => {
		$('.bg').addClass('bg_active')
	}, 30)
	setTimeout(() => {
		$('.modal').addClass('modal_active')
	}, 30)
}


function computeAnimation() {
	const windowHalfHeight = $(window).innerHeight() * 0.5
	const pixelsScrolled = $(window).scrollTop() + windowHalfHeight
	if (pixelsScrolled > $('#hi').offset().top && pixelsScrolled < $('#hi').offset().top + windowHalfHeight) {
		$('#hi').addClass('animate__tada')
	}
	if (pixelsScrolled * 1.1 > $('#point-down').offset().top) {
		$('#point-down').addClass('animate__shakeY')
	}
	if (pixelsScrolled > $('.technologies').offset().top) {
		$('.technologies__content').addClass('technologies__content_active')
	}
}
